/*
 * AliLLM proxy (Cloudflare Worker).
 * The Mistral key lives here as a Worker secret and never reaches the browser.
 * The site POSTs { messages: [{ role, content }, ...] } to /chat and gets { reply }.
 *
 * Controls enforced server-side (the browser's own checks are only UX):
 *  - exact Origin allowlist (ALLOWED_ORIGINS) for CORS and for the request itself
 *  - per-IP rate limit (CHAT_LIMITER binding)
 *  - body size, message count, roles and lengths validated
 *  - model, token budget, temperature and system prompt fixed here, not by the client
 */
import SYSTEM_PROMPT from '../../src/data/systemPrompt.js';

const MODEL = 'mistral-small-latest';
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

    if (env.CHAT_LIMITER) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.CHAT_LIMITER.limit({ key: ip });
      if (!success) return json(429, { error: 'rate_limited' });
    }

    if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) return json(415, { error: 'unsupported_media_type' });
    const declared = Number(request.headers.get('Content-Length') || 0);
    if (declared > MAX_BODY_BYTES) return json(413, { error: 'too_large' });
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(413, { error: 'too_large' });

    let body;
    try { body = JSON.parse(raw); } catch { return json(400, { error: 'invalid_json' }); }
    const messages = validateMessages(body?.messages);
    if (!messages) return json(400, { error: 'invalid_messages' });

    let upstream;
    try {
      upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.MISTRAL_API_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], max_tokens: MAX_TOKENS, temperature: 0.4 }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch {
      return json(504, { error: 'upstream_unavailable' });
    }
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
