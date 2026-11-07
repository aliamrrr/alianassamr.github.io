import { useEffect, useRef } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { drawCodmai, reduce } from '../motion/engine';

/**
 * CodmAI answering "Pedri's first-half heatmap + key passes vs PSG" (illustrative data).
 *  - variant="case": in the case study; restarts from the question each time it scrolls into view
 *  - variant="card": over the CodmAI card on Work; plays from the start on hover
 */
export default function CodmaiDemo({ variant = 'case', active = true }) {
  const ref = useRef(null);
  const st = useRef({ cache: {}, t0: null, k: 0, wasActive: false });

  // case study: restart the story whenever it comes into view
  useEffect(() => {
    if (variant !== 'case' || !ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) st.current.t0 = null; }, { threshold: .35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [variant]);

  useCanvasLoop(ref, (ctx, w, h, now, dt) => {
    const s = st.current;
    if (variant === 'card') {
      if (active && !s.wasActive) s.t0 = null;
      s.wasActive = active;
      s.k += ((active ? 1 : 0) - s.k) * Math.min(1, dt / 140);
      if (s.k < .01) { if (!s.cleared) { ctx.clearRect(0, 0, w, h); s.cleared = true; } return; }
      s.cleared = false;
    }
    if (s.t0 === null) s.t0 = now;
    ctx.clearRect(0, 0, w, h);
    if (variant === 'card') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
    drawCodmai(ctx, w, h, reduce ? 9800 : now - s.t0, s.cache);
  }, { smooth: true });

  return (
    <canvas
      ref={ref}
      className={`codmai-demo ${variant}${variant === 'card' && active ? ' on' : ''}`}
      role={variant === 'case' ? 'img' : undefined}
      aria-hidden={variant === 'card' ? true : undefined}
      aria-label={variant === 'case' ? 'CodmAI demo: a question about Pedri is answered by planner, data, viz and clips agents with a heatmap, four key passes and stats (illustrative data)' : undefined}
    />
  );
}
