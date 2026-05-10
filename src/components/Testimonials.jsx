import { motion } from 'framer-motion';
import { TestimonialSlider } from './Carousel';

const testimonials = [
  {
    quote: "I had the pleasure of working with Ali during his internship, and I was very impressed by both his professionalism and his positive attitude. He consistently demonstrated strong commitment, reliability, and the ability to quickly learn and adapt. Ali contributed valuable insights and delivered his work with great attention to detail, always showing motivation to go the extra mile.",
    name: 'Pierpaolo Goffredo, PhD',
    role: 'Pilote Innovation in R&D · NLP & LLMs Expert',
    company: 'ALTEN R&D Innovation Lab',
    relation: 'Direct supervisor during AI internship',
    initials: 'PG',
    color: '#6D28D9',
  },
  {
    quote: "I had the privilege of managing Ali Anass during his internship at the RBFA. Ali demonstrated exceptional problem-solving abilities, navigating complex challenges with ease in our fast-paced environment. What truly set Ali apart was his dedication to research and innovation — constantly developing and exploring new ideas that benefited our organization. He has undoubtedly redefined our standards of excellence for interns.",
    name: 'Max Goldsmith',
    role: 'Analytics at Just Eat Takeaway',
    company: 'Royal Belgian Football Federation',
    relation: 'Direct manager at RBFA',
    initials: 'MG',
    color: '#0A0A0A',
  },
  {
    quote: "I had the opportunity to supervise Ali Anass during his internship, and I particularly appreciated his commitment to his work. He is a motivated individual who integrated quickly into the team, demonstrated excellent organizational skills, and contributed significantly to the project as well as during meetings. He has a solid understanding of AI and data science.",
    name: 'Saad Abidi',
    role: 'AI Engineer | Data Scientist',
    company: 'Atos',
    relation: 'Supervisor during internship',
    initials: 'SA',
    color: '#0F766E',
  },
];

function TestimonialCard({ item }) {
  return (
    <div style={{
      background: '#fff',
      border: '2px solid #0A0A0A',
      borderRadius: 24,
      padding: '2.8rem 3rem',
      maxWidth: 760,
      margin: '0 auto',
      position: 'relative',
      boxShadow: '6px 6px 0px #0A0A0A',
    }}>
      {/* Giant quote mark */}
      <div style={{
        position: 'absolute', top: '1.2rem', left: '2rem',
        fontFamily: 'Bebas Neue', fontSize: '7rem', lineHeight: 0.7,
        color: item.color, opacity: 0.12, userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>"</div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ fontSize: '1.1rem', color: '#EAB308' }}>★</span>
        ))}
        <span style={{
          marginLeft: 8, fontFamily: 'var(--mono)', fontSize: '0.68rem',
          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: item.color, background: `${item.color}12`,
          border: `1px solid ${item.color}33`, borderRadius: 50,
          padding: '0.2rem 0.7rem',
        }}>LinkedIn Recommendation</span>
      </div>

      {/* Quote */}
      <blockquote style={{
        fontFamily: 'var(--body)', fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
        lineHeight: 1.82, color: '#374151', fontStyle: 'italic',
        marginBottom: '2rem', position: 'relative', zIndex: 1,
      }}>
        "{item.quote}"
      </blockquote>

      {/* Divider */}
      <div style={{ height: 2, background: 'rgba(0,0,0,0.06)', borderRadius: 1, marginBottom: '1.5rem' }} />

      {/* Person */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Initials avatar */}
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          background: item.color, color: item.color === '#0A0A0A' ? '#FDE047' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Bebas Neue', fontSize: '1.3rem', letterSpacing: '0.05em',
          border: '2px solid #0A0A0A', flexShrink: 0,
        }}>
          {item.initials}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.92rem', color: '#0A0A0A' }}>{item.name}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: item.color, fontWeight: 600, marginTop: 2 }}>{item.role}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: '#9CA3AF', marginTop: 1 }}>{item.company} · {item.relation}</div>
        </div>
        {/* LinkedIn mark */}
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0077B5', background: '#E8F4FD',
            border: '1px solid #0077B533', borderRadius: 8,
            padding: '0.3rem 0.6rem',
          }}>in LinkedIn</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section section--yellow" style={{ paddingBottom: '5.5rem', position: 'relative' }}>
      {/* Stripe decoration */}
      <div className="stripe-pattern" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow sec-eyebrow--dark">Social Proof</p>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(54px, 8.5vw, 110px)', lineHeight: 0.9, color: '#0A0A0A' }}>
              WHAT THEY<br />SAY.
            </h2>
          </div>
          <p className="sec-body sec-body--dark">
            Real LinkedIn recommendations from managers and colleagues who worked with me directly.
          </p>
        </div>

        {/* Counter strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', gap: 0, marginBottom: '2.5rem',
            background: '#0A0A0A', borderRadius: 14, overflow: 'hidden',
            border: '2px solid #0A0A0A',
          }}
        >
          {[
            { value: '3', label: 'LinkedIn Recs' },
            { value: '100%', label: 'Positive' },
            { value: '3', label: 'Companies' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: '1rem', textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#FDE047', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          <TestimonialSlider
            items={testimonials}
            renderItem={(item) => <TestimonialCard item={item} />}
            interval={6000}
          />
        </motion.div>
      </div>
    </section>
  );
}
