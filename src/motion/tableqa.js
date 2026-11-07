import { C, clamp, easeOut, easeInOut, roundRect } from './engine';

/*
 * ALTEN · Cobot-Greenwashing: the table tool as an agent graph, drawn on canvas.
 * A numerical-reasoning question on a real CSR table with a hierarchical index
 * (GHG emissions, scopes 1 & 2) flows through the graph:
 *   router (5 question experts) → numeric expert → select rows → select columns → LLM → judge,
 * with a metadata node feeding the table agents. Below: the live artifact (table being pruned,
 * then the computation) and the LLM-as-a-Judge results of each method on that question type.
 * Figures: table values from the report's Figure 2.1.17; scores from Figure 2.1.15 and Table 2.3.2.
 */

export const SERIES = { table: '#3D7FC2', experts: '#B8891A', chain: '#C1272D' };
const IDLE = '#dfe3e7';

const Q = 'By how much did gross Scope 1 emissions fall between 2019 and 2024?';
const CATS = ['lookup', 'summary', 'fact-check', 'analysis', 'numeric'];
const PICK = 4;
const HEAD = ['', '2019', '2023', '2024'];
const ROWS = [
  { g: 'Scope 1 GHG emissions' },
  { l: 'Gross scope 1 (tCO2eq)', v: ['940,582', '783,818', '669,327'] },
  { l: '% in regulated ETS', v: ['0%', '0%', '0%'] },
  { g: 'Scope 2 GHG emissions' },
  { l: 'Gross scope 2, location', v: ['946,258', '748,564', '751,252'] },
  { l: 'Gross scope 2, market', v: ['1,027,176', '629,053', '555,813'] },
];
const KEEP = 1, DROP = 1; // keep "Gross scope 1"; drop the 2023 column
const CALC = [['Δ = 669,327 − 940,582', -1], ['  = −271,255 tCO2eq', 1], ['  = −28.8% vs 2019', 1]];
const ANSWER = 'Scope 1 fell by 271,255 tCO2eq (−28.8%).';
const CHECKS = ['grounded in the sub-table', 'calculation re-done', 'matches the reference'];

/* timeline: the packet walks the graph; each step = [kind, from/node, to, ms] */
const SEQ = [['e', 'q', 'router', 350], ['n', 'router', 950], ['e', 'router', 'numeric', 300], ['n', 'numeric', 250],
  ['e', 'numeric', 'rows', 300], ['n', 'rows', 850], ['e', 'rows', 'cols', 300], ['n', 'cols', 750],
  ['e', 'cols', 'llm', 300], ['n', 'llm', 1500], ['e', 'llm', 'judge', 300], ['n', 'judge', 1300]];
const TQ = [200, 1100];
const TS = {}; // TS['n:rows'] = [start, end], TS['e:rows>cols'] = [start, end]
{ let t = 1150; for (const [k, a, b, d] of SEQ) { const key = k === 'e' ? `e:${a}>${b}` : `n:${a}`; TS[key] = [t, t + (k === 'e' ? d : b)]; t += k === 'e' ? d : b; } }
const T_META = [TS['n:judge'][1], TS['n:judge'][1] + 500];
export const TQ_REST = T_META[1] + 400;
export const TQ_LOOP = TQ_REST + 4000;

const sans = (s, w = 400) => `${w} ${s}px Geist, sans-serif`;
const mono = (s, w = 400) => `${w} ${s}px "DM Mono", monospace`;
const ph = (T, [a, b]) => clamp((T - a) / (b - a), 0, 1);

function wrap(ctx, text, maxW) {
  const out = []; let cur = '';
  for (const word of text.split(' ')) { const t = cur ? `${cur} ${word}` : word; if (cur && ctx.measureText(t).width > maxW) { out.push(cur); cur = word; } else cur = t; }
  if (cur) out.push(cur);
  return out;
}

