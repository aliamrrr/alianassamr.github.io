import { motion } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';

function Magnetic({ children, href, target, rel, style, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.38;
    const y = (e.clientY - r.top  - r.height / 2) * 0.38;
    el.style.transform = `translate(${x}px,${y}px)`;
    el.style.transition = 'transform 0.1s ease';
  }, []);
  const onLeave = useCallback((e) => {
    ref.current.style.transform = 'translate(0,0)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    onMouseLeave && onMouseLeave(e);
  }, [onMouseLeave]);

  return (
    <a ref={ref} href={href} target={target} rel={rel}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onMouseEnter}
      style={style}>
      {children}
    </a>
  );
}

const links = [
  { href: 'mailto:aliamr3210@gmail.com', label: 'aliamr3210@gmail.com', icon: '✉', tag: 'Email', bg: '#FDE047', color: '#0A0A0A', shadow: '#EAB308' },
  { href: 'tel:+33745431692',             label: '+33 7 45 43 16 92',    icon: '📱', tag: 'Phone', bg: '#fff', color: '#0A0A0A', shadow: '#0A0A0A' },
  { href: 'https://www.linkedin.com/in/ali-anass-amradouch-321567255/', label: 'LinkedIn', icon: '💼', tag: 'Network', bg: '#6D28D9', color: '#fff', shadow: '#4C1D95', ext: true },
  { href: 'https://github.com/aliamrrr', label: 'GitHub', icon: '💻', tag: 'Code', bg: '#0A0A0A', color: '#FDE047', shadow: '#000', ext: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('aliamr3210@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="section section--white" style={{ paddingBottom: '6rem' }}>
      {/* Yellow accent stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#FDE047' }} />

      <div className="container">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow">Let's Connect</p>
            <h2 className="sec-title">LET'S BUILD<br />SOMETHING.</h2>
          </div>
          <p className="sec-body">
            Based in Nantes, France · AI Engineer &amp; Data Scientist building production-grade AI systems.
          </p>
        </div>

        {/* Contact cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {links.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }}
            >
              <Magnetic
                href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noreferrer' : undefined}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  padding: '1.8rem 1.8rem',
                  background: l.bg, color: l.color,
                  border: '2px solid #0A0A0A',
                  borderRadius: 18,
                  boxShadow: `4px 4px 0px ${l.shadow}`,
                  fontFamily: 'var(--mono)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`6px 6px 0px ${l.shadow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=`4px 4px 0px ${l.shadow}`; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.6rem' }}>{l.icon}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', opacity: 0.6,
                    background: 'rgba(0,0,0,0.08)', borderRadius: 50, padding: '0.22rem 0.6rem',
                  }}>{l.tag}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{l.label}</div>
                  {l.ext && <div style={{ fontSize: '0.72rem', opacity: 0.55, marginTop: 3 }}>Open in new tab ↗</div>}
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        {/* Copy email */}
        <motion.button
          onClick={copyEmail}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.75rem 1.6rem', borderRadius: 10,
            fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700,
            background: copied ? '#F0FDF4' : '#FAFAF8',
            border: `2px solid ${copied ? '#22C55E' : '#E5E7EB'}`,
            color: copied ? '#16A34A' : '#6B7280',
            cursor: 'none', letterSpacing: '0.04em',
            transition: 'all 0.3s', marginBottom: '4rem',
          }}
        >
          {copied ? '✓ Copied to clipboard!' : '⎘ Copy email address'}
        </motion.button>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}
        >
          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(54px, 12vw, 180px)',
            lineHeight: 0.87, letterSpacing: '0.01em',
            userSelect: 'none',
          }}>
            <span style={{ color: '#0A0A0A' }}>LET'S<br /></span>
            <span style={{
              WebkitTextStroke: '3px #6D28D9',
              WebkitTextFillColor: 'transparent',
            }}>TALK.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
