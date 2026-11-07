import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRoute, href } from './hooks/useRoute';
import { profile, getProject } from './data/content';
import { SideNav, AskPill, MobileBar, Brand } from './components/Nav';
import Cursor from './components/Cursor';
import ChatPanel from './components/ChatPanel';
import SelectionAsk from './components/SelectionAsk';
import Footer from './components/Footer';
import TopClocks from './components/TopClocks';
import DimaEgg from './components/DimaEgg';
import Work from './pages/Work';
import Project from './pages/Project';
import Fun from './pages/Fun';
import About from './pages/About';
import Journal from './pages/Journal';
import NotFound from './pages/NotFound';

const enter = { initial: { opacity: 0, filter: 'blur(2px)' }, animate: { opacity: 1, filter: 'blur(0px)' } };

const TITLES = { work: 'AI Engineer', fun: 'Fun', journal: 'Journal', about: 'About', notfound: 'Offside' };

export default function App() {
  const route = useRoute();
  const [chatOpen, setChatOpen] = useState(false);
  const [pending, setPending] = useState(null);
  const scrollRef = useRef(null);

  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);
  const askAbout = useCallback((text) => { setPending(text); setChatOpen(true); }, []);
  const clearPending = useCallback(() => setPending(null), []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    const t = route.page === 'project' ? route.slug : TITLES[route.page];
    document.title = `${profile.name} | ${t}`;
  }, [route.key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setChatOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let page;
  if (route.page === 'project') page = getProject(route.slug) ? <Project slug={route.slug} /> : <NotFound />;
  else if (route.page === 'notfound') page = <NotFound />;
  else if (route.page === 'fun') page = <Fun chatOpen={chatOpen} />;
  else if (route.page === 'about') page = <About chatOpen={chatOpen} />;
  else if (route.page === 'journal') page = <Journal />;
  else page = <Work chatOpen={chatOpen} />;

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden />
      <SelectionAsk onAsk={askAbout} />
      <DimaEgg />

      <div className="shell">
        <div className="main-col">
          {/* Desktop chrome: brand + nav pinned left, AliLLM pill pinned right */}
          <div className="chrome">
            <div className="page-margin">
              <div className="grid-12">
                <aside className="chrome-aside">
                  <motion.div {...enter} transition={{ duration: 0.3, ease: 'easeOut' }} className="pe-auto">
                    <Brand />
                  </motion.div>
                  <motion.div {...enter} transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }} className="chrome-nav-wrap pe-auto">
                    <SideNav route={route} chatOpen={chatOpen} onToggleChat={toggleChat} />
                  </motion.div>
                </aside>
                <div className="chrome-right">
                  <div className="pe-auto chrome-right-row">
                    <AskPill open={chatOpen} onClick={toggleChat} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="site-scroll" ref={scrollRef}>
            <div className="page-margin">
              {/* Desktop clocks live in the scrolling page (not the fixed chrome), so they scroll away.
                  An invisible copy of the pill keeps them in their spot next to the real, fixed pill. */}
              <div className="scroll-clocks">
                <div className="grid-12">
                  <div className="chrome-right">
                    <div className="chrome-right-row">
                      <TopClocks />
                      <span className="pill-ghost" aria-hidden><AskPill open={chatOpen} onClick={() => {}} /></span>
                    </div>
                  </div>
                </div>
              </div>
              <MobileBar route={route} chatOpen={chatOpen} onToggleChat={toggleChat} />
              <div className="grid-12">
                <main className="content" data-askable>
                  <AnimatePresence mode="wait" initial={true}>
                    <motion.div
                      key={route.key}
                      {...enter}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ flex: 1 }}
                    >
                      {page}
                    </motion.div>
                  </AnimatePresence>
                  <Footer />
                </main>
              </div>
            </div>
          </div>
        </div>

        <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} pending={pending} onPendingHandled={clearPending} />
      </div>
    </>
  );
}
