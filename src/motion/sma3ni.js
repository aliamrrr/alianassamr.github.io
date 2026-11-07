import { C, clamp, easeOut, roundRect, rnd } from './engine';

/*
 * Sma3ni, as a product demo on canvas.
 * A citizen records a voice note in Darija; it travels through the real event-driven pipeline
 * (api → PostgreSQL outbox → relay → NATS JetStream → asr-worker with Voxtral → nlp-worker with LIDstral
 * and the routing rules) and lands in the agent console as a written, classified request,
 * while the citizen keeps a tracking code.
 * Two layouts: landscape (cards side by side, pipeline in the middle) and square (cards on top).
 */

const ORANGE = '#E8590C'; // model nodes
const BORDER = '#d5dade';
const IDLE = '#dfe3e7';
const CODE = 'SM-7KQ2F-X4PDM';
// "Hello, the power has been cut in our neighbourhood since yesterday, and I paid the bill."
const WORDS = ['السلام،', 'الضو', 'مقطوع', 'عندنا', 'فالحومة', 'من', 'البارح،', 'والفاتورة', 'خلصتها'];
const HIT = new Set([1, 2, 7]); // keywords of the eau_electricite rule (والفاتورة matches الفاتورة once the و is stripped)
const GLOSS = 'Power has been out in our neighbourhood since yesterday, and I paid the bill.';

const SEQ = [['rec', 1700], ['e:cit>api', 300], ['n:api', 350], ['e:api>pg', 250], ['n:pg', 250], ['e:pg>relay', 250],
  ['n:relay', 200], ['e:relay>nats', 250], ['n:nats1', 250], ['e:nats>asr', 250], ['n:asr', 1500], ['e:asr>nats', 250],
  ['n:nats2', 250], ['e:nats>nlp', 250], ['n:nlp', 1050], ['e:nlp>agent', 300], ['done', 400]];
const TS = {};
let _t = 300;
for (const [k, d] of SEQ) { TS[k] = [_t, _t + d]; _t += d; }
export const SM_REST = _t + 200;
export const SM_LOOP = SM_REST + 3600;

const ph = (T, k) => clamp((T - TS[k][0]) / (TS[k][1] - TS[k][0]), 0, 1);
const past = (T, k) => T >= TS[k][1];
const inn = (T, k) => T >= TS[k][0] && T < TS[k][1];

const sans = (s, w = 400) => `${w} ${s}px Geist, sans-serif`;
const mono = (s, w = 400) => `${w} ${s}px "DM Mono", monospace`;
const arab = (s, w = 500) => `${w} ${s}px "Segoe UI", "Geeza Pro", "Noto Sans Arabic", Tahoma, sans-serif`;

function stage(T) {
  if (T < TS.rec[0]) return 'ready';
  if (T < TS.rec[1]) return 'citizen · voice note';
  if (T < TS['n:api'][1]) return 'api · 202 Accepted';
  if (T < TS['n:relay'][0]) return 'outbox · one transaction';
  if (T < TS['n:nats1'][0]) return 'relay · publish';
  if (T < TS['n:asr'][0]) return 'event · request.received';
  if (T < TS['n:asr'][1]) return 'asr-worker · Voxtral';
  if (T < TS['n:nlp'][0]) return 'event · request.transcribed';
  if (T < TS['n:nlp'][1]) return 'nlp-worker · LIDstral + rules';
  return 'routed · request.routed';
}