function stage(T) {
  if (T < TS['n:router'][0]) return 'question';
  if (T < TS['n:numeric'][0]) return 'router · classify';
  if (T < TS['n:rows'][0]) return 'expert · numerical reasoning';
  if (T < TS['n:cols'][0]) return 'agent · select rows';
  if (T < TS['n:llm'][0]) return 'agent · select columns';
  if (T < TS['n:judge'][0]) return 'LLM · reason';
  return 'judge · LLM-as-a-Judge';
}

/** One frame at time T (ms). `A` = base opacity (for crossfades). */
export function drawTableQA(ctx, w, h, T, { A = 1, running = false } = {}) {
  // landscape boxes (the 4:3 card, the case-study hero): graph on top, artifact + results side by side
  const wide = w >= 400 && w / h > 1.25;
  const L = wide ? Math.max(w, 500) : Math.max(w, 440);
  const k = w / L; const W = L, H = h / k;
  ctx.save(); ctx.scale(k, k);
  const ga = (a) => { ctx.globalAlpha = A * a; };
  ga(1);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = '#eef0f2';
  for (let gy = 12; gy < H; gy += 16) for (let gx = 12; gx < W; gx += 16) ctx.fillRect(gx, gy, 1, 1);

  const pad = 18, x0 = pad, CW = W - pad * 2;
  let y = pad + 4;

  // header
  ctx.font = mono(10.5); ctx.fillStyle = C.ink3; ctx.fillText('ALTEN LABS / AGENT GRAPH', x0, y);
  const lab = running ? stage(T) : 'chain-of-tables · numerical reasoning';
  ctx.textAlign = 'right'; ctx.fillStyle = running ? C.ink : C.ink3; ctx.fillText(lab, W - pad, y); ctx.textAlign = 'left';
  if (running) { const lw = ctx.measureText(lab).width; ga(.55 + .45 * Math.sin(T / 150)); ctx.fillStyle = C.red; ctx.fillRect(W - pad - lw - 10, y - 2.5, 5, 5); ga(1); }
  y += 14;

  // question bubble (left, it feeds the router)
  ctx.font = sans(12.5);
  const lines = wrap(ctx, Q, Math.min(CW, 520) - 22);
  const bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 22, bh = lines.length * 16 + 10;
  ctx.fillStyle = '#eceff1'; ctx.fillRect(x0, y, bw, bh);
  let left = Math.floor(Q.length * ph(T, TQ));
  lines.forEach((l, i) => { const s = l.slice(0, Math.max(0, left)); left -= l.length + 1; ctx.fillStyle = C.ink; ctx.fillText(s, x0 + 11, y + 5 + 16 * i + 8); });
  const qOut = { x: x0 + 26, y: y + bh };
  y += bh + 10;

  // layout
  let G, Ab, Rb;
  if (wide) {
    const gh = Math.min(190, (H - y) * .42);
    G = { x: x0, y, w: CW, h: gh };
    const by = y + gh + 14, bh2 = H - by - pad;
    Ab = { x: x0, y: by, w: CW * .56, h: bh2 };
    Rb = { x: x0 + CW * .56 + 24, y: by + 4, w: CW * .44 - 24, h: bh2 - 4 };
  } else {
    const restH = H - y - pad;
    const ah = 104, rh = Math.max(74, Math.min(96, restH * .24));
    const gh = Math.max(96, restH - ah - rh - 20);
    G = { x: x0, y, w: CW, h: gh };
    Ab = { x: x0, y: y + gh + 10, w: CW, h: ah };
    Rb = { x: x0, y: y + gh + 10 + ah + 12, w: CW, h: rh };
  }

  drawGraph(ctx, G, T, qOut, ga);
  drawArtifact(ctx, Ab, T, ga);
  drawResults(ctx, Rb, T, ga);
  ctx.restore();
}

