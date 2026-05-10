import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const [hover, setHover] = useState(false);

  const sp = { damping: 24, stiffness: 360, mass: 0.4 };
  const sx = useSpring(mx, sp);
  const sy = useSpring(my, sp);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const onOver = (e) => setHover(!!e.target.closest('a,button,.magnetic,[data-cursor]'));
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mx, my]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const ring = hover ? 48 : 28;

  return (
    <>
      <motion.div style={{
        translateX: mx, translateY: my,
        position: 'fixed', top: 0, left: 0,
        width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
        borderRadius: '50%',
        background: hover ? '#6D28D9' : '#0A0A0A',
        pointerEvents: 'none', zIndex: 100000,
        boxShadow: hover ? '0 0 12px rgba(109,40,217,0.5)' : 'none',
        transition: 'background 0.2s, box-shadow 0.2s',
      }} />
      <motion.div style={{
        translateX: sx, translateY: sy,
        position: 'fixed', top: 0, left: 0,
        width: ring, height: ring,
        marginLeft: -(ring / 2), marginTop: -(ring / 2),
        borderRadius: '50%',
        border: hover ? '2px solid #6D28D9' : '1.5px solid rgba(10,10,10,0.4)',
        background: hover ? 'rgba(109,40,217,0.06)' : 'transparent',
        pointerEvents: 'none', zIndex: 99999,
        transition: 'width 0.28s ease, height 0.28s ease, margin 0.28s ease, border-color 0.2s, background 0.2s',
      }} />
    </>
  );
}
