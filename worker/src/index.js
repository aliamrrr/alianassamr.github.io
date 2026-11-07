/*
 * AliLLM proxy (Cloudflare Worker).
 * The Mistral key lives here as a Worker secret and never reaches the browser.
 * The site POSTs { messages: [{ role, content }, ...] } to /chat and gets { reply }.
 *
 * Controls enforced server-side (the browser's own checks are only UX):
 *  - exact Origin allowlist (ALLOWED_ORIGINS) for CORS and for the request itself
 *  - per-IP rate limit and a global daily cap, counted in a Durable Object (strongly consistent)
 *  - body size, message count, roles and lengths validated
 *  - model, token budget, temperature and system prompt fixed here, not by the client
 */
import { DurableObject } from 'cloudflare:workers';
import SYSTEM_PROMPT from '../../src/data/systemPrompt.js';

const PER_IP_LIMIT = 8;          // questions per minute per visitor
const PER_IP_WINDOW = 60_000;
const DAILY_CAP = 300;           // questions per day for the whole site (bounds the Mistral bill)
const DAY = 86_400_000;

/* One instance per key ("ip:<addr>" or "global"); requests to an instance are serialised, so counts are exact. */
export class ChatRateLimiter extends DurableObject {
  async hit(limit, windowMs) {
    const now = Date.now();
    const hits = ((await this.ctx.storage.get('hits')) || []).filter((t) => now - t < windowMs);
    if (hits.length >= limit) { await this.ctx.storage.put('hits', hits); return false; }
    hits.push(now);
    await this.ctx.storage.put('hits', hits);
    return true;
  }
}
const allow = (env, key, limit, windowMs) => env.CHAT_DO_LIMITER.get(env.CHAT_DO_LIMITER.idFromName(key)).hit(limit, windowMs);

const DEFAULT_MODEL = 'ministral-8b-latest'; // override with the MODEL var in wrangler.toml
const MAX_TOKENS = 450;
const MAX_BODY_BYTES = 24_000;
const MAX_MESSAGES = 12;
const MAX_USER_CHARS = 400;
const MAX_ASSISTANT_CHARS = 4_000;
const UPSTREAM_TIMEOUT_MS = 20_000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors = originOk
      ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', Vary: 'Origin' }
      : { Vary: 'Origin' };
    const json = (status, body) => new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...cors },
    });

    if (new URL(request.url).pathname !== '/chat') return json(404, { error: 'not_found' });
    if (request.method === 'OPTIONS') return new Response(null, { status: originOk ? 204 : 403, headers: cors });
    if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' });
    if (!originOk) return json(403, { error: 'forbidden_origin' });
    if (!env.MISTRAL_API_KEY) return json(503, { error: 'not_configured' });

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!(await allow(env, `ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW))) return json(429, { error: 'rate_limited' });

    if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) return json(415, { error: 'unsupported_media_type' });
    const declared = Number(request.headers.get('Content-Length') || 0);
    if (declared > MAX_BODY_BYTES) return json(413, { error: 'too_large' });
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(413, { error: 'too_large' });

    let body;
    try { body = JSON.parse(raw); } catch { return json(400, { error: 'invalid_json' }); }
    const messages = validateMessages(body?.messages);
    if (!messages) return json(400, { error: 'invalid_messages' });
    // only requests that will reach Mistral count toward the site-wide daily cap
    if (!(await allow(env, 'global', DAILY_CAP, DAY))) return json(429, { error: 'daily_cap' });

    let upstream;
    try {
      upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.MISTRAL_API_KEY}` },
        body: JSON.stringify({ model: env.MODEL || DEFAULT_MODEL, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], max_tokens: MAX_TOKENS, temperature: 0.4 }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch {
      return json(504, { error: 'upstream_unavailable' });
    }
    if (upstream.status === 429) return json(429, { error: 'busy' }); // Mistral plan limit: the site asks the visitor to retry
    if (!upstream.ok) return json(502, { error: 'upstream_error' }); // never forward upstream bodies (may echo account details)
    const data = await upstream.json().catch(() => null);
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) return json(502, { error: 'empty_reply' });
    return json(200, { reply: reply.slice(0, 6_000) });
  },
};

function validateMessages(list) {
  if (!Array.isArray(list) || list.length === 0 || list.length > MAX_MESSAGES) return null;
  const out = [];
  for (const m of list) {
    if (!m || typeof m !== 'object' || Array.isArray(m)) return null;
    const { role, content } = m;
    if (role !== 'user' && role !== 'assistant') return null; // a client can never inject a system message
    if (typeof content !== 'string' || !content.trim()) return null;
    if (content.length > (role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS)) return null;
    out.push({ role, content });
  }
  if (out[0].role !== 'user' || out[out.length - 1].role !== 'user') return null;
  return out;
}