/* ── graph ─────────────────────────────────────────────── */
function nodes(G) {
  const lane = G.y + G.h * .42;
  const at = (fx, fy) => ({ x: G.x + G.w * fx, y: fy });
  const N = {
    router: { ...at(.075, lane), label: 'router' },
    rows: { ...at(.53, lane), label: 'rows' },
    cols: { ...at(.67, lane), label: 'cols' },
    llm: { ...at(.81, lane), label: 'LLM' },
    judge: { ...at(.945, lane), label: 'judge' },
    meta: { ...at(.6, G.y + G.h * .9), label: 'metadata' },
  };
  CATS.forEach((c, i) => { N[`x${i}`] = { ...at(.3, G.y + G.h * (.08 + .21 * i)), label: c }; });
  N.numeric = N[`x${PICK}`];
  return N;
}

function bez(p0, p3, vertical = false) {
  const dx = (p3.x - p0.x) * .5, dy = (p3.y - p0.y) * .5;
  const c1 = vertical ? { x: p0.x, y: p0.y + dy } : { x: p0.x + dx, y: p0.y };
  const c2 = vertical ? { x: p3.x, y: p3.y - dy } : { x: p3.x - dx, y: p3.y };
  return (t) => {
    const u = 1 - t;
    return { x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x, y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y };
  };
}
function stroke(ctx, f, a = 0, b = 1, n = 28) {
  ctx.beginPath(); const p = f(a); ctx.moveTo(p.x, p.y);
  for (let i = 1; i <= n; i++) { const q = f(a + (b - a) * i / n); ctx.lineTo(q.x, q.y); }
  ctx.stroke();
}

