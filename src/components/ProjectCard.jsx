import { useState } from 'react';
import AssetSlot from './AssetSlot';
import LiveMatch from './LiveMatch';
import CodmaiDemo from './CodmaiDemo';
import TableQA from './TableQA';
import { href } from '../hooks/useRoute';

/* `active` (optional) lets the Work page play a card without the mouse; otherwise hover drives it. */
export default function ProjectCard({ project, active, onHover }) {
  const { clickable, cursor, cursorText, title, tag, slug, url, cardLive, ctx } = project;
  const media = project.cardMedia || project.media || {};
  const [hover, setHover] = useState(false);
  const on = active ?? hover;
  const enter = () => { setHover(true); onHover?.(slug); };
  const leave = () => { setHover(false); onHover?.(null); };

  const inner = (
    <div className={`card${on ? " is-on" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
      <div className="card-media">
        {cardLive === 'tables' ? (
          <div className="asset inset-border tableqa-frame" style={{ aspectRatio: String(media.ratio) }}>
            <TableQA variant="card" active={on} />
          </div>
        ) : (
          <AssetSlot src={media.src} type={media.type} ratio={media.ratio} hint={media.hint} pos={media.pos} poster={media.poster} alt={title} />
        )}
        {cardLive === 'cv' && <LiveMatch variant="card" active={on} />}
        {cardLive === 'codmai' && <CodmaiDemo variant="card" active={on} />}
        {clickable && !cardLive && <div className="hover-veil" />}
      </div>
      <div className="card-caption">
        <span className="t">{title}</span>
        <span className="s">/</span>
        <span className="g">{tag}</span>
      </div>
    </div>
  );

  if (!clickable) {
    return (
      <div data-card={slug} data-cursor={cursorText ? undefined : cursor || 'coming-soon'} data-cursor-text={cursorText} data-ctx={ctx}>
        {inner}
      </div>
    );
  }

  const external = !!url;
  return (
    <a
      href={external ? url : href.project(slug)}
      data-card={slug}
      data-cursor={cursor || 'case-study'}
      data-ctx={ctx}
      style={{ display: 'block' }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  );
}
