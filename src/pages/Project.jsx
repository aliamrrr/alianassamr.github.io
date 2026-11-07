import AssetSlot from '../components/AssetSlot';
import { TeaPour } from '../components/Pixel';
import LiveMatch from '../components/LiveMatch';
import CodmaiDemo from '../components/CodmaiDemo';
import TableQA from '../components/TableQA';
import CaseBlock from '../components/CaseBlocks';
import { getProject, projects } from '../data/content';
import { href } from '../hooks/useRoute';

export default function Project({ slug }) {
  const p = getProject(slug);

  if (!p.clickable) {
    return (
      <div className="brewing">
        <a className="back-link" href={href.work}>← Work</a>
        <TeaPour scale={4} />
        <h1 className="hero-headline sm">{p.title} is still brewing.</h1>
        <p className="value">Case study coming soon. Pour yourself a glass in the meantime.</p>
      </div>
    );
  }

  const gallery = (p.gallery || []).filter((g) => g.src); // never show empty slots
  const readable = projects.filter((x) => x.clickable);
  const next = readable[(readable.indexOf(p) + 1) % readable.length];

  return (
    <article>
      <a className="back-link" href={href.work}>← Work</a>
      <h1 className="hero-headline sm">{p.heading}</h1>

      <div className="project-meta">
        <Meta label="Role" value={p.role} />
        <Meta label="Timeline" value={p.timeline} />
        <Meta label="Team" value={p.team?.length ? p.team.join(', ') : 'Solo'} />
        <Meta label="Skills" value={p.skills?.join(', ')} />
      </div>

      {p.live === 'tables' ? (
        <figure className="live-block hero">
          <TableQA variant="case" />
          {p.liveCaption && <figcaption className="figcap">{p.liveCaption}</figcaption>}
        </figure>
      ) : (
        <AssetSlot src={p.media.src} type={p.media.type} ratio={p.media.ratio} hint={p.media.hint} alt={p.title}
          poster={p.media.poster} controls={!!p.media.controls} />
      )}

      {p.summary && (
        <div className="project-measure">
          <section className="project-section">
            <h2>Overview</h2>
            <div className="prose"><p>{p.summary}</p></div>
          </section>
        </div>
      )}

      {p.live && p.live !== 'tables' && (
        <figure className="live-block">
          {p.live === 'detect' ? <LiveMatch variant="case" /> : <CodmaiDemo />}
          {p.liveCaption && <figcaption className="figcap">{p.liveCaption}</figcaption>}
        </figure>
      )}

      <div className="project-measure">

        {p.sections?.map((s) => (
          <section className="project-section" key={s.title}>
            <h2>{s.title}</h2>
            <div className="prose">
              {s.body?.map((b, i) => <p key={i}>{b}</p>)}
              {s.bullets && <ul>{s.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
            </div>
            {s.blocks?.map((b, i) => <CaseBlock key={i} block={b} />)}
          </section>
        ))}

        {p.link && (
          <section className="project-section">
            <h2>Link</h2>
            <p className="value">
              <a href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label} ↗</a>
            </p>
          </section>
        )}

        {p.quote && (
          <section className="project-section">
            <h2>Kind words</h2>
            <blockquote className="quote">
              <p>“{p.quote.text}”</p>
              <cite>{p.quote.by}</cite>
            </blockquote>
          </section>
        )}
      </div>

      {gallery.length > 0 && (
        <div className={`gallery ${gallery.length > 1 ? 'two' : 'one'}`}>
          {gallery.map((g, i) => (
            <figure key={i}>
              <AssetSlot src={g.src} type={g.type} ratio={g.ratio} hint={g.hint} alt={g.caption} poster={g.poster} controls={!!g.controls} />
              {g.caption && <figcaption className="figcap">{g.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {next && next.slug !== p.slug && (
        <div className="next-project">
          <span className="label">Next</span>
          <a href={href.project(next.slug)} data-cursor="case-study">{next.title} <span style={{ color: 'var(--ink-25)' }}>/</span> <span style={{ color: 'var(--ink-45)' }}>{next.tag}</span> →</a>
        </div>
      )}
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
}
