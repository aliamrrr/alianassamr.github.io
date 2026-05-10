/* Adapted from 21st.dev/community/components/kokonutd/hand-writing-text */
import { motion } from 'framer-motion';

const drawVariants = (duration = 1.8, delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: [0.43, 0.13, 0.23, 0.96], delay },
      opacity:    { duration: 0.3, delay },
    },
  },
});

/* Wavy underline drawn under a word */
export function HandWritingUnderline({ color = '#FDE047', delay = 1.2, style }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 440 38"
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute', bottom: -6, left: '50%',
        transform: 'translateX(-50%)',
        width: '115%', height: 38, overflow: 'visible',
        pointerEvents: 'none', ...style,
      }}
    >
      <motion.path
        d="M 8 24 C 70 6, 160 34, 260 18 C 330 8, 390 28, 435 16"
        fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round" strokeLinejoin="round"
        variants={drawVariants(1.6, delay)}
      />
    </motion.svg>
  );
}

/* Handwritten oval/circle drawn around a word */
export function HandWritingCircle({ color = '#6D28D9', delay = 0.6, style }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 560 160"
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute', inset: '-12px -20px',
        width: 'calc(100% + 40px)', height: 'calc(100% + 24px)',
        overflow: 'visible', pointerEvents: 'none', ...style,
      }}
    >
      <motion.path
        d="M 520 82 C 560 25, 440 4, 280 8 C 120 12, 8 38, 8 80 C 8 122, 120 150, 280 152 C 440 152, 552 128, 520 82"
        fill="none" stroke={color} strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round"
        variants={drawVariants(2.2, delay)}
      />
    </motion.svg>
  );
}

/* Arrow pointing right (decorative) */
export function HandWritingArrow({ color = '#FDE047', delay = 2, style }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 80 40"
      initial="hidden"
      animate="visible"
      style={{
        width: 60, height: 32, overflow: 'visible',
        pointerEvents: 'none', ...style,
      }}
    >
      <motion.path
        d="M 4 20 C 20 20, 40 20, 62 20 M 48 8, 64 20, 48 32"
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
        variants={drawVariants(0.8, delay)}
      />
    </motion.svg>
  );
}
