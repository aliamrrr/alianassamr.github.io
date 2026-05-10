import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { asset } from '../utils/asset';
import Typewriter from './Typewriter';
import { HandWritingUnderline, HandWritingCircle } from './HandWritingText';

function Magnetic({ children, href, target, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.35;
    const y = (e.clientY - r.top  - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px,${y}px)`;
    el.style.transition = 'transform 0.1s ease';
  }, []);
  const onLeave = useCallback(() => {
    ref.current.style.transform = 'translate(0,0)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
  }, []);
  return (
    <a ref={ref} href={href} target={target} onMouseMove={onMove} onMouseLeave={onLeave} style={style}>
      {children}
    </a>
  );
}

const roles = ['AI Solutions Engineer', 'Data Scientist', 'LLM Specialist', 'Builder'];

const stats = [
  { value: '3+',   label: 'Production AI Apps', color: '#6D28D9' },
  { value: '#2',   label: 'Barça Hackathon — out of 3K', color: '#EAB308' },
  { value: '4',    label: 'Languages Spoken', color: '#6D28D9' },
  { value: '3×',   label: 'International Hackathon Wins', color: '#EAB308' },
];

export default function Hero() {
  return (
    <section id="hero" className="section section--white" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Main centered block */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 3rem 3rem',
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
      }}>

        {/* Location badge — no "available" language */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: '2.5rem', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280',
            background: '#F9FAFB', border: '1px solid rgba(0,0,0,0.08)',
            padding: '0.35rem 0.9rem', borderRadius: 50,
          }}>📍 Nantes, France</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6D28D9',
            background: '#EDE9FE', border: '1px solid #C4B5FD',
            padding: '0.35rem 0.9rem', borderRadius: 50,
          }}>AI Engineer · Sopra Steria Next</span>
        </motion.div>

        {/* Name — staggered reveal with handwriting decorations */}
        <div style={{ marginBottom: '2rem' }}>
          {/* "ALI ANASS" with handwriting circle */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.1rem' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: 130 }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }}
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(72px, 13vw, 155px)',
                  lineHeight: 0.88, letterSpacing: '0.01em', color: '#0A0A0A',
                }}
              >
                ALI ANASS
              </motion.h1>
            </div>
            {/* Circle drawn around "ALI ANASS" */}
            <HandWritingCircle color="#FDE047" delay={1.0} />
          </div>

          {/* "AMRADOUCH." with underline */}
          <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.05rem' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: 130 }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22,1,0.36,1] }}
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(72px, 13vw, 155px)',
                  lineHeight: 0.88, letterSpacing: '0.01em', color: '#6D28D9',
                }}
              >
                AMRADOUCH.
              </motion.h1>
            </div>
            {/* Handwritten underline */}
            <HandWritingUnderline color="#FDE047" delay={1.6} />
          </div>
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: 'var(--mono)', fontWeight: 600,
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            color: '#6D28D9', letterSpacing: '0.02em',
            minHeight: '2em', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <Typewriter
            text={roles}
            speed={55} deleteSpeed={30} waitTime={2600}
            cursorChar="▮"
            cursorStyle={{ color: '#FDE047', marginLeft: 4 }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            fontFamily: 'var(--body)', fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)',
            lineHeight: 1.78, color: '#6B7280', maxWidth: '50ch',
            marginBottom: '2.5rem',
          }}
        >
          Architecting and shipping production-grade AI — from RAG pipelines and semantic search to computer vision and LLM fine-tuning.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Magnetic href="#experience" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.9rem 2.1rem', borderRadius: 50,
            fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.9rem',
            background: '#FDE047', color: '#0A0A0A',
            boxShadow: '4px 4px 0px #EAB308', letterSpacing: '0.02em',
            transition: 'transform 0.22s, box-shadow 0.22s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='6px 6px 0px #EAB308'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow='4px 4px 0px #EAB308'; }}>
            Explore My Work →
          </Magnetic>

          <Magnetic href={asset('/Ali_Anass_Amradouch_Resume.pdf')} target="_blank" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.9rem 2.1rem', borderRadius: 50,
            fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.9rem',
            background: 'transparent', color: '#6D28D9',
            border: '2px solid #6D28D9', letterSpacing: '0.02em',
            transition: 'background 0.22s, color 0.22s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#6D28D9'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6D28D9'; }}>
            Download CV ↓
          </Magnetic>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          background: '#FAFAF8',
          padding: '1.6rem 3rem',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: '1 1 180px', textAlign: 'center',
            padding: '0.75rem 1.5rem',
            borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
          }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
