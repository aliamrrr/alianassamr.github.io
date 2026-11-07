import { useEffect, useRef } from 'react';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { reduce, easeOut } from '../motion/engine';
import { drawTableQA, TQ_REST, TQ_LOOP } from '../motion/tableqa';

/**
 * ALTEN table tool, live.
 *  - variant="card": the cover of the ALTEN card. At rest it shows the finished pipeline;
 *    on hover it crossfades to the start and runs once (question → rows → columns → answer → judge).
 *  - variant="case": loops in the case study, restarting each time it scrolls into view.
 */
export default function TableQA({ variant = 'case', active = true }) {
  const ref = useRef(null);
  const st = useRef({ t0: null, was: false, fadeAt: -1e9, fromT: TQ_REST, fromRun: false, curT: TQ_REST, lastStatic: -1e9 });

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
      const T = reduce ? TQ_REST : (now - s.t0) % TQ_LOOP;
      drawTableQA(ctx, w, h, T, { running: !reduce && T < TQ_REST });
      return;
    }

    const on = active && !reduce;
    if (on !== s.was) {
      s.fromT = s.curT; s.fromRun = s.was; s.fadeAt = now; s.was = on;
      if (on) s.t0 = now;
    }
    const fade = (now - s.fadeAt) / 300;
    // at rest the frame is static: repaint a couple of times a second only
    // (a resize clears the canvas, and web fonts may land late)
    if (!on && fade >= 1 && now - s.lastStatic < 450) return;
    s.lastStatic = now;
    const T = on ? Math.min(now - s.t0, TQ_REST) : TQ_REST;
    s.curT = T;
    drawTableQA(ctx, w, h, T, { running: on && T < TQ_REST, compact: true });
    if (fade < 1) drawTableQA(ctx, w, h, s.fromT, { A: 1 - easeOut(fade), running: s.fromRun, compact: true });
  }, { smooth: true });

  return (
    <canvas
      ref={ref}
      className={`tableqa ${variant}`}
      role="img"
      aria-label="Chain-of-Tables on a table from ALTEN's public 2023 CSR report: a question about Scope 1 emissions is routed to the numerical-reasoning expert, the table is narrowed to one row and two columns, the LLM computes the answer, and an LLM judge checks it."
    />
  );
}
