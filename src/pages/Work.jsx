import { useEffect, useRef, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProject, workColumns, workOrder } from '../data/content';
import { href } from '../hooks/useRoute';
import { useVisibleCards } from '../hooks/useFocusedCard';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

// Two staggered columns as soon as there is room; a single column only when the usable width
// (viewport minus the open chat dock) drops under 1024px.
// `oneLine`: room to keep "Ali Anass is an AI Engineer" on a single line (~850px at 4rem).
function useNarrow(chatOpen) {
  const calc = () => {
    const usable = chatOpen ? window.innerWidth - 400 : window.innerWidth;
    return { narrow: usable < 1024, oneLine: usable >= (chatOpen ? 1100 : 1024) };
  };
  const [narrow, setNarrow] = useState(calc);
  useEffect(() => {
    const on = () => setNarrow(calc());
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [chatOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  return narrow;
}

export default function Work({ chatOpen }) {
  const { narrow, oneLine } = useNarrow(chatOpen);
  const gridRef = useRef(null);
  // every card on screen plays by itself (as if hovered); the one under the mouse always plays
  const visible = useVisibleCards(gridRef);
  const [hovered, setHovered] = useState(null);
  const card = (s) => <ProjectCard key={s} project={getProject(s)} active={hovered === s || visible.has(s)} onHover={setHovered} />;

  return (
    <div>
      <h1 className="hero-headline">
        <span className={oneLine ? 'hero-line one' : 'hero-line'}><span className="name-tag">Ali Anass</span> is an AI Engineer</span> {!narrow && <br />}who loves building AI use cases.
      </h1>
      <p className="hero-note">
        <svg className="hero-link" width="22" height="18" viewBox="0 0 22 18" aria-hidden>
          <path d="M2 0 V9 Q2 13 6 13 H18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 9.5 L19 13 L15 16.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>AI native too: always on X, following AI news and testing new tech <span className="smile">:)</span></span>
      </p>

      <div className="meta-grid">
        <div className="cell c2">
          <p className="label label-now">Currently</p>
          <p className="value">
            AI Engineer @{' '}
            <a href="https://www.soprasteria.com" {...ext}>Sopra Steria Next</a>
            {narrow ? ' ' : <br />}in Nantes, France
          </p>
          <p className="value now-line">
            <span className="live-dot" aria-hidden />
            Working on AI evals &amp; monitoring
          </p>
        </div>
        <div className="cell c2 certified">
          <p className="label">Certified</p>
          <p className="value">
            Claude Developer
            <br />Claude Associate
            <br />AWS AI Practitioner
          </p>
        </div>
        <div className="cell c4">
          <p className="label">Previously</p>
          <p className="value">
            Computer vision @ <a href="https://www.rbfa.be" {...ext}>RBFA</a>, LLM research @{' '}
            <a href="https://www.alten.com" {...ext}>ALTEN</a>, fraud detection @ French Health Insurance,{' '}
            <a href={href.about}>and more</a>.
          </p>
        </div>
      </div>

      <div ref={gridRef} className={`projects ${narrow ? '' : 'two'}`}>
        {narrow ? (
          workOrder.map(card)
        ) : (
          <>
            {workColumns.map((col, i) => (
              <div className="col" key={i}>
                {col.map(card)}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
