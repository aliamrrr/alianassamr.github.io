import { useEffect, useRef, useState } from 'react';
import { reduce } from '../motion/engine';

/**
 * Which Work card the visitor is "on", without needing the mouse.
 * The card that is mostly visible and closest to the middle of the scroll area wins,
 * once it has stayed the winner for `dwell` ms (so fast scrolling doesn't flicker).
 * Cards are found by [data-card="<slug>"] inside `containerRef`.
 * Works with the site's own scroll container (.site-scroll) and with window scroll.
 */
export function useFocusedCard(containerRef, { dwell = 200, minVisible = 0.5 } = {}) {
  const [focused, setFocused] = useState(null);
  const committed = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const host = containerRef.current;
    if (!host) return undefined;
    const scroller = host.closest('.site-scroll') || window;
    let raf = 0, timer = 0, candidate = null;

    const viewport = () => {
      if (scroller === window) return { top: 0, bottom: window.innerHeight };
      const r = scroller.getBoundingClientRect();
      return { top: Math.max(0, r.top), bottom: Math.min(window.innerHeight, r.bottom) };
    };

    const pick = () => {
      raf = 0;
      const { top, bottom } = viewport();
      const mid = (top + bottom) / 2;
      let best = null, bestScore = Infinity;
      host.querySelectorAll('[data-card]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height <= 0) return;
        const vis = Math.max(0, Math.min(r.bottom, bottom) - Math.max(r.top, top));
        const ratio = vis / Math.min(r.height, bottom - top);
        if (ratio < minVisible) return;
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestScore) { bestScore = d; best = el.getAttribute('data-card'); }
      });
      if (best === candidate) return;
      candidate = best;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (committed.current !== candidate) { committed.current = candidate; setFocused(candidate); }
      }, dwell);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(pick); };

    schedule();
    scroller.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule); ro.observe(host);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(timer);
      scroller.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
    };
  }, [containerRef, dwell, minVisible]);

  return focused;
}