/* layouts: boxes and edge polylines in virtual pixels */
function layout(wide, H) {
  if (wide) {
    // cards fill the height; the five pipeline rows spread evenly between them
    const top = 38, bot = Math.max(H, 320) - 14, ch = bot - top;
    const gap = (ch - 4 - 34 * 3 - 40 - 50) / 4;
    let yy = top + 4;
    const row = (hh) => { const r = yy; yy += hh + gap; return r; };
    const api = row(34), pg = row(34), relay = row(34), nats = row(40), wk = row(50);
    const mid = (a, ha, b) => (a + ha + b) / 2 + 0.5;
    return {
      W: 640, cit: { x: 18, y: top, w: 178, h: ch }, agent: { x: 444, y: top, w: 178, h: ch },
      nodes: {
        api: { x: 245, y: api, w: 150, h: 34 }, pg: { x: 245, y: pg, w: 150, h: 34 }, relay: { x: 245, y: relay, w: 150, h: 34 },
        nats: { x: 225, y: nats, w: 190, h: 40 }, asr: { x: 214, y: wk, w: 100, h: 50 }, nlp: { x: 326, y: wk, w: 100, h: 50 },
      },
      edges: {
        'cit>api': [[196, api + 17], [245, api + 17]], 'api>pg': [[320, api + 34], [320, pg]], 'pg>relay': [[320, pg + 34], [320, relay]],
        'relay>nats': [[320, relay + 34], [320, nats]], 'nats>asr': [[256, nats + 40], [256, wk]], 'asr>nats': [[284, wk], [284, nats + 40]],
        'nats>nlp': [[384, nats + 40], [384, wk]], 'nlp>agent': [[426, wk + 25], [444, wk + 25]],
      },
      labels: [['api>pg', 'request + event, 1 tx', 326, mid(api, 34, pg)], ['pg>relay', 'NOTIFY', 326, mid(pg, 34, relay)], ['relay>nats', 'publish', 326, mid(relay, 34, nats)]],
      dashed: new Set(['nats>asr', 'asr>nats', 'nats>nlp']),
      sub: { api: 'FastAPI', pg: 'PostgreSQL · outbox', relay: 'LISTEN / NOTIFY', asr: 'Voxtral 4B · GPU', nlp: 'LIDstral + rules' },
      log: null,
    };
  }
  const top = 40, ch = 200, r1 = top + ch + 16, r2 = r1 + 66;
  return {
    W: 440, cit: { x: 16, y: top, w: 198, h: ch }, agent: { x: 226, y: top, w: 198, h: ch },
    nodes: {
      api: { x: 16, y: r1, w: 94, h: 38 }, pg: { x: 120, y: r1, w: 94, h: 38 }, relay: { x: 224, y: r1, w: 94, h: 38 },
      nats: { x: 328, y: r1, w: 96, h: 38 }, nlp: { x: 224, y: r2, w: 94, h: 46 }, asr: { x: 328, y: r2, w: 96, h: 46 },
    },
    edges: {
      'cit>api': [[63, top + ch], [63, r1]], 'api>pg': [[110, r1 + 19], [120, r1 + 19]], 'pg>relay': [[214, r1 + 19], [224, r1 + 19]],
      'relay>nats': [[318, r1 + 19], [328, r1 + 19]], 'nats>asr': [[364, r1 + 38], [364, r2]], 'asr>nats': [[388, r2], [388, r1 + 38]],
      'nats>nlp': [[342, r1 + 38], [342, r1 + 52], [271, r1 + 52], [271, r2]],
    },
    labels: [],
    dashed: new Set(['nats>asr', 'asr>nats', 'nats>nlp']),
    sub: { api: 'FastAPI', pg: 'outbox', relay: 'NOTIFY', asr: 'Voxtral 4B', nlp: 'LIDstral' },
    log: { x: 16, y: r2, w: 198, h: 46 },
  };
}

function fitFont(ctx, text, maxW, size, mk) {
  let s = size;
  ctx.font = mk(s);
  while (s > 6 && ctx.measureText(text).width > maxW) { s -= 0.5; ctx.font = mk(s); }
  return s;
}

function along(pts, f) {
  const seg = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let d = f * tot;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) { const u = seg[i] ? Math.min(1, d / seg[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; }
    d -= seg[i];
  }
  return pts[pts.length - 1];
}

