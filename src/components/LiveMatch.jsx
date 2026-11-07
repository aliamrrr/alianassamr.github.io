import { useRef } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { broadcast, cvOverlay, clamp, easeInOut } from '../motion/engine';

/**
 * A simulated match seen through a broadcast camera, with the detection / tracking
 * overlay and a top-down tracking panel on the right.
 *  - variant="card": sits over the RBFA card image and only plays while `active` (hover)
 *  - variant="case": always on, in the RBFA case study
 */
export default function LiveMatch({ variant = 'case', active = true }) {
  const ref = useRef(null);
  const st = useRef({ cache: {}, k: variant === 'case' ? 1 : 0 });

  useCanvasLoop(ref, (ctx, w, h, now, dt) => {
    const s = st.current;
    const target = variant === 'case' ? 1 : active ? 1 : 0;
    s.k += (target - s.k) * Math.min(1, dt / 160);
    if (variant === 'card' && s.k < .01) { if (!s.cleared) { ctx.clearRect(0, 0, w, h); s.cleared = true; } return; }
    s.cleared = false;
    ctx.clearRect(0, 0, w, h);
    const k = easeInOut(clamp(s.k, 0, 1));
    const scene = broadcast(ctx, w, h, now, s.cache, k);
    cvOverlay(ctx, scene, k, now);
  }, { smooth: true });

  return (
    <canvas
      ref={ref}
      className={`live-match ${variant}${variant === 'card' && active ? ' on' : ''}`}
      aria-label={variant === 'case' ? 'Simulated match with live player detection, tracking and a top-down tracking map' : undefined}
      role={variant === 'case' ? 'img' : undefined}
      aria-hidden={variant === 'card' ? true : undefined}
    />
  );
}