function drawGraph(ctx, G, T, qOut, ga) {
  const N = nodes(G);
  ctx.font = mono(9.5);
  for (const n of Object.values(N)) { n.w = ctx.measureText(n.label).width + 12; n.h = 18; }
  const R = (n) => ({ x: n.x + n.w / 2, y: n.y }), Lft = (n) => ({ x: n.x - n.w / 2, y: n.y });

  // edge: idle (dashed), flowing (red, with a packet), done (ink)
  const edge = (f, win, opts = {}) => {
    const p = win ? ph(T, win) : 0;
    ctx.setLineDash(p >= 1 ? [] : [3, 3]); ctx.lineWidth = 1; ctx.strokeStyle = opts.dim ? '#eceff1' : IDLE; ga(1);
    if (p < 1) stroke(ctx, f);
    ctx.setLineDash([]);
    if (p > 0) {
      ctx.strokeStyle = p >= 1 ? C.ink2 : C.red; ctx.lineWidth = p >= 1 ? 1.2 : 1.6; stroke(ctx, f, 0, easeInOut(p));
      if (p < 1) { const q = f(easeInOut(p)); ctx.save(); ctx.shadowColor = 'rgba(193,39,45,.6)'; ctx.shadowBlur = 8; ctx.fillStyle = C.red; ctx.fillRect(q.x - 3, q.y - 3, 6, 6); ctx.restore(); }
    }
  };

  // question → router
  const rIn = Lft(N.router);
  edge(bez(qOut, { x: rIn.x, y: rIn.y }, true), TS['e:q>router']);

  // router ⇄ experts: the router scans the five experts, then commits
  const rt = TS['n:router'];
  const scan = T >= rt[0] && T < rt[1] ? Math.floor(ph(T, rt) * 9) % 5 : -1;
  const routed = T >= rt[1];
  CATS.forEach((_, i) => {
    const n = N[`x${i}`];
    const f = bez(R(N.router), Lft(n));
    if (i === PICK) edge(f, TS['e:router>numeric']);
    else edge(f, null, { dim: routed });
    if (scan === i) { ctx.strokeStyle = 'rgba(193,39,45,.45)'; ctx.lineWidth = 1.4; stroke(ctx, f); }
    // experts → rows: only the chosen one carries the packet
    const g = bez(R(n), Lft(N.rows));
    if (i === PICK) edge(g, TS['e:numeric>rows']); else edge(g, null, { dim: true });
  });
  // the main chain
  edge(bez(R(N.rows), Lft(N.cols)), TS['e:rows>cols']);
  edge(bez(R(N.cols), Lft(N.llm)), TS['e:cols>llm']);
  edge(bez(R(N.llm), Lft(N.judge)), TS['e:llm>judge']);
  // metadata feeds the table agents and the LLM
  const mTop = { x: N.meta.x, y: N.meta.y - 9 };
  edge(bez(mTop, { x: N.rows.x + 6, y: N.rows.y + 9 }, true), [TS['n:rows'][0] - 250, TS['n:rows'][0]]);
  edge(bez(mTop, { x: N.cols.x, y: N.cols.y + 9 }, true), [TS['n:cols'][0] - 250, TS['n:cols'][0]]);
  edge(bez(mTop, { x: N.llm.x - 6, y: N.llm.y + 9 }, true), [TS['n:llm'][0] - 250, TS['n:llm'][0]]);

  // nodes
  const win = (id) => TS[`n:${id}`];
  const drawNode = (n, state, alpha = 1) => {
    ga(alpha);
    const x = n.x - n.w / 2, y = n.y - n.h / 2;
    ctx.fillStyle = state === 'busy' ? C.red : '#fff'; roundRect(ctx, x, y, n.w, n.h, 4); ctx.fill();
    ctx.strokeStyle = state === 'busy' ? C.red : state === 'done' ? C.green : '#d6dbe0'; ctx.lineWidth = 1; roundRect(ctx, x + .5, y + .5, n.w - 1, n.h - 1, 4); ctx.stroke();
    if (state === 'busy') { ga(alpha * (.25 + .25 * Math.sin(T / 120))); ctx.strokeStyle = C.red; roundRect(ctx, x - 3, y - 3, n.w + 6, n.h + 6, 6); ctx.stroke(); ga(alpha); }
    ctx.font = mono(9.5); ctx.fillStyle = state === 'busy' ? '#fff' : state === 'done' ? C.green : C.ink3; ctx.textAlign = 'center';
    ctx.fillText(n.label, n.x, n.y + .5); ctx.textAlign = 'left'; ga(1);
  };
  const st = (id) => { const [a, b] = win(id); return T >= b ? 'done' : T >= a ? 'busy' : 'idle'; };
  drawNode(N.router, st('router'));
  CATS.forEach((_, i) => {
    const n = N[`x${i}`];
    if (i === PICK) drawNode(n, scan === i ? 'busy' : st('numeric'));
    else drawNode(n, scan === i ? 'busy' : 'idle', routed ? .45 : 1);
  });
  ['rows', 'cols', 'llm', 'judge'].forEach((id) => drawNode(N[id], st(id)));
  const metaOn = T >= TS['n:rows'][0] - 250;
  drawNode(N.meta, metaOn ? (T < TS['n:judge'][0] ? 'busy' : 'done') : 'idle');
  // tiny annotations
  ctx.font = mono(8.5); ctx.fillStyle = C.ink3;
  if (routed) { ga(ph(T, [rt[1], rt[1] + 300])); ctx.fillText('5 experts · few-shot', N.x0.x - N.x0.w / 2, N.x0.y - 15); ga(1); }
  if (metaOn) { ga(ph(T, [TS['n:rows'][0] - 250, TS['n:rows'][0]])); ctx.textAlign = 'left'; ctx.fillText('hier. index · merged', N.meta.x + N.meta.w / 2 + 6, N.meta.y + .5); ga(1); }
}

