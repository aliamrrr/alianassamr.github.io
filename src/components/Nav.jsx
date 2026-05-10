import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Experience', 'Education', 'Awards', 'Skills', 'Interests', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach(l => { const el = document.getElementById(l.toLowerCase()); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 2.5rem',
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ fontFamily: 'Bebas Neue', fontSize: '1.9rem', letterSpacing: '0.04em', color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: 2 }}>
          AA<span style={{ color: '#6D28D9' }}>.</span>
        </a>

        {/* Floating pill menu */}
        <div className="nav-links" style={{
          display: 'flex', gap: 4, alignItems: 'center',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 50,
          padding: '6px 8px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        }}>
          {links.map(l => {
            const isActive = active === l.toLowerCase();
            return (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  position: 'relative',
                  padding: '0.38rem 0.95rem',
                  borderRadius: 50,
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : '#6B7280',
                  background: isActive ? '#6D28D9' : 'transparent',
                  letterSpacing: '0.03em',
                  transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#0A0A0A'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6B7280'; }}
              >
                {l}
              </a>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04, boxShadow: '4px 4px 0px #4C1D95' }}
          whileTap={{ scale: 0.96 }}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700,
            padding: '0.58rem 1.4rem', borderRadius: 50,
            background: '#6D28D9', color: '#fff',
            letterSpacing: '0.04em',
            boxShadow: '3px 3px 0px #4C1D95',
            transition: 'box-shadow 0.2s',
          }}
        >
          Contact
        </motion.a>

        {/* Burger */}
        <button onClick={() => setOpen(v => !v)} className="nav-burger" aria-label="menu"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0, 1].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: '#0A0A0A',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open && i === 0 ? 'translateY(7px) rotate(45deg)' : open && i === 1 ? 'translateY(-0px) rotate(-45deg)' : 'none',
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 66, left: 12, right: 12, zIndex: 999,
              background: '#fff', borderRadius: 20, padding: '1.2rem 1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 0',
                  fontFamily: 'Bebas Neue', fontSize: '2rem', letterSpacing: '0.04em', color: '#0A0A0A',
                  borderBottom: i < links.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {l}
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#6D28D9', fontWeight: 600 }}>0{i + 1}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 820px) {
          .nav-links  { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
