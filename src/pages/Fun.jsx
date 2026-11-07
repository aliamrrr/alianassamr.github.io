import { useMemo, useRef, useState } from 'react';
import AssetSlot from '../components/AssetSlot';
import { funFilters, funItems } from '../data/content';
import { useBreakpoint, useChatSqueeze, columnCount, distribute } from '../hooks/useBreakpoint';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { LANT, sprM, clamp, easeInOut, R, reduce } from '../motion/engine';

function FunCard({ item }) {
  const body = (
    <div className="fun-card">
      <div className="fun-media">
        <AssetSlot src={item.src} type={item.type} poster={item.poster} ratio={item.ratio} hint={item.hint} fit={item.fit} alt={item.title} />
        <div className="hover-veil" />
      </div>
      <div className="fun-caption">
        <p className="d">{item.description}</p>
        <p className="g">{item.tag}</p>
      </div>
    </div>
  );

  if (!item.href) return <div data-cursor-text={item.cursorText || item.title} data-ctx={item.ctx}>{body}</div>;
  const external = item.href.startsWith('http');
  return (
    <a
      href={item.href}
      className="fun-link"
      data-cursor={item.cursor}
      data-ctx={item.ctx}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {body}
    </a>
  );
}

/* A small fanous hangs on a string above the filters, glides to the one you pick,
   swings to a stop and lights it with a warm cone of light. */
function LanternRail({ wrapRef, chipRefs, active, prev, since }) {
  const ref = useRef(null);
  const done = useRef('');
  useCanvasLoop(ref, (ctx, w, h, now) => {
    const key = `${active}|${since}|${w}`;
    if (done.current === key) return;               // settled: nothing changes, don't repaint
    if (reduce || now - since > 2400) done.current = key;
    ctx.clearRect(0, 0, w, h);
    const wrap = wrapRef.current; if (!wrap) return;
    const wr = wrap.getBoundingClientRect();
    const rect = (f) => { const el = chipRefs.current[f]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left - wr.left, y: r.top - wr.top, w: r.width, h: r.height }; };
    const r = rect(active), r0 = rect(prev) || r; if (!r) return;
    const e = reduce ? 9999 : now - since;
    const k = easeInOut(clamp(e / 620, 0, 1));
    const gx = r0.x + r0.w / 2 + (r.x + r.w / 2 - r0.x - r0.w / 2) * k;
    const settle = clamp((e - 620) / 1600, 0, 1);
    const sway = k < 1 ? (r.x > r0.x ? -4 : 4) * Math.sin(k * Math.PI) : Math.sin((e - 620) / 140) * 4 * (1 - settle);
    const lx = R(gx - 7.5 + sway), ly = 10;
    ctx.strokeStyle = 'rgba(50,64,79,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 2.5); ctx.lineTo(w, 2.5); ctx.stroke();
    ctx.strokeStyle = 'rgba(58,42,18,.8)'; ctx.beginPath(); ctx.moveTo(R(gx) + .5, 3); ctx.lineTo(lx + 7.5, ly); ctx.stroke();
    if (k >= 1) {
      const cone = ctx.createLinearGradient(0, ly + 20, 0, r.y + r.h + 6);
      cone.addColorStop(0, `rgba(255,214,120,${.5 * (.6 + settle * .4)})`); cone.addColorStop(1, 'rgba(255,214,120,0)');
      ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(lx + 4, ly + 19); ctx.lineTo(lx + 11, ly + 19); ctx.lineTo(r.x + r.w + 4, r.y + r.h + 6); ctx.lineTo(r.x - 4, r.y + r.h + 6); ctx.fill();
    }
    sprM(ctx, k >= 1 ? LANT.hot : LANT.idle, lx, ly, 1, LANT.pal);
  });
  return <canvas ref={ref} className="lantern-rail" aria-hidden />;
}

export default function Fun({ chatOpen }) {
  const bp = useBreakpoint();
  const squeezed = useChatSqueeze(chatOpen);
  const [filter, setFilter] = useState('all');
  const [prev, setPrev] = useState('all');
  const [since, setSince] = useState(() => performance.now());
  const wrapRef = useRef(null);
  const chipRefs = useRef({});

  const choose = (f) => {
    if (f === filter) return;
    setPrev(filter); setFilter(f); setSince(performance.now());
  };

  const columns = useMemo(() => {
    const list = filter === 'all' ? funItems : funItems.filter((i) => i.categories.includes(filter));
    return distribute(list, columnCount(bp, squeezed));
  }, [bp, squeezed, filter]);

  return (
    <div className="fun">
      <div className="filters-wrap" ref={wrapRef}>
        <LanternRail wrapRef={wrapRef} chipRefs={chipRefs} active={filter} prev={prev} since={since} />
        <div className="filters" role="tablist" aria-label="Filter">
          {funFilters.map((f) => (
            <button
              key={f}
              ref={(el) => { chipRefs.current[f] = el; }}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`filter${filter === f ? ' on' : ''}`}
              onClick={() => choose(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="masonry" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((col, i) => (
          <div className="masonry-col" key={i}>
            {col.map((item) => <FunCard key={item.title} item={item} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