/** One frame at time T (ms). `A` = base opacity (for crossfades). */
export function drawSma3ni(ctx, w, h, T, { A = 1 } = {}) {
  const wide = w / h > 1.3;
  const L0 = layout(wide, 0);
  const k = w / L0.W, W = L0.W, H = h / k;
  const Lo = layout(wide, H);
  ctx.save(); ctx.scale(k, k);
  const ga = (a) => { ctx.globalAlpha = A * a; };
  ga(1);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = '#eef0f2';
  for (let gy = 12; gy < H; gy += 16) for (let gx = 12; gx < W; gx += 16) ctx.fillRect(gx, gy, 1, 1);

  // header
  const hy = Lo.cit.y - 20;
  ctx.font = sans(wide ? 13 : 12, 600); ctx.fillStyle = C.ink; ctx.fillText('sma3ni', Lo.cit.x, hy);
  const tw = ctx.measureText('sma3ni').width;
  ctx.font = sans(wide ? 11 : 10); ctx.fillStyle = C.ink3; ctx.fillText('voice desk · Darija', Lo.cit.x + tw + 8, hy);
  ctx.textAlign = 'right'; ctx.font = mono(wide ? 10 : 9); ctx.fillStyle = C.red;
  ctx.fillText(stage(T), W - (W - Lo.agent.x - Lo.agent.w), hy); ctx.textAlign = 'left';

  // edges
  for (const [key, pts] of Object.entries(Lo.edges)) {
    const ek = `e:${key}`;
    const on = inn(T, ek), done = past(T, ek);
    ctx.save();
    ctx.setLineDash(Lo.dashed.has(key) ? [4, 3] : []);
    ctx.strokeStyle = on ? C.ink : done ? C.ink3 : IDLE; ctx.lineWidth = on ? 1.6 : 1.2;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke();
    ctx.restore();
    // arrow head
    const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    ctx.fillStyle = on ? C.ink : done ? C.ink3 : IDLE;
    ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0] - 6 * Math.cos(ang - 0.45), b[1] - 6 * Math.sin(ang - 0.45));
    ctx.lineTo(b[0] - 6 * Math.cos(ang + 0.45), b[1] - 6 * Math.sin(ang + 0.45)); ctx.closePath(); ctx.fill();
    if (on) {
      const f = easeOut(ph(T, ek));
      for (let j = 3; j >= 0; j--) {
        const [px, py] = along(pts, clamp(f - j * 0.08, 0, 1));
        ga(j ? 0.18 * (4 - j) : 1); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(px, py, j ? 2.5 : 3.6, 0, Math.PI * 2); ctx.fill();
      }
      ga(1);
    }
  }
  ctx.font = mono(8); ctx.fillStyle = C.ink3;
  for (const [key, text, x, y] of Lo.labels) { ga(past(T, `e:${key}`) || inn(T, `e:${key}`) ? 1 : 0.55); ctx.fillText(text, x, y); }
  ga(1);

  // pipeline nodes
  const N = Lo.nodes;
  const nodeState = {
    api: inn(T, 'n:api') ? 'busy' : past(T, 'n:api') ? 'done' : 'idle',
    pg: inn(T, 'n:pg') ? 'busy' : past(T, 'n:pg') ? 'done' : 'idle',
    relay: inn(T, 'n:relay') ? 'busy' : past(T, 'n:relay') ? 'done' : 'idle',
    nats: inn(T, 'n:nats1') || inn(T, 'n:nats2') ? 'busy' : past(T, 'n:nats1') ? 'done' : 'idle',
    asr: inn(T, 'n:asr') ? 'busy' : past(T, 'n:asr') ? 'done' : 'idle',
    nlp: inn(T, 'n:nlp') ? 'busy' : past(T, 'n:nlp') ? 'done' : 'idle',
  };
  const subject = T >= TS['n:nlp'][1] ? 'request.routed' : T >= TS['n:nats2'][0] ? 'request.transcribed' : T >= TS['n:nats1'][0] ? 'request.received' : 'stream SMA3NI';
  const names = { api: 'api', pg: 'postgres', relay: 'relay', nats: 'NATS JetStream', asr: 'asr-worker', nlp: 'nlp-worker' };
  for (const id of Object.keys(N)) {
    const r = N[id], s = nodeState[id], model = id === 'asr' || id === 'nlp';
    if (s === 'busy') {
      ga(0.12 + 0.08 * Math.sin(T / 120)); ctx.fillStyle = model ? ORANGE : C.red;
      roundRect(ctx, r.x - 4, r.y - 4, r.w + 8, r.h + 8, 10); ctx.fill(); ga(1);
    }
    ctx.fillStyle = '#fff'; roundRect(ctx, r.x, r.y, r.w, r.h, 7); ctx.fill();
    ctx.strokeStyle = s === 'busy' ? C.ink : s === 'done' ? C.green : BORDER; ctx.lineWidth = s === 'busy' ? 1.5 : 1; ctx.stroke();
    if (model) { ctx.fillStyle = s === 'idle' ? IDLE : ORANGE; ctx.fillRect(r.x + 8, r.y + 9, 6, 6); }
    const tx = r.x + (model ? 19 : 9), tmax = r.w - (model ? 25 : 16);
    const sub = id === 'nats' ? subject : Lo.sub[id];
    fitFont(ctx, names[id], tmax, wide ? 11 : 10, (z) => sans(z, 600));
    ctx.fillStyle = s === 'idle' ? C.ink3 : C.ink;
    ctx.fillText(names[id], tx, r.y + (wide ? 12 : 12));
    fitFont(ctx, sub, tmax, wide ? 9 : 8, (z) => mono(z));
    ctx.fillStyle = id === 'nats' && s !== 'idle' ? C.red : C.ink3;
    ctx.fillText(sub, tx, r.y + (wide ? 26 : 26));
    if (model && s === 'busy') { // progress bar
      const p = ph(T, `n:${id}`);
      ctx.fillStyle = IDLE; ctx.fillRect(tx, r.y + r.h - 9, tmax, 2.5);
      ctx.fillStyle = ORANGE; ctx.fillRect(tx, r.y + r.h - 9, tmax * p, 2.5);
    }
  }

  drawCitizen(ctx, Lo.cit, T, wide, ga);
  drawAgent(ctx, Lo.agent, T, wide, ga);
  if (Lo.log) drawLog(ctx, Lo.log, T, ga);

  ctx.restore();
}

