import { useState } from 'react';
import { SERIES } from '../motion/tableqa';

/* Rich blocks for case studies: { type: 'methods' | 'duel' | 'bars' | 'stats' | 'table' | 'figure' }. */
export default function CaseBlock({ block }) {
  if (block.type === 'methods') return <Methods items={block.items} />;
  if (block.type === 'duel') return <Duel {...block} />;
  if (block.type === 'bars') return <JudgeChart />;
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

/* ── LLM-as-a-Judge results, by model × method, with/without metadata ── */
const METHODS = [
  { id: 'table', name: 'LLM-Table', color: SERIES.table },
  { id: 'experts', name: 'Multi-Experts', color: SERIES.experts },
  { id: 'chain', name: 'Chain-of-Tables', color: SERIES.chain },
];
const JUDGE = [
  { model: 'Gemma 2B', base: [20.7, 29.9, 65.1], meta: [17.3, 28.8, 62.4] },
  { model: 'Gemma 3n', base: [53.2, 51.6, 67.2], meta: [51.7, 52.3, 71.7] },
  { model: 'Mistral 7B', base: [56.5, 48.5, 71.5], meta: [55.3, 50.2, 73.2] },
  { model: 'GPT-4o-mini', base: [73.3, 68.3, 74.1], meta: [73.0, 74.0, 80.4] },
];

function JudgeChart() {
  const [meta, setMeta] = useState(false);
  const [tip, setTip] = useState(null);
  const [table, setTable] = useState(false);
  const key = meta ? 'meta' : 'base';

  return (
    <div className="bench">
      <div className="bench-controls">
        <div className="seg" role="group" aria-label="Prompt">
          <button className={!meta ? 'on' : ''} onClick={() => setMeta(false)} aria-pressed={!meta}>Without metadata</button>
          <button className={meta ? 'on' : ''} onClick={() => setMeta(true)} aria-pressed={meta}>With metadata</button>
        </div>
        <button className="bench-table-btn" onClick={() => setTable((v) => !v)} aria-expanded={table}>{table ? 'Show chart' : 'Show table'}</button>
      </div>
      <div className="bench-legend">
        {METHODS.map((m) => <span key={m.id}><i style={{ background: m.color }} />{m.name}</span>)}
      </div>

      {table ? (
        <DataTable
          caption={`LLM-as-a-Judge, mean score /100 (${meta ? 'with' : 'without'} metadata)`}
          head={['Model', ...METHODS.map((m) => m.name)]}
          rows={JUDGE.map((g) => [g.model, ...g[key].map((v) => v.toFixed(1))])}
        />
      ) : (
        <div className="bench-plot" onMouseLeave={() => setTip(null)}>
          <div className="bench-axis" aria-hidden>
            {[100, 75, 50, 25, 0].map((v) => <span key={v} style={{ bottom: `${v}%` }}><em>{v}</em></span>)}
          </div>
          <div className="bench-groups">
            {JUDGE.map((g, gi) => (
              <div className="bench-group" key={g.model}>
                <div className="bench-bars">
                  {g[key].map((v, mi) => {
                    const m = METHODS[mi];
                    const on = tip && tip.g === gi && tip.m === mi;
                    return (
                      <div
                        key={m.id}
                        className={`bench-slot ${tip && !on ? 'dim' : ''}`}
                        onMouseEnter={() => setTip({ g: gi, m: mi })}
                        onFocus={() => setTip({ g: gi, m: mi })}
                        onBlur={() => setTip(null)}
                        tabIndex={0}
                        aria-label={`${g.model}, ${m.name}: ${v.toFixed(1)}`}
                      >
                        <div className="bench-bar" style={{ height: `${v}%`, background: m.color }}>
                          {mi === 2 && <span className="bench-val">{v.toFixed(1)}</span>}
                        </div>
                        {on && (
                          <div className={`bench-tip ${gi === JUDGE.length - 1 ? 'left' : ''}`} style={{ bottom: `calc(${v}% + 10px)` }}>
                            <p><i style={{ background: m.color }} />{m.name}</p>
                            <p className="tv">{v.toFixed(1)}<span> / 100</span></p>
                            <p className="tm">{g.model} · {meta ? 'with' : 'no'} metadata</p>
                            <p className="tm">{meta ? `${(v - g.base[mi]) >= 0 ? '+' : ''}${(v - g.base[mi]).toFixed(1)} vs without` : `LLM-Table baseline ${g.base[0].toFixed(1)}`}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="bench-name">{g.model}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="figcap">LLM-as-a-Judge mean score on 1,000 questions. Switch the metadata prompt on and off to compare.</p>
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
