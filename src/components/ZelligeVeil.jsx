import { useRef } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { LANT, TILE, TILE_MASK, spr, sprM, clamp, easeInOut, R } from '../motion/engine';

const BG = '#eef0f2';
const STEP = 26;

/**
 * Covers a photo while it loads: faint zellige tiles shimmer on the placeholder,
 * then the photo appears through tile-shaped windows that grow until they meet.
 */
export default function ZelligeVeil({ loaded, onDone }) {
  const ref = useRef(null);
  const st = useRef({ t0: null, done: false });

  useCanvasLoop(ref, (ctx, w, h, now) => {
    const s = st.current;
    if (s.done) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, w, h);
    if (!loaded) {
      for (let y = STEP / 2, j = 0; y < h + STEP; y += STEP, j++) {
        for (let x = STEP / 2, i = 0; x < w + STEP; x += STEP, i++) {
          ctx.globalAlpha = .12 + .12 * Math.sin(now / 300 - (i + j) * .6);
          sprM(ctx, TILE, R(x - 6.5), R(y - 6.5), 1, LANT.pal);
        }
      }
      ctx.globalAlpha = 1;
      return;
    }
    if (s.t0 === null) s.t0 = now;
    const k = clamp((now - s.t0) / 700, 0, 1);
    const sc = Math.max(1, R(easeInOut(k) * 4));
    ctx.globalCompositeOperation = 'destination-out';
    for (let y = STEP / 2; y < h + STEP; y += STEP) {
      for (let x = STEP / 2; x < w + STEP; x += STEP) spr(ctx, TILE_MASK, R(x - 6.5 * sc), R(y - 6.5 * sc), sc, '#000');
    }
    ctx.globalCompositeOperation = 'source-over';
    if (k >= 1) { s.done = true; ctx.clearRect(0, 0, w, h); onDone && onDone(); }
  });

  return <canvas ref={ref} className="zellige-veil" aria-hidden />;
}
