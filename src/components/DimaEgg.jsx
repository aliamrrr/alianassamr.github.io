import { useEffect, useRef, useState } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { TILE, LANT, sprM, R, C } from '../motion/engine';

/* Easter egg: type d-i-m-a anywhere → red & green pixel confetti and zellige tiles, "Dima Maghrib!" */
function Confetti({ onEnd }) {
  const ref = useRef(null);
  const st = useRef({ parts: null, t0: null });
  useCanvasLoop(ref, (ctx, w, h, now, dt) => {
    const s = st.current;
    if (!s.parts) {
      s.t0 = now;
      s.parts = Array.from({ length: 140 }, (_, i) => ({
        x: w * (.1 + Math.random() * .8), y: -10 - Math.random() * h * .3, vx: (Math.random() - .5) * .3, vy: Math.random() * .12,
        c: i % 2 ? C.red : C.green, tile: i % 13 === 0, sz: 3 + (i % 3), ph: Math.random() * 6,
      }));
    }
    ctx.clearRect(0, 0, w, h);
    for (const p of s.parts) {
      p.vy += .0006 * dt; p.vx *= .995; p.x += (p.vx + Math.sin(now / 200 + p.ph) * .04) * dt; p.y += p.vy * dt;
      if (p.tile) sprM(ctx, TILE, R(p.x), R(p.y), 2, LANT.pal);
      else { ctx.fillStyle = p.c; ctx.fillRect(R(p.x), R(p.y), p.sz, Math.floor(now / 120 + p.ph) % 2 ? p.sz : 1); }
    }
    if (now - s.t0 > 4200) onEnd();
  });
  return <canvas ref={ref} className="confetti" aria-hidden />;
}

export default function DimaEgg() {
  const [on, setOn] = useState(false);
  const [toast, setToast] = useState(false);
  const buf = useRef('');

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('input, textarea, [contenteditable="true"]')) return;
      if (!e.key || e.key.length !== 1) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-4);
      if (buf.current === 'dima') {
        buf.current = '';
        setOn(false); requestAnimationFrame(() => setOn(true));
        setToast(true); setTimeout(() => setToast(false), 1600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {on && <Confetti onEnd={() => setOn(false)} />}
      <div className={`dima-toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast ? 'Dima Maghrib!' : ''}</div>
    </>
  );
}