function card(ctx, r, title, lit) {
  ctx.fillStyle = '#fff'; roundRect(ctx, r.x, r.y, r.w, r.h, 10); ctx.fill();
  ctx.strokeStyle = lit ? C.ink : BORDER; ctx.lineWidth = lit ? 1.4 : 1; ctx.stroke();
  ctx.font = mono(8.5); ctx.fillStyle = C.ink3; ctx.fillText(title, r.x + 12, r.y + 15);
}

function drawCitizen(ctx, r, T, wide, ga) {
  card(ctx, r, 'CITIZEN · WHATSAPP', inn(T, 'rec'));
  const cx = r.x + r.w / 2, my = r.y + (wide ? 62 : 50), mr = wide ? 22 : 18;
  const rec = inn(T, 'rec'), sent = T >= TS.rec[1];
  if (rec) { ga(0.15 + 0.15 * Math.sin(T / 140)); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(cx, my, mr + 7 + 3 * Math.sin(T / 140), 0, Math.PI * 2); ctx.fill(); ga(1); }
  ctx.fillStyle = rec ? C.red : sent ? C.green : '#f3f4f6';
  ctx.beginPath(); ctx.arc(cx, my, mr, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = rec || sent ? '#fff' : C.ink2; ctx.lineWidth = 2; ctx.lineCap = 'round';
  if (sent) { // check
    ctx.beginPath(); ctx.moveTo(cx - mr * 0.38, my + 1); ctx.lineTo(cx - mr * 0.08, my + mr * 0.3); ctx.lineTo(cx + mr * 0.4, my - mr * 0.3); ctx.stroke();
  } else { // mic
    const s = mr / 24;
    roundRect(ctx, cx - 5 * s, my - 12 * s, 10 * s, 16 * s, 5 * s); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, my - 1 * s, 9 * s, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, my + 8 * s); ctx.lineTo(cx, my + 12 * s); ctx.stroke();
  }
  ctx.lineCap = 'butt';

  // waveform
  const n = wide ? 30 : 32, wy = my + mr + (wide ? 24 : 20), bw = (r.w - 24) / n;
  const shown = rec ? Math.floor(n * ph(T, 'rec')) : sent ? n : 0;
  for (let i = 0; i < n; i++) {
    const base = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.7) * rnd(i + 3));
    let hgt = (wide ? 18 : 12) * base;
    if (rec && i === shown - 1) hgt *= 0.6 + 0.4 * Math.abs(Math.sin(T / 60));
    const on = i < shown;
    ctx.fillStyle = on ? (rec ? C.red : C.ink) : IDLE;
    const hh = on ? Math.max(2, hgt) : 2;
    ctx.fillRect(r.x + 12 + i * bw + bw * 0.2, wy - hh / 2, bw * 0.6, hh);
  }
  const secs = rec ? Math.floor(7 * ph(T, 'rec')) : sent ? 7 : 0;
  ctx.font = mono(9); ctx.fillStyle = rec ? C.red : C.ink3; ctx.textAlign = 'center';
  ctx.fillText(rec ? `● 0:0${secs}` : `0:0${secs}`, cx, wy + (wide ? 20 : 16));
  ctx.textAlign = 'left';

  // 202 + tracking code
  let y = wy + (wide ? 38 : 30);
  if (T >= TS['n:api'][0]) {
    ga(easeOut(ph(T, 'n:api')));
    ctx.font = mono(9); ctx.fillStyle = C.green; ctx.fillText('✓ sent · 202 Accepted', r.x + 12, y);
    const by = y + (wide ? 14 : 10), bh = wide ? 34 : 26;
    ctx.fillStyle = '#f6f7f8'; roundRect(ctx, r.x + 12, by, r.w - 24, bh, 6); ctx.fill();
    ctx.font = mono(7.5); ctx.fillStyle = C.ink3; ctx.fillText('tracking code', r.x + 20, by + (wide ? 10 : 8));
    fitFont(ctx, CODE, r.w - 40, wide ? 13 : 11, (z) => mono(z, 500)); ctx.fillStyle = C.ink;
    ctx.fillText(CODE, r.x + 20, by + (wide ? 24 : 18));
    ga(1);
    y = by + bh;
  } else y += wide ? 48 : 36;

  // status stepper
  const steps = [['Received', T >= TS['n:api'][1]], ['Transcribed', past(T, 'n:asr')], ['Routed', T >= TS['e:nlp>agent'][1]]];
  const sy = y + (wide ? 22 : 14), sx0 = r.x + 18, sx1 = r.x + r.w - 18;
  ctx.strokeStyle = IDLE; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx0, sy); ctx.lineTo(sx1, sy); ctx.stroke();
  const reached = steps.filter((s) => s[1]).length;
  if (reached > 1) { ctx.strokeStyle = C.green; ctx.beginPath(); ctx.moveTo(sx0, sy); ctx.lineTo(sx0 + (sx1 - sx0) * (reached - 1) / 2, sy); ctx.stroke(); }
  steps.forEach(([label, ok], i) => {
    const x = sx0 + (sx1 - sx0) * i / 2;
    ctx.fillStyle = ok ? C.green : '#fff'; ctx.strokeStyle = ok ? C.green : BORDER; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, sy, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.font = sans(wide ? 9 : 8, ok ? 500 : 400); ctx.fillStyle = ok ? C.ink : C.ink3;
    ctx.textAlign = i === 0 ? 'left' : i === 2 ? 'right' : 'center';
    ctx.fillText(label, i === 0 ? x - 4 : i === 2 ? x + 4 : x, sy + (wide ? 13 : 11));
  });
  ctx.textAlign = 'left';
  if (steps[2][1] && wide) {
    ga(easeOut(clamp((T - TS['e:nlp>agent'][1]) / 300, 0, 1)));
    ctx.font = sans(10, 500); ctx.fillStyle = C.ink; ctx.fillText('→ Eau & électricité (SRM)', r.x + 12, sy + 32);
    ga(1);
  }
}

