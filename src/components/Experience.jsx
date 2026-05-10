import { motion } from 'framer-motion';
import Carousel from './Carousel';
import { asset } from '../utils/asset';

const exps = [
  {
    n: '01', role: 'AI Engineer', company: 'Sopra Steria Next',
    period: 'Oct 2025 — Present · Nantes', logo: asset('/sopra steria next logo.png'),
    color: '#6D28D9', bg: '#EDE9FE',
    bullets: [
      'Contributed to the framing of AI use cases across generative AI, speech-to-text, and observability.',
      'Developed AI solutions and components within enterprise environments.',
      'Supported the industrialization of AI use cases, from POC to production-ready solutions.',
    ],
  },
  {
    n: '02', role: 'AI Research Intern', company: 'Royal Belgian FA',
    period: 'Dec 2024 — Mar 2025 · Remote', logo: asset('/rbfa logo.png'),
    color: '#1D4ED8', bg: '#EFF6FF',
    bullets: [
      'Translated tactical match analysis needs into AI solutions.',
      'Built CV pipelines for player detection & phase-of-play segmentation.',
      'Produced custom tactical visualizations for match preparation.',
    ],
  },
  {
    n: '03', role: 'AI Research Intern', company: 'ALTEN R&D Innovation Lab',
    period: 'Apr – Sept 2024 · Rennes', logo: asset('/alten logo.svg'),
    color: '#0F766E', bg: '#F0FDFA',
    bullets: [
      'Researched applied LLM techniques over tabular ESG & financial reports.',
      'Benchmarked context formats, prompting strategies & RAG architectures.',
      'Built a Text2SQL NL querying demonstrator.',
    ],
  },
  {
    n: '04', role: 'Software Engineer / Data Analyst', company: 'French Health Insurance',
    period: 'Sept – Dec 2024 · Remote', emoji: '🏥',
    color: '#B45309', bg: '#FFFBEB',
    bullets: [
      'Led team of 4 building a full-stack fraud detection interface.',
      'Designed database architecture, backend & frontend; built BI dashboards.',
      'Presented at Palais des Congrès de Paris to the French Ministry of Health.',
    ],
  },
];

function ExpCard({ exp }) {
  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: `6px 6px 0px ${exp.color}` }}
      style={{
        flexShrink: 0,
        width: 'min(72vw, 580px)',
        background: exp.bg,
        border: `2px solid ${exp.color}`,
        borderRadius: 20,
        padding: '2.2rem 2.4rem',
        display: 'flex', flexDirection: 'column', gap: '1.2rem',
        position: 'relative', overflow: 'hidden',
        boxShadow: `3px 3px 0px ${exp.color}`,
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
    >
      {/* Big number watermark */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-1rem', right: '0.5rem',
        fontFamily: 'Bebas Neue', fontSize: 'clamp(70px, 14vw, 160px)',
        lineHeight: 0.85, userSelect: 'none', pointerEvents: 'none',
        color: exp.color, opacity: 0.08,
      }}>{exp.n}</div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        {exp.logo ? (
          <div style={{
            width: 52, height: 52, borderRadius: 12, background: '#fff',
            border: `2px solid ${exp.color}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: 7, flexShrink: 0,
          }}>
            <img src={exp.logo} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{
            width: 52, height: 52, borderRadius: 12, background: '#fff',
            border: `2px solid ${exp.color}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
          }}>{exp.emoji}</div>
        )}
        <div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: '#0A0A0A' }}>{exp.role}</h3>
          <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.8rem', color: exp.color, marginTop: 2 }}>{exp.company}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#6B7280', marginTop: 1 }}>{exp.period}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 2, background: exp.color, opacity: 0.18, borderRadius: 1 }} />

      {/* Bullets */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {exp.bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.55rem', fontFamily: 'var(--body)', fontSize: '0.9rem', lineHeight: 1.65, color: '#374151' }}>
            <span style={{ color: exp.color, fontWeight: 900, flexShrink: 0, fontSize: '0.9rem' }}>→</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section section--white" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow">Career</p>
            <h2 className="sec-title">EXPERIENCE.</h2>
          </div>
          <p className="sec-body">
            Led AI initiatives across fintech, sports analytics & healthcare. Shipped production-grade systems from semantic search to computer vision pipelines.
          </p>
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', paddingLeft: 0 }}>
          ← Drag to explore →
        </p>
      </div>

      {/* Full-width carousel */}
      <Carousel gap={20} paddingX={48}>
        {exps.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ExpCard exp={e} />
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
}
