import { motion } from 'framer-motion';

const groups = [
  {
    icon: '🤖', label: 'AI & Machine Learning',
    tags: ['Python', 'PyTorch', 'LangChain', 'Fine-Tuning', 'GRPO / RL', 'Hugging Face', 'vLLMs'],
  },
  {
    icon: '🔍', label: 'NLP & RAG',
    tags: ['RAG Pipelines', 'Semantic Search', 'NLP', 'Text2SQL', 'Embeddings'],
  },
  {
    icon: '🗄️', label: 'Data Engineering',
    tags: ['SQL', 'PostgreSQL', 'Data Engineering', 'Grafana', 'Power BI'],
  },
  {
    icon: '👁️', label: 'Computer Vision',
    tags: ['OpenCV', 'Object Detection', 'Segmentation', 'Player Tracking'],
  },
  {
    icon: '☁️', label: 'Infrastructure & Cloud',
    tags: ['Docker', 'Kubernetes', 'OpenShift', 'FastAPI', 'Azure'],
  },
];

const langs = [
  { flag: '🇲🇦', l: 'Arabic',  lvl: 'Native',    bars: 5 },
  { flag: '🇫🇷', l: 'French',  lvl: 'Bilingual',  bars: 5 },
  { flag: '🇬🇧', l: 'English', lvl: 'C1',         bars: 4 },
  { flag: '🇪🇸', l: 'Spanish', lvl: 'B2',         bars: 3 },
];

const interests = ['⚽ Competitive Football', '🎣 Fishing', '🎾 Tennis', '🎤 Tech Talks', '🔬 AI Research'];

export default function Skills() {
  return (
    <section id="skills" className="section section--purple" style={{ paddingBottom: '6rem' }}>
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow sec-eyebrow--light">Expertise</p>
            <h2 className="sec-title sec-title--white">SKILLS &amp;<br />STACK.</h2>
          </div>
          <p className="sec-body sec-body--light">
            Advanced Python across the full ML/AI lifecycle, shipped on cloud-native infra, and fluent in four languages.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="skills-grid">

          {/* LEFT — Skill groups */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.06em', color: '#FDE047', marginBottom: '1.8rem' }}>Technical Stack</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {groups.map((g, gi) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + gi * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14,
                    padding: '1rem 1.2rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
                    <span style={{ fontSize: '0.95rem' }}>{g.icon}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 700, color: '#FDE047', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{g.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {g.tags.map((t, ti) => (
                      <motion.span key={t}
                        initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 + gi * 0.08 + ti * 0.04, type: 'spring', stiffness: 220 }}
                        whileHover={{ background: '#FDE047', color: '#0A0A0A', borderColor: '#FDE047' }}
                        style={{
                          padding: '0.3rem 0.75rem', borderRadius: 8,
                          fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 500,
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: '#fff', cursor: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >{t}</motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Languages + Interests */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.06em', color: '#FDE047', marginBottom: '1.8rem' }}>Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
              {langs.map((l, i) => (
                <motion.div key={l.l}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ background: 'rgba(253,224,71,0.1)', borderColor: 'rgba(253,224,71,0.35)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.9rem 1.2rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14,
                    transition: 'all 0.25s',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{l.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{l.l}</div>
                    {/* Level bars */}
                    <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
                      {[1,2,3,4,5].map(b => (
                        <div key={b} style={{ width: 18, height: 4, borderRadius: 2, background: b <= l.bars ? '#FDE047' : 'rgba(255,255,255,0.15)' }} />
                      ))}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.05rem', color: '#FDE047', letterSpacing: '0.08em' }}>{l.lvl}</span>
                </motion.div>
              ))}
            </div>

            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.06em', color: '#FDE047', marginBottom: '1rem' }}>Interests</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {interests.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, type: 'spring' }}
                  whileHover={{ scale: 1.06, background: '#FDE047', color: '#0A0A0A', borderColor: '#FDE047' }}
                  style={{
                    padding: '0.42rem 1rem', borderRadius: 50,
                    fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 500,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.13)',
                    color: '#fff', cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                >{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
