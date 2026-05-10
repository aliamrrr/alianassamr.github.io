import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0A',
      padding: '2.2rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', letterSpacing: '0.04em' }}>
        <span style={{ color: '#FDE047' }}>AA</span>
        <span style={{ color: '#6D28D9' }}>.</span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {[
          { href: 'https://www.linkedin.com/in/ali-anass-amradouch-321567255/', label: 'LinkedIn' },
          { href: 'https://github.com/aliamrrr', label: 'GitHub' },
          { href: 'mailto:aliamr3210@gmail.com', label: 'Email' },
        ].map(({ href, label }) => (
          <motion.a key={label} href={href}
            whileHover={{ color: '#FDE047' }}
            style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s', letterSpacing: '0.06em' }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
        © 2026 Ali Anass Amradouch · React · Vite · Framer Motion
      </div>
    </footer>
  );
}