function chip(ctx, x, y, text, fill, color, size) {
  ctx.font = mono(size); const cw = ctx.measureText(text).width + 12;
  ctx.fillStyle = fill; roundRect(ctx, x, y, cw, size + 8, (size + 8) / 2); ctx.fill();
  ctx.fillStyle = color; ctx.fillText(text, x + 6, y + (size + 8) / 2 + 0.5);
  return cw;
}

function drawAgent(ctx, r, T, wide, ga) {
  const lit = inn(T, 'e:nlp>agent') || inn(T, 'n:asr');
  card(ctx, r, 'AGENT CONSOLE', lit);
  const status = T < TS['n:pg'][0] ? null : T < TS['n:asr'][0] ? 'RECEIVED' : T < TS['n:asr'][1] ? 'TRANSCRIBING' : T < TS['e:nlp>agent'][1] ? 'TRANSCRIBED' : 'ROUTED';
  if (status) {
    ctx.font = mono(7.5, 500); const sw = ctx.measureText(status).width + 10;
    ctx.fillStyle = status === 'ROUTED' ? C.green : status === 'TRANSCRIBING' ? ORANGE : C.ink2;
    roundRect(ctx, r.x + r.w - 10 - sw, r.y + 8, sw, 14, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText(status, r.x + r.w - 5 - sw, r.y + 15.5);
  }
  const pad = 12, x0 = r.x + pad, xr = r.x + r.w - pad;
  let y = r.y + (wide ? 34 : 30);
  if (!status) {
    ctx.font = sans(wide ? 10 : 9); ctx.fillStyle = C.ink3; ctx.fillText('waiting for requests…', x0, y);
    return;
  }
  ctx.font = mono(wide ? 10 : 9, 500); ctx.fillStyle = C.ink; ctx.fillText(CODE, x0, y);
  y += wide ? 18 : 14;
  ctx.font = mono(7.5); ctx.fillStyle = C.ink3; ctx.fillText('transcript', x0, y);
  y += wide ? 16 : 13;

  // Arabic transcript, laid out right to left word by word
  const size = wide ? 14 : 12, lh = wide ? 22 : 18;
  const nShown = past(T, 'n:asr') ? WORDS.length : inn(T, 'n:asr') ? Math.floor(WORDS.length * clamp(ph(T, 'n:asr') * 1.1, 0, 1)) : 0;
  const hl = T >= TS['n:nlp'][0] ? easeOut(clamp((ph(T, 'n:nlp') - 0.45) / 0.2, 0, 1)) : 0;
  ctx.font = arab(size); ctx.textAlign = 'right';
  const space = ctx.measureText(' ').width + 1;
  let xx = xr, line = 0;
  for (let i = 0; i < WORDS.length; i++) {
    const ww = ctx.measureText(WORDS[i]).width;
    if (xx - ww < x0) { line++; xx = xr; }
    const wy = y + line * lh;
    if (i < nShown) {
      if (HIT.has(i) && hl > 0) { ga(hl); ctx.fillStyle = '#F6E3A6'; roundRect(ctx, xx - ww - 3, wy - size * 0.72, ww + 6, size * 1.45, 4); ctx.fill(); ga(1); }
      ctx.fillStyle = C.ink; ctx.fillText(WORDS[i], xx, wy);
    } else if (inn(T, 'n:asr')) {
      ctx.fillStyle = '#f0f2f4'; roundRect(ctx, xx - ww, wy - 4, ww, 8, 4); ctx.fill();
    }
    xx -= ww + space;
  }
  ctx.textAlign = 'left';
  y += line * lh + (wide ? 18 : 15);

  // English gloss
  if (past(T, 'n:asr')) {
    ga(easeOut(clamp((T - TS['n:asr'][1]) / 400, 0, 1)));
    ctx.font = sans(wide ? 9.5 : 8.5); ctx.fillStyle = C.ink3;
    const words = GLOSS.split(' '); let cur = '', gl = 0; const maxW = r.w - pad * 2;
    for (const wd of words) {
      const t = cur ? `${cur} ${wd}` : wd;
      if (cur && ctx.measureText(t).width > maxW) { ctx.fillText(cur, x0, y + gl * 12); gl++; cur = wd; } else cur = t;
    }
    ctx.fillText(cur, x0, y + gl * 12);
    y += (gl + 1) * 12 + (wide ? 10 : 6);
    ga(1);
  } else y += wide ? 34 : 30;

  // classification chips (nlp-worker)
  const p = T >= TS['n:nlp'][0] ? ph(T, 'n:nlp') : 0;
  const chips = [
    [p > 0.2, 'dialect · Darija', '#eef4fb', '#2f5f93'],
    [p > 0.5, 'rule · eau_electricite', '#fbf3dc', '#8a6512'],
    [p > 0.8, '→ SRM · eau & électricité', '#e7f2ec', C.green],
    [p > 0.8, 'priority 3', '#f3f4f6', C.ink2],
  ];
  const cs = wide ? 8.5 : 7.5, chH = cs + 8;
  let cx = x0;
  for (const [on, text, fill, color] of chips) {
    if (!on) continue;
    ctx.font = mono(cs); const cw = ctx.measureText(text).width + 12;
    if (cx + cw > xr && cx > x0) { cx = x0; y += chH + 5; }
    chip(ctx, cx, y, text, fill, color, cs);
    cx += cw + 5;
  }
}

function drawLog(ctx, r, T, ga) {
  ctx.font = mono(7.5); ctx.fillStyle = C.ink3; ctx.fillText('events · explicit ack', r.x, r.y + 5);
  const rows = [['request.received', TS['n:nats1'][0]], ['request.transcribed', TS['n:nats2'][0]], ['request.routed', TS['n:nlp'][1]]];
  rows.forEach(([name, t0], i) => {
    if (T < t0) return;
    ga(easeOut(clamp((T - t0) / 250, 0, 1)));
    const y = r.y + 18 + i * 12;
    ctx.font = mono(8); ctx.fillStyle = C.ink; ctx.fillText(`sma3ni.${name}`, r.x, y);
    ctx.fillStyle = C.green; ctx.textAlign = 'right'; ctx.fillText('ack ✓', r.x + r.w, y); ctx.textAlign = 'left';
    ga(1);
  });
}
