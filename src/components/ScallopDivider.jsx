import { motion } from 'framer-motion';

// Animated scallop arch — sits at top of each colored section,
// overlaps the section above to create the Johnny's-style bump transition.
export default function ScallopDivider({ color }) {
  const d =
    'M0,80 Q90,8 180,80 Q270,8 360,80 Q450,8 540,80 Q630,8 720,80 Q810,8 900,80 Q990,8 1080,80 Q1170,8 1260,80 Q1350,8 1440,80 Z';

  return (
    <motion.div
      initial={{ y: 80 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        lineHeight: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        style={{ display: 'block', width: '100%', height: 80 }}
        preserveAspectRatio="none"
      >
        <path d={d} fill={color} />
      </svg>
    </motion.div>
  );
}