/* ── artifact: the table being pruned, then the reasoning ─ */
function drawArtifact(ctx, B, T, ga) {
  ctx.strokeStyle = '#d6dbe0'; ctx.lineWidth = 1; ctx.fillStyle = '#fff';
  ctx.fillRect(B.x, B.y, B.w, B.h); ctx.strokeRect(B.x + .5, B.y + .5, B.w - 1, B.h - 1);
  const tag = T < TS['n:rows'][0] ? 'input · CSR table · hierarchical index' : T < TS['n:cols'][0] ? 'select rows' : T < TS['n:llm'][0] ? 'select columns' : 'sub-table → reasoning';
  ctx.font = mono(9); ctx.fillStyle = C.ink3; ctx.fillText(tag, B.x + 8, B.y + 9);

  const tx = B.x + 8, ty = B.y + 18, tw = B.w - 16, hh = 14, rh = 13;
  const rk = easeInOut(ph(T, [TS['n:rows'][0] + 380, TS['n:rows'][1]]));
  const ck = easeInOut(ph(T, [TS['n:cols'][0] + 330, TS['n:cols'][1]]));
  const base = [.43, .19, .19, .19];
  const share = base[DROP + 1] * ck;
  const keepSum = base.reduce((a, b, i) => (i === DROP + 1 ? a : a + b), 0);
  const cw = base.map((b, i) => (i === DROP + 1 ? b * (1 - ck) : b + share * b / keepSum) * tw);
  const cx = [tx]; for (let i = 1; i < 4; i++) cx[i] = cx[i - 1] + cw[i - 1];
  const rH = ROWS.map((_, i) => (i === KEEP ? rh : rh * (1 - rk)));
  const tH = hh + rH.reduce((a, b) => a + b, 0);

  ctx.save(); ctx.beginPath(); ctx.rect(tx, ty, tw, tH); ctx.clip();
  ctx.fillStyle = '#f3f5f7'; ctx.fillRect(tx, ty, tw, hh);
  const keepY = ty + hh + rH.slice(0, KEEP).reduce((a, b) => a + b, 0);
  const kk = ph(T, [TS['n:rows'][1] - 200, TS['n:rows'][1] + 100]);
  if (kk > 0) { ga(kk); ctx.fillStyle = 'rgba(193,39,45,.06)'; ctx.fillRect(tx, keepY, tw, rh); ctx.fillStyle = C.red; ctx.fillRect(tx, keepY, 2, rh); ga(1); }
  const sr = ph(T, [TS['n:rows'][0], TS['n:rows'][0] + 380]);
  if (sr > 0 && sr < 1) { ctx.fillStyle = 'rgba(193,39,45,.09)'; ctx.fillRect(tx, ty + hh + sr * (ROWS.length - 1) * rh, tw, rh); }
  const sc = ph(T, [TS['n:cols'][0], TS['n:cols'][0] + 330]);
  if (sc > 0 && sc < 1) { ctx.fillStyle = 'rgba(193,39,45,.08)'; ctx.fillRect(tx + cw[0] + sc * (tw - cw[0] - tw * .19), ty, tw * .19, tH); }

  for (let c = 0; c < 4; c++) {
    if (cw[c] < 2) continue;
    const drop = c === DROP + 1;
    const fade = drop ? 1 - .6 * ph(T, [TS['n:cols'][0] + 100, TS['n:cols'][0] + 330]) : 1;
    ctx.save(); ctx.beginPath(); ctx.rect(cx[c], ty, cw[c], tH); ctx.clip();
    ga(fade); ctx.font = mono(9); ctx.fillStyle = C.ink2;
    if (HEAD[c]) { ctx.textAlign = 'right'; ctx.fillText(HEAD[c], cx[c] + cw[c] - 6, ty + hh / 2); ctx.textAlign = 'left'; }
    let ry = ty + hh;
    ROWS.forEach((row, r) => {
      const hR = rH[r];
      if (hR > .5) {
        ctx.save(); ctx.beginPath(); ctx.rect(cx[c], ry, cw[c], hR); ctx.clip();
        const strike = r !== KEEP ? easeOut(ph(T, [TS['n:rows'][0] + 40 + r * 50, TS['n:rows'][0] + 300 + r * 50])) : 0;
        ga(fade * (1 - .55 * strike) * Math.min(1, hR / rh * 1.4));
        const mid = ry + hR / 2;
        if (row.g) { if (c === 0) { ctx.font = sans(10, 600); ctx.fillStyle = C.ink2; ctx.fillText(row.g, cx[c] + 4, mid); } }
        else if (c === 0) { ctx.font = sans(10.5); ctx.fillStyle = C.ink; ctx.fillText(row.l, cx[c] + 12, mid); }
        else {
          const hit = r === KEEP && T >= TS['n:cols'][1];
          ctx.font = mono(9.5, hit ? 500 : 400); ctx.fillStyle = hit ? C.red : C.ink; ctx.textAlign = 'right';
          ctx.fillText(row.v[c - 1], cx[c] + cw[c] - 6, mid); ctx.textAlign = 'left';
        }
        if (strike > 0) { ga(.7); ctx.fillStyle = C.red; ctx.fillRect(cx[c], mid, cw[c] * clamp(strike * 4 - c, 0, 1), 1); }
        ga(1); ctx.restore();
      }
      ry += hR;
    });
    ctx.restore();
  }
  ctx.fillStyle = C.line; let ry = ty + hh; ctx.fillRect(tx, ry, tw, 1);
  rH.forEach((hR) => { ry += hR; if (hR > .5) ctx.fillRect(tx, ry - 1, tw, 1); });
  ctx.restore();
  ctx.strokeStyle = '#e1e5e9'; ctx.strokeRect(tx + .5, ty + .5, tw - 1, tH - 1);

  // reasoning, typed
  const lk = ph(T, TS['n:llm']);
  if (lk > 0) {
    let yy = ty + tH + 12;
    const total = CALC.reduce((a, [s]) => a + s.length, 0) + ANSWER.length;
    let chars = Math.floor(total * lk);
    ctx.font = mono(10);
    CALC.forEach(([s, red]) => {
      if (chars <= 0 || yy > B.y + B.h - 6) return;
      const shown = s.slice(0, chars); chars -= s.length;
      ctx.fillStyle = red > 0 ? C.red : C.ink2; ctx.fillText(shown, tx, yy); yy += 13;
    });
    if (chars > 0 && yy <= B.y + B.h - 6) { ctx.font = sans(11.5, 500); ctx.fillStyle = C.ink; ctx.fillText(ANSWER.slice(0, chars), tx, yy + 2); }
    if (lk < 1 && Math.floor(T / 240) % 2 === 0) { ctx.fillStyle = C.red; ctx.fillRect(B.x + B.w - 14, B.y + 5, 6, 8); }
  }
}

