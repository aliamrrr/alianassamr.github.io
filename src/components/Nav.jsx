import { useCallback, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { href } from '../hooks/useRoute';
import { profile } from '../data/content';
import { MiniLantern } from './Pixel';
import TopClocks from './TopClocks';

const ease = [0.22, 1, 0.36, 1];

export const NAV = [
  { id: 'work', label: 'Work', href: href.work },
  { id: 'about', label: 'About', href: href.about },
  { id: 'fun', label: 'Fun', href: href.fun },
  { id: 'resume', label: 'Resume', href: profile.resume, external: true, cursor: 'resume' },
  { id: 'journal', label: 'Journal', href: href.journal },
  { id: 'chat', label: 'AliLLM', chat: true },
];

const activeId = (route) => (route.page === 'project' ? 'work' : route.page);

/* Name that crossfades to Arabic on hover. */
export function Brand({ as: Tag = 'a' }) {
  return (
    <Tag {...(Tag === 'a' ? { href: href.work } : {})} className="brand" aria-label={profile.name}>
      <span className="brand-latin">{profile.name}</span>
      <span className="brand-arabic" lang="ar" dir="rtl" aria-hidden>علي أنس</span>
    </Tag>
  );
}

/* Vertical sidebar nav; a 4px square slides to the active item. */
export function SideNav({ route, chatOpen, onToggleChat }) {
  const ref = useRef(null);
  const [top, setTop] = useState(null);
  const [instant, setInstant] = useState(true);
  const lastTop = useRef(null);
  const current = chatOpen ? 'chat' : activeId(route);

  const measure = useCallback((jump) => {
    const el = ref.current?.querySelector('[data-active="true"]');
    if (!el) { lastTop.current = null; setTop(null); return; }
    const t = el.offsetTop + el.offsetHeight / 2 - 2;
    if (t !== lastTop.current) { lastTop.current = t; setInstant(jump); setTop(t); }
  }, []);

  useLayoutEffect(() => { measure(lastTop.current === null); }, [current, measure]);
  useEffect(() => {
    const ro = new ResizeObserver(() => measure(true));
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <nav ref={ref} className="nav" aria-label="Primary">
      {top !== null && (
        <motion.span
          className="nav-mark"
          initial={false}
          animate={{ top }}
          transition={instant ? { duration: 0 } : { duration: 0.35, ease }}
          aria-hidden
        />
      )}
      {NAV.map((item) => {
        const active = current === item.id;
        if (item.chat) {
          return (
            <button key={item.id} className="nav-item" data-active={active || undefined} onClick={onToggleChat}>
              {item.label}
            </button>
          );
        }
        return (
          <a
            key={item.id}
            className="nav-item"
            href={item.href}
            data-active={active || undefined}
            aria-current={active ? 'page' : undefined}
            data-cursor={item.cursor}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {item.label}
            {item.external && <span className="ext">↗</span>}
          </a>
        );
      })}
    </nav>
  );
}

export function AskPill({ open, onClick }) {
  return (
    <button className="ask-pill" data-open={open} onClick={onClick} aria-expanded={open} data-ctx="tea">
      <MiniLantern lit={open} className="star" />
      {open ? 'Close AliLLM' : 'Ask AliLLM'}
    </button>
  );
}

/* Small-screen header + full-screen menu */
export function MobileBar({ route, chatOpen, onToggleChat }) {
  const [open, setOpen] = useState(false);
  const current = activeId(route);

  useEffect(() => { setOpen(false); }, [route.key]);

  return (
    <>
      <div className="mobile-bar">
        <Brand />
        <div className="actions">
          <AskPill open={chatOpen} onClick={onToggleChat} />
          <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open}>Menu</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="top">
              <Brand as="span" />
              <button className="menu-btn" onClick={() => setOpen(false)}>Close</button>
            </div>
            <TopClocks />
            <nav aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * i, ease }}
                >
                  {item.chat ? (
                    <button onClick={() => { setOpen(false); onToggleChat(); }}>{item.label}</button>
                  ) : (
                    <a
                      href={item.href}
                      data-active={current === item.id || undefined}
                      onClick={() => setOpen(false)}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
