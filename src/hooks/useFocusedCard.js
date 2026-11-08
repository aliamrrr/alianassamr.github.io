import { useEffect, useRef, useState } from 'react';
import { reduce } from '../motion/engine';

/**
 * Which Work cards are on screen, so they play by themselves without the mouse.
 * A card counts once at least `minVisible` of it (or of the viewport, for cards taller
 * than the screen) is visible, and the set only updates after it has been stable for
 * `dwell` ms (so fast scrolling doesn't flicker).
 * Cards are found by [data-card="<slug>"] inside `containerRef`.
 * Works with the site's own scroll container (.site-scroll) and with window scroll.
 */
export function useVisibleCards(containerRef, { dwell = 150, minVisible = 0.5 } = {}) {
  const [visible, setVisible] = useState(() => new Set());
  const committed = useRef('');

  useEffect(() => {
    if (reduce) return undefined;
    const host = containerRef.current;
    if (!host) return undefined;
    const scroller = host.closest('.site-scroll') || window;
    let raf = 0, timer = 0, candidate = '';

    const viewport = () => {
      if (scroller === window) return { top: 0, bottom: window.innerHeight };
      const r = scroller.getBoundingClientRect();
      return { top: Math.max(0, r.top), bottom: Math.min(window.innerHeight, r.bottom) };
    };

    const pick = () => {
      raf = 0;
      const { top, bottom } = viewport();
      const on = [];
      host.querySelectorAll('[data-card]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height <= 0) return;
        const vis = Math.max(0, Math.min(r.bottom, bottom) - Math.max(r.top, top));
        if (vis / Math.min(r.height, bottom - top) >= minVisible) on.push(el.getAttribute('data-card'));
      });
      const key = on.join('|');
      if (key === candidate) return;
      candidate = key;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (committed.current !== candidate) { committed.current = candidate; setVisible(new Set(on)); }
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

  return visible;
}
