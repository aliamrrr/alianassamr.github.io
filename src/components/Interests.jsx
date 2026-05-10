import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

const stats = [
  { value: '12+', label: 'Years watching football' },
  { value: '∞',   label: 'Matches analyzed' },
  { value: 'AI',  label: 'Meets the beautiful game' },
];

const topics = [
  '⚽ Tactical Analysis',
  '📊 Expected Goals (xG)',
  '🤖 Computer Vision in Football',
  '📡 Player Tracking Data',
  '🧠 AI Match Prediction',
  '🎯 Set-Piece Optimization',
  '📈 Performance Analytics',
  '🔍 Scouting with AI',
];

const images = [
  { src: asset('/interests/back_area_frame.jpg') },
  { src: asset('/interests/IMG_0417 (1).jpg'), pos: 'center 20%' },
  { src: asset('/interests/IMG_5089.jpg') },
  { src: asset('/interests/back_lines.jpg'), pos: 'left center' },
  { src: asset('/interests/taible.PNG') },
];

export default function Interests() {
  return (
    <section id="interests" className="section section--yellow" style={{ paddingBottom: '6rem' }}>
      <div className="stripe-pattern" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow sec-eyebrow--dark">Beyond the Code</p>
            <h2 className="sec-title" style={{ color: '#0A0A0A' }}>FOOTBALL<br />&amp; AI.</h2>
          </div>
          <p className="sec-body" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Where my passion for the beautiful game meets data science — watching, analyzing, and exploring what AI can bring to football.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="interests-grid">

          {/* LEFT — text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p style={{
              fontFamily: 'var(--body)', fontSize: '1.05rem', lineHeight: 1.85,
              color: 'rgba(0,0,0,0.7)', marginBottom: '1.8rem',
            }}>
              Football is more than a hobby — it's where I combine my love for tactics with my expertise in AI and data. I watch matches with an analytical lens, breaking down formations, pressing patterns, and set-piece designs.
            </p>
            <p style={{
              fontFamily: 'var(--body)', fontSize: '1.05rem', lineHeight: 1.85,
              color: 'rgba(0,0,0,0.7)', marginBottom: '2rem',
            }}>
              From computer vision pipelines for player tracking to xG models and AI-driven scouting tools, I actively explore how machine learning is reshaping the sport at every level.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.2rem', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    background: '#0A0A0A', borderRadius: 14, padding: '1rem 1.4rem',
                    boxShadow: '3px 3px 0px #EAB308',
                    border: '2px solid #0A0A0A',
                  }}
                >
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#FDE047', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Topic tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
              {topics.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                  style={{
                    padding: '0.38rem 0.9rem', borderRadius: 50,
                    fontFamily: 'var(--mono)', fontSize: '0.73rem', fontWeight: 500,
                    background: '#fff',
                    border: '1.5px solid #0A0A0A',
                    color: '#0A0A0A',
                    boxShadow: '2px 2px 0px #0A0A0A',
                  }}
                >{t}</motion.span>
              ))}
            </div>

            {/* LinkedIn posts CTA */}
            <motion.a
              href="https://www.linkedin.com/company/ali-decodes/?viewAsMember=true"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, boxShadow: '5px 5px 0px #4C1D95' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.78rem 1.6rem', borderRadius: 50,
                fontFamily: 'var(--mono)', fontSize: '0.84rem', fontWeight: 700,
                background: '#6D28D9', color: '#fff',
                border: '2px solid #0A0A0A',
                boxShadow: '3px 3px 0px #4C1D95',
                transition: 'box-shadow 0.25s, transform 0.25s',
                letterSpacing: '0.03em',
              }}
            >
              Find all my posts about it on LinkedIn ↗
            </motion.a>
          </motion.div>

          {/* RIGHT — photo grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, zIndex: 2 }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '2.5px solid #0A0A0A',
                  boxShadow: '3px 3px 0px #0A0A0A',
                  aspectRatio: i === 0 ? '16/10' : '1/1',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  position: 'relative',
                  background: 'transparent',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
              >
                <img
                  src={img.src}
                  alt={`Football & AI — post ${i + 1}`}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: img.pos || 'top center',
                    display: 'block',
                  }}
                />
                {/* Fallback overlay shown always — acts as caption on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .interests-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
