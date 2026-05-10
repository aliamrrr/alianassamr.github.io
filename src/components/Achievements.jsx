import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';

const awards = [
  {
    n: '01', rank: '#2 / 3,000', logo: '/hackathons/logo barca.png',
    title: 'Barça Innovation Hub',
    desc: '2nd out of 3,000 applicants at Talent Arena Barcelona — AI applied to football performance analytics.',
    rankBg: '#FDE047', rankColor: '#0A0A0A', border: '#0A0A0A',
  },
  {
    n: '02', rank: 'WINNER', logo: '/hackathons/huawei logo.png',
    title: 'Huawei Munich Tech Arena',
    desc: "Outstanding Award in the AI & Audio track at Huawei's international innovation competition.",
    rankBg: '#6D28D9', rankColor: '#fff', border: '#6D28D9',
  },
  {
    n: '03', rank: 'WINNER', logo: '/hackathons/aurbus logo.png',
    title: 'Airbus Digital Challenge',
    desc: 'Winner with an NLP-based informal data analysis solution for aerospace use cases.',
    rankBg: '#0A0A0A', rankColor: '#FDE047', border: '#0A0A0A',
  },
  {
    n: '04', rank: 'SPEAKER', emoji: '🏛️',
    title: 'Palais des Congrès de Paris',
    desc: 'Presented fraud detection research to representatives of the French Ministry of Health.',
    rankBg: '#6D28D9', rankColor: '#fff', border: '#6D28D9',
  },
];

function AwardCard({ award, i }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = 'transform 0.08s ease';
  }, []);
  const onLeave = useCallback(() => {
    ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
  }, []);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        flex: '1 1 240px', minWidth: 0,
        background: '#fff',
        border: `2px solid ${award.border}`,
        borderRadius: 20, padding: '2.2rem 2rem',
        position: 'relative', overflow: 'hidden',
        boxShadow: `4px 4px 0px ${award.border}`,
        transformStyle: 'preserve-3d', willChange: 'transform',
        cursor: 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Big number */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-1rem', right: '0.5rem',
        fontFamily: 'Bebas Neue', fontSize: '6rem', lineHeight: 0.85,
        color: award.border, opacity: 0.07, userSelect: 'none',
      }}>{award.n}</div>

      {/* Rank badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: award.rankBg, color: award.rankColor,
        padding: '0.32rem 0.9rem', borderRadius: 50,
        fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em',
        marginBottom: '1.2rem', border: `1.5px solid ${award.border}`,
      }}>{award.rank}</div>

      {award.logo ? (
        <motion.img src={award.logo} alt={award.title}
          whileHover={{ scale: 1.06 }}
          style={{ height: 40, maxWidth: 130, objectFit: 'contain', marginBottom: '1.1rem', display: 'block' }}
        />
      ) : (
        <div style={{ fontSize: '2.2rem', marginBottom: '1.1rem' }}>{award.emoji}</div>
      )}

      <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.45rem', letterSpacing: '0.02em', marginBottom: '0.5rem', color: '#0A0A0A' }}>{award.title}</h3>
      <p style={{ fontFamily: 'var(--body)', fontSize: '0.84rem', color: '#6B7280', lineHeight: 1.65 }}>{award.desc}</p>
    </motion.article>
  );
}

export default function Achievements() {
  return (
    <section id="awards" className="section section--off" style={{ paddingBottom: '5.5rem' }}>
      {/* Yellow stripe top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#FDE047' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow">Recognition</p>
            <h2 className="sec-title">AWARDS &<br />HONORS.</h2>
          </div>
          <p className="sec-body">
            Competitive results at international hackathons and public research presentations — from Barcelona to Paris.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {awards.map((a, i) => <AwardCard key={i} award={a} i={i} />)}
        </div>
      </div>
    </section>
  );
}
