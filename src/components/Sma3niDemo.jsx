import { useEffect, useRef } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { reduce, easeOut } from '../motion/engine';
import { drawSma3ni, SM_REST, SM_LOOP } from '../motion/sma3ni';

/**
 * Sma3ni demo, live.
 *  - variant="card": at rest shows a routed request; on hover it crossfades to the start and
 *    replays a voice note going through the pipeline once.
 *  - variant="case": loops in the case study, restarting each time it scrolls into view.
 */
export default function Sma3niDemo({ variant = 'case', active = true }) {
  const ref = useRef(null);
  const st = useRef({ t0: null, was: false, fadeAt: -1e9, fromT: SM_REST, curT: SM_REST, lastStatic: -1e9 });

  useEffect(() => {
    if (variant !== 'case' || !ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) st.current.t0 = null; }, { threshold: .3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [variant]);

  useCanvasLoop(ref, (ctx, w, h, now) => {
    const s = st.current;
    if (variant === 'case') {
      if (s.t0 === null) s.t0 = now;
      drawSma3ni(ctx, w, h, reduce ? SM_REST : (now - s.t0) % SM_LOOP);
      return;
    }
    const on = active && !reduce;
    if (on !== s.was) {
      s.fromT = s.curT; s.fadeAt = now; s.was = on;
      if (on) s.t0 = now;
    }
    const fade = (now - s.fadeAt) / 300;
    // at rest the frame is static: repaint a couple of times a second only (resize clears the canvas)
    if (!on && fade >= 1 && now - s.lastStatic < 450) return;
    s.lastStatic = now;
    const T = on ? Math.min(now - s.t0, SM_REST) : SM_REST;
    s.curT = T;
    drawSma3ni(ctx, w, h, T);
    if (fade < 1) drawSma3ni(ctx, w, h, s.fromT, { A: 1 - easeOut(fade) });
  }, { smooth: true });

  return (
    <canvas
      ref={ref}
      className={`tableqa sma3ni ${variant}`}
      role="img"
      aria-label="Sma3ni demo: a citizen records a 7-second voice note in Darija about a power cut, gets a tracking code right away, and the note goes through the api, the PostgreSQL outbox, the relay and NATS JetStream to the Voxtral transcription worker and the LIDstral dialect worker, which tags it as Darija and routes it to the water and electricity service."
    />
  );
}
