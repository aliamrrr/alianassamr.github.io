import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MiniLantern } from './Pixel';

/* Select any text in the page → a small "Ask AliLLM" button appears next to it. */
export default function SelectionAsk({ onAsk }) {
  const [sel, setSel] = useState(null);

  useEffect(() => {
    const onUp = (e) => {
      if (e.target instanceof Element && e.target.closest('.ask-selection, .chat-dock')) return;
      requestAnimationFrame(() => {
        const s = window.getSelection();
        const text = s?.toString().trim() ?? '';
        if (!s || s.rangeCount === 0 || text.length < 3 || text.length > 400) { setSel(null); return; }
        const node = s.anchorNode?.parentElement;
        if (!node?.closest('[data-askable]')) { setSel(null); return; }
        const rects = s.getRangeAt(0).getClientRects();
        const r = rects[rects.length - 1];
        if (!r) return;
        setSel({
          text,
          x: Math.min(r.right + 6, window.innerWidth - 140),
          y: Math.min(r.bottom + 6, window.innerHeight - 40),
        });
      });
    };
    const clear = () => setSel(null);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('keyup', onUp);
    window.addEventListener('hashchange', clear);
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('keyup', onUp);
      window.removeEventListener('hashchange', clear);
    };
  }, []);

  return (
    <AnimatePresence>
      {sel && (
        <motion.button
          key="ask"
          className="ask-selection"
          style={{ left: sel.x, top: sel.y }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            window.getSelection()?.removeAllRanges();
            onAsk(sel.text);
            setSel(null);
          }}
        >
          <MiniLantern />
          Ask AliLLM
        </motion.button>
      )}
    </AnimatePresence>
  );
}
