import { useEffect, useRef, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProject, workColumns, workOrder, workWide } from '../data/content';
import { href } from '../hooks/useRoute';
import { useFocusedCard } from '../hooks/useFocusedCard';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

// Mirrors the reference: collapse to a single column when the usable width
// (viewport minus the open chat dock) drops under 1280px.
function useNarrow(chatOpen) {
  const calc = () => (chatOpen ? window.innerWidth - 400 : window.innerWidth) < 1280 || window.innerWidth < 1200;
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
  const narrow = useNarrow(chatOpen);
  const gridRef = useRef(null);
  // the card the visitor is on plays by itself after 0.2s; the mouse takes over when it hovers one
  const focused = useFocusedCard(gridRef);
  const [hovered, setHovered] = useState(null);
  const card = (s) => <ProjectCard key={s} project={getProject(s)} active={hovered ? hovered === s : focused === s} onHover={setHovered} />;

  return (
    <div>
      <h1 className="hero-headline">
        <span className="name-tag">Ali Anass</span> is an AI engineer {!narrow && <br />}who loves building AI use cases.
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
            <div className="wide">{workWide.map(card)}</div>
          </>
        )}
      </div>
    </div>
  );
}
