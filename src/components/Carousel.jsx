import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Carousel({ children, gap = 20, paddingX = 48 }) {
  const constraintsRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      ref={constraintsRef}
      style={{ overflow: 'hidden', cursor: dragging ? 'grabbing' : 'grab' }}
      className="carousel-wrap"
    >
      <motion.div
        className="carousel-track"
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 28 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{
          display: 'flex',
          gap,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          width: 'max-content',
          paddingTop: 8,
          paddingBottom: 24,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Dot indicator for carousels */
export function CarouselDots({ count, active, onSelect, activeColor = '#6D28D9' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width: i === active ? 28 : 8,
            height: 8,
            borderRadius: 4,
            background: i === active ? activeColor : 'rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'none',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

/* Auto-playing testimonial slider */
export function TestimonialSlider({ items, renderItem, interval = 5000 }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const goTo = useCallback((i) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  const next = useCallback(() => {
    const n = (active + 1) % items.length;
    setDir(1);
    setActive(n);
  }, [active, items.length]);

  const prev = useCallback(() => {
    const n = (active - 1 + items.length) % items.length;
    setDir(-1);
    setActive(n);
  }, [active, items.length]);

  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderItem(items[active], active)}
        </motion.div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
        <button onClick={prev}
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background='rgba(0,0,0,0.15)'}
          onMouseLeave={e => e.target.style.background='rgba(0,0,0,0.08)'}
        >←</button>

        <div style={{ display: 'flex', gap: 8 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? '#6D28D9' : 'rgba(0,0,0,0.18)', border: 'none', cursor: 'none', padding: 0, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}
            />
          ))}
        </div>

        <button onClick={next}
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background='rgba(0,0,0,0.15)'}
          onMouseLeave={e => e.target.style.background='rgba(0,0,0,0.08)'}
        >→</button>
      </div>
    </div>
  );
}
