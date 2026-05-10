import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';

function useTilt(intensity = 12) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.015,1.015,1.015)`;
    el.style.transition = 'transform 0.08s ease';
  }, [intensity]);
  const onLeave = useCallback(() => {
    ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
  }, []);
  return { ref, onMove, onLeave };
}

const highlights = [
  { label: 'Production AI Apps', value: '3+', color: '#6D28D9' },
  { label: 'Hackathon Podiums', value: '3×', color: '#0A0A0A' },
  { label: 'Languages Spoken', value: '4',   color: '#6D28D9' },
  { label: 'GPA at IMT Atlantique', value: '3.92', color: '#0A0A0A' },
];

export default function About() {
  const tilt = useTilt(10);

  return (
    <section id="about" className="section section--yellow" style={{ paddingBottom: '5rem' }}>

      {/* Decorative stripe top */}
      <div className="stripe-pattern" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh', maxWidth: 1200, margin: '0 auto', gap: '4rem', padding: '5rem 3rem', alignItems: 'center' }} className="about-split">

        {/* LEFT — Photo with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          style={{ position: 'relative' }}
        >
          {/* Purple shadow frame */}
          <div style={{
            position: 'absolute', inset: 0,
            transform: 'translate(12px, 12px)',
            background: '#6D28D9', borderRadius: 24, zIndex: 0,
          }} />
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
            style={{ position: 'relative', zIndex: 1, transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <img
              src="/ali anass.png" alt="Ali Anass"
              style={{
                width: '100%', borderRadius: 22,
                aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'top center',
                border: '3px solid #0A0A0A', display: 'block',
              }}
            />
          </div>

          {/* Role badge — only shows role */}
          <motion.div
            initial={{ scale: 0, rotate: -6 }} whileInView={{ scale: 1, rotate: -6 }}
            viewport={{ once: true }} transition={{ delay: 0.6, type: 'spring', damping: 12 }}
            style={{
              position: 'absolute', bottom: -18, right: -18, zIndex: 10,
              background: '#6D28D9', border: '3px solid #0A0A0A',
              padding: '0.65rem 1rem', borderRadius: 14,
              fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700,
              boxShadow: '3px 3px 0px #0A0A0A', letterSpacing: '0.04em',
              color: '#fff',
            }}
          >
            🤖 AI Solutions Engineer
          </motion.div>
        </motion.div>

        {/* RIGHT — Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22,1,0.36,1] }}
        >
          <p className="sec-eyebrow sec-eyebrow--dark">About Me</p>
          <h2 style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(44px, 6vw, 76px)', lineHeight: 0.9, color: '#0A0A0A',
            marginBottom: '1.5rem',
          }}>
            Building<br/>Intelligent<br/>Systems.
          </h2>

          <div style={{ width: 52, height: 4, background: '#6D28D9', borderRadius: 2, marginBottom: '1.5rem' }} />

          <p style={{ fontFamily: 'var(--body)', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', marginBottom: '1rem' }}>
            I'm an AI Solutions Engineer and Data Scientist based in Nantes, France — architecting and shipping production-grade AI from RAG pipelines and semantic search to computer vision and LLM fine-tuning.
          </p>
          <p style={{ fontFamily: 'var(--body)', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', marginBottom: '2rem' }}>
            Engineering degree from <strong>IMT Atlantique</strong> (GPA 3.92/4) with an Erasmus+ at <strong>Universidad Carlos III Madrid</strong>. Research presented at the Palais des Congrès de Paris.
          </p>

          {/* Highlights grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '2rem' }}>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
                style={{
                  background: '#fff',
                  border: '2px solid #0A0A0A',
                  borderRadius: 14, padding: '1rem',
                  boxShadow: '3px 3px 0px #0A0A0A',
                }}
              >
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: h.color, lineHeight: 1 }}>{h.value}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{h.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <motion.a href="https://www.linkedin.com/in/ali-anass-amradouch-321567255/" target="_blank"
              whileHover={{ y: -3 }}
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.72rem 1.5rem', borderRadius: 50,
                fontFamily: 'var(--mono)', fontSize: '0.84rem', fontWeight: 700,
                background: '#0A0A0A', color: '#FDE047',
                boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              }}>
              LinkedIn ↗
            </motion.a>
            <motion.a href="https://github.com/aliamrrr" target="_blank"
              whileHover={{ y: -3 }}
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.72rem 1.5rem', borderRadius: 50,
                fontFamily: 'var(--mono)', fontSize: '0.84rem', fontWeight: 700,
                background: 'transparent', color: '#0A0A0A',
                border: '2px solid #0A0A0A',
              }}>
              GitHub ↗
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .about-split { grid-template-columns: 1fr !important; padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
