import { useEffect, useRef } from 'react';

/**
 * Runs `draw(ctx, w, h, now, dt)` every frame on a DPR-aware canvas,
 * only while the canvas is on screen. `draw` can change between renders.
 */
export function useCanvasLoop(canvasRef, draw, { smooth = false } = {}) {
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return undefined;
    let ctx = null, w = 0, h = 0, raf = 0, last = performance.now(), visible = true;

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = smooth;
      w = r.width; h = r.height;
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(c);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '120px' });
    io.observe(c);

    const loop = (now) => {
      const dt = Math.min(48, now - last); last = now;
      if (visible && ctx && w > 0) drawRef.current(ctx, w, h, now, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [canvasRef, smooth]);
}