/* ── the judge's verdict on this answer (no study scores: those stay internal) ── */
function drawResults(ctx, B, T, ga) {
  const vis = ph(T, [TS['n:judge'][0] - 200, TS['n:judge'][0] + 100]);
  ga(.35 + .65 * vis);
  ctx.font = mono(9.5); ctx.fillStyle = C.ink2;
  ctx.fillText('judge · LLM-as-a-Judge', B.x, B.y + 5);
  const vk = ph(T, [T_META[0], T_META[1]]);
  if (vk > 0) {
    ga(easeOut(vk));
    ctx.font = mono(9, 500); const label = 'correct'; const pw = ctx.measureText(label).width + 14;
    ctx.fillStyle = C.green; roundRect(ctx, B.x + B.w - pw, B.y - 3, pw, 16, 8); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'right'; ctx.fillText(label, B.x + B.w - 7, B.y + 5.5); ctx.textAlign = 'left';
  }
  ga(1);
  const top = B.y + 20, step = Math.min(18, (B.h - 20) / CHECKS.length);
  CHECKS.forEach((txt, i) => {
    const yy = top + i * step + step / 2;
    const kk = easeOut(ph(T, [TS['n:judge'][0] + i * 300, TS['n:judge'][0] + i * 300 + 350]));
    ctx.strokeStyle = kk > 0 ? C.green : '#d6dbe0'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(B.x + 5, yy, 5, 0, Math.PI * 2); ctx.stroke();
    if (kk > 0) {
      ga(kk); ctx.strokeStyle = C.green; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(B.x + 2.6, yy + .2); ctx.lineTo(B.x + 4.4, yy + 2); ctx.lineTo(B.x + 7.6, yy - 2.2); ctx.stroke(); ga(1);
    }
    ctx.font = sans(10.5); ctx.fillStyle = kk > 0 ? C.ink : C.ink3; ctx.fillText(txt, B.x + 16, yy);
  });
}
