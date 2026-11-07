
/* Rich blocks for case studies: { type: 'methods' | 'duel' | 'stats' | 'table' | 'figure' }. */
export default function CaseBlock({ block }) {
  if (block.type === 'methods') return <Methods items={block.items} />;
  if (block.type === 'duel') return <Duel {...block} />;
  if (block.type === 'stats') return <Stats items={block.items} />;
  if (block.type === 'table') return <DataTable {...block} />;
  if (block.type === 'figure') return <Figure {...block} />;
  return null;
}

/* ── Methods: what each one hands to the LLM, as a tiny table ── */
const GRID = { rows: 4, cols: 3 };
const KEEP = {
  'LLM-Table': () => true,
  'Multi-Experts': () => true,
  'Chain-of-Tables': (r, c) => r === 2 && c < 2,
};

function MiniGrid({ name }) {
  const keep = KEEP[name] || (() => true);
  return (
    <div className="mini-grid" aria-hidden style={{ gridTemplateColumns: `repeat(${GRID.cols}, 1fr)` }}>
      {Array.from({ length: GRID.rows * GRID.cols }, (_, i) => {
        const r = Math.floor(i / GRID.cols), c = i % GRID.cols;
        return <span key={i} className={`${r === 0 ? 'h' : ''} ${keep(r, c) ? 'on' : ''}`} style={{ '--d': `${(r * GRID.cols + c) * 40}ms` }} />;
      })}
    </div>
  );
}

function Methods({ items }) {
  return (
    <div className="methods">
      {items.map((m, i) => (
        <div className={`method ${m.note === 'winner' ? 'win' : ''}`} key={m.name}>
          <div className="method-top">
            <span className="mono">{String(i + 1).padStart(2, '0')} · {m.note}</span>
            {m.name === 'Multi-Experts' && <span className="router" aria-hidden>{[0, 1, 2, 3, 4].map((k) => <i key={k} className={k === 2 ? 'on' : ''} />)}</span>}
          </div>
          <MiniGrid name={m.name} />
          <p className="method-name">{m.name}</p>
          <p className="method-text">{m.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Duel: same answer, two metrics ── */
function Duel({ reference, generated, scores }) {
  return (
    <div className="duel">
      <div className="duel-texts">
        <div><p className="mono">reference</p><p className="duel-q">{reference}</p></div>
        <div><p className="mono">generated</p><p className="duel-q">{generated}</p></div>
      </div>
      <div className="duel-scores">
        {scores.map((s, i) => (
          <div key={s.metric} className={`duel-score ${i ? 'judge' : ''}`}>
            <p className="mono">{s.metric}</p>
            <p className="duel-v">{s.value}</p>
            <p className="duel-verdict">{i ? <span className="mark" aria-hidden /> : null}{s.verdict}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats ── */
function Stats({ items }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <p className="stat-v">{s.value}</p>
          <p className="stat-l">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Table ── */
function DataTable({ caption, head, rows }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        {caption && <caption>{caption}</caption>}
        <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => <td key={i} className={i && /^[−+\-\d.]/.test(c) ? 'num' : ''}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Figure: a diagram, opens full size in a new tab ── */
function Figure({ src, alt, caption, width, height }) {
  return (
    <figure className="case-figure">
      <a href={src} target="_blank" rel="noopener noreferrer" data-cursor-text="Open full size">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      {caption && <figcaption className="figcap">{caption}</figcaption>}
    </figure>
  );
}
