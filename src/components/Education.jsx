import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

const schools = [
  {
    logo: asset('/school/imt atlantique logo.png'),
    name: 'IMT Atlantique',
    degree: 'Engineering · Data Science',
    period: '2022–2025, Nantes',
    badge: 'Engineering Degree',
    gpa: 'GPA 3.92 / 4',
    note: 'ML, NLP, Data Engineering, System Design, Algorithms',
    back: 'Top engineering school in France (ranked #3 by L\'Étudiant). Specialization in AI & Data Science with hands-on production projects and research.',
    backColor: '#FDE047',
  },
  {
    logo: asset('/school/carlos 3 madrid logo.png'),
    name: 'Carlos III Madrid',
    degree: 'Erasmus+ · AI & LLMs',
    period: 'Jan–Jun 2024, Madrid',
    badge: 'Erasmus+',
    note: 'LLMs, vLLMs, Fine-Tuning, RAG architectures',
    back: 'International exchange in Madrid exploring cutting-edge LLM research — vLLM serving, advanced RAG pipelines, and fine-tuning methodologies.',
    backColor: '#FDE047',
  },
  {
    logo: asset('/school/cpge maroc.png'),
    name: 'MPSI / MP Prépa',
    degree: 'Mathematics & Physics',
    period: '2020–2022, Meknes',
    badge: 'Top of Class',
    note: 'Two years of intensive maths, physics & engineering prep.',
    back: 'Rigorous two-year program covering advanced mathematics, physics and engineering fundamentals — the intellectual foundation for everything I build.',
    backColor: '#FDE047',
  },
];

export default function Education() {
  return (
    <section id="education" className="section section--purple" style={{ paddingBottom: '5.5rem' }}>
      {/* Decorative dots */}
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow sec-eyebrow--light">Academic Background</p>
            <h2 className="sec-title sec-title--white">EDUCATION.</h2>
          </div>
          <p className="sec-body sec-body--light">
            Top engineering school in France, Erasmus+ in Madrid, and two years of intensive preparatory classes that built the rigour behind everything I build.
          </p>
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Hover cards to flip →
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {schools.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22,1,0.36,1] }}
              className="flip-card"
              style={{ flex: '1 1 260px', minWidth: 0, height: 320 }}
            >
              <div className="flip-card-inner">

                {/* FRONT */}
                <div className="flip-card-front" style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '2.2rem 2rem',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                }}>
                  {/* Yellow top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#FDE047', borderRadius: '20px 20px 0 0' }} />

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: '#fff', borderRadius: 14,
                    padding: '0.65rem 1.1rem',
                    marginBottom: '1.2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}>
                    <img src={s.logo} alt={s.name} style={{ height: 52, maxWidth: 150, objectFit: 'contain', display: 'block' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', letterSpacing: '0.02em', color: '#fff', marginBottom: '0.25rem' }}>{s.name}</h3>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: '0.8rem', color: '#FDE047', marginBottom: '0.2rem' }}>{s.degree}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>{s.period}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-block',
                      background: '#FDE047', color: '#0A0A0A',
                      padding: '0.28rem 0.85rem', borderRadius: 50,
                      fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em',
                    }}>{s.badge}</span>
                    {s.gpa && (
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>
                        {s.gpa}
                      </span>
                    )}
                  </div>

                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, marginTop: '0.85rem' }}>{s.note}</p>
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>HOVER →</div>
                </div>

                {/* BACK */}
                <div className="flip-card-back" style={{
                  background: '#FDE047',
                  padding: '2.5rem 2rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.1rem',
                  border: '3px solid #0A0A0A',
                  boxShadow: '6px 6px 0px #0A0A0A',
                }}>
                  <div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', lineHeight: 0.9, color: '#6D28D9' }}>{s.badge}</div>
                    {s.gpa && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', marginTop: '0.3rem', letterSpacing: '0.05em' }}>{s.gpa}</div>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: '#0A0A0A' }}>{s.name}</h3>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', lineHeight: 1.7, color: '#374151' }}>{s.back}</p>
                  <div style={{ width: 40, height: 3, background: '#6D28D9', borderRadius: 2 }} />
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#6B7280' }}>{s.period}</div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
