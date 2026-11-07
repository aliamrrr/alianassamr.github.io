import { useEffect, useState } from 'react';
import { reduce } from '../motion/engine';
import { socials } from '../data/content';

/*
 * Journal: the blog and things worth sharing, not written yet.
 * The headline is decoded live, token by token: for each step you see the model's
 * next-token distribution, the sampler spinning through the candidates, and the pick.
 */

const STEPS = [
  [['Coming', .58], ['Brewing', .19], ['Loading', .11], ['Drafting', .08], ['Soon', .04]],
  [[' soon', .71], [' later', .12], [' eventually', .08], [' tomorrow', .05], [' never', .04]],
  [['…', .81], ['.', .1], ['!', .06], [' :)', .03]],
];
const EOS = [['<eos>', .93], [' Stay', .04], [' tuned', .03]];


// jitter the distribution a little per run, keep the order (and the pick) stable
function jitter(cands, seed) {
  const r = (i) => { const x = Math.sin((seed + 1) * 91.7 + i * 12.9) * 4375.5; return x - Math.floor(x); };
  const raw = cands.map(([t, p], i) => [t, Math.max(.01, p * (0.85 + r(i) * 0.3))]);
  raw.sort((a, b) => b[1] - a[1]);
  const top = cands[0][0]; const ti = raw.findIndex(([t]) => t === top); if (ti > 0) [raw[0], raw[ti]] = [raw[ti], raw[0]];
  const s = raw.reduce((a, [, p]) => a + p, 0);
  return raw.map(([t, p]) => [t, p / s]);
}

function useDecoder() {
  const [st, setSt] = useState(() => (reduce
    ? { out: STEPS.map((c) => c[0][0]), step: STEPS.length, phase: 'done', hl: 0, seed: 42, dist: EOS }
    : { out: [], step: 0, phase: 'dist', hl: -1, seed: 42, dist: jitter(STEPS[0], 42) }));

  useEffect(() => {
    if (reduce) return undefined;
    let t;
    const { phase, step, seed } = st;
    if (phase === 'dist') t = setTimeout(() => setSt((s) => ({ ...s, phase: 'sample', hl: 0, spin: 0 })), 650);
    else if (phase === 'sample') {
      const n = st.dist.length; const spins = n + 3 + (seed % 3);
      if (st.spin >= spins) t = setTimeout(() => setSt((s) => ({ ...s, phase: 'commit', hl: 0 })), 140);
      else t = setTimeout(() => setSt((s) => ({ ...s, spin: s.spin + 1, hl: (spins - s.spin - 1) % n })), 55 + st.spin * 18);
    } else if (phase === 'commit') {
      t = setTimeout(() => setSt((s) => {
        if (s.step >= STEPS.length) return { ...s, phase: 'done' };
        const out = [...s.out, STEPS[s.step][0][0]]; const next = s.step + 1;
        return { ...s, out, step: next, phase: 'dist', hl: -1, dist: next < STEPS.length ? jitter(STEPS[next], s.seed) : jitter(EOS, s.seed) };
      }), 260);
    } else if (phase === 'done') {
      t = setTimeout(() => setSt((s) => ({ out: [], step: 0, phase: 'dist', hl: -1, seed: s.seed + 1, dist: jitter(STEPS[0], s.seed + 1) })), 5200);
    }
    return () => clearTimeout(t);
  }, [st]);

  return st;
}

export default function Journal() {
  const st = useDecoder();
  const sampling = st.phase === 'sample' || st.phase === 'commit';
  const finished = st.step >= STEPS.length;
  const stepLabel = finished ? 'end of sequence' : `token ${st.step + 1}/${STEPS.length}`;
  const ext = { target: '_blank', rel: 'noopener noreferrer' };
  const follow = socials.filter((s) => s.label === 'Ali Decodes' || s.label === 'LinkedIn');

  return (
    <div className="notes">
      <p className="label notes-kicker">Journal · blog &amp; sharing</p>

      <h1 className="hero-headline notes-head" aria-label="Coming soon…">
        <span aria-hidden>
          {st.out.map((tok, i) => <span key={`${st.seed}-${i}`} className={`tok${i === st.out.length - 1 ? ' new' : ''}`}>{tok}</span>)}
          <span className={`decode-caret ${finished && st.phase === 'done' ? 'blink' : ''}`} />
        </span>
      </h1>

      <div className="sampler" aria-hidden>
        <div className="sampler-head">
          <span>next-token distribution</span>
          <span>{stepLabel} · T=0.7 · top-k={st.dist.length} · seed {st.seed}</span>
        </div>
        <ul>
          {st.dist.map(([tok, p], i) => {
            const picked = (st.phase === 'commit' || st.phase === 'done') && i === 0;
            const lit = sampling && st.hl === i;
            return (
              <li key={`${st.seed}-${st.step}-${tok}`} className={`${lit ? 'lit' : ''} ${picked ? 'picked' : ''}`} style={{ '--i': i }}>
                <code>{JSON.stringify(tok).slice(1, -1).replace(/ /g, '·')}</code>
                <span className="bar"><span style={{ width: `${(p * 100).toFixed(1)}%` }} /></span>
                <span className="p">{p.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="notes-body">
        <div className="notes-follow">
          <p className="label">Meanwhile</p>
          <p className="value">
            {follow.map((s, i) => (
              <span key={s.label}>{i ? ' · ' : ''}<a href={s.href} data-cursor={s.cursor} {...ext}>{s.label} ↗</a></span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
