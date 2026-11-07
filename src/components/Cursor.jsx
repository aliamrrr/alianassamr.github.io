import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content';
import { TeaGlass } from './Pixel';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { drawBase, drawBall, velocity, C } from '../motion/engine';

/*
 * Custom cursor (fine pointers only).
 *  - default: a glass of atay with a thread of steam; over links it fills to the brim with a mint sprig
 *  - over football items ([data-ctx="ball"]): a pixel ball that rolls with the distance travelled
 *  - over contact / AliLLM ([data-ctx="tea"]): the glass fills up, ready for a conversation
 *  - in text fields: a thin red caret
 * A typed label (“View project”, “Copy email”…) follows the pointer.
 */

const BREWING = 'Still brewing…';
const INTERACTIVE =
  "a[href], button, [role='button'], summary, label[for], select, input[type='submit'], input[type='checkbox'], " +
  "[data-cursor]:not([data-cursor='coming-soon']), [data-cursor-text]";
const TEXT_INPUT = "input:not([type='submit']):not([type='checkbox']), textarea, [contenteditable='true']";
const LABELS = {
  'coming-soon': BREWING,
  'case-study': 'View project',
  site: 'View website',
  github: 'View on GitHub',
  resume: 'Open resume',
  linkedin: 'View on LinkedIn',
};
const easeOut = (t) => 1 - (1 - t) ** 3;
const typeDuration = (s) => Math.min(40 + 12 * s.length, 160);

function labelFor(el, copied) {
  const withText = el.closest('[data-cursor-text]');
  if (withText) return withText.getAttribute('data-cursor-text') || '';
  const c = el.closest('[data-cursor]');
  if (!c) return '';
  const kind = c.getAttribute('data-cursor');
  if (kind === 'email') return copied ? 'Email copied!' : 'Copy email';
  return LABELS[kind] || '';
}

function CursorCanvas({ live }) {
  const ref = useRef(null);
  const st = useRef({});
  // small canvas (160×170) that follows the pointer; drawing happens in page coordinates
  const OX = 80, OY = 110;
  useCanvasLoop(ref, (ctx, w, h, now, dt) => {
    const L = live.current; const s = st.current;
    ctx.clearRect(0, 0, w, h);
    if (!L.inside) { s.px = undefined; return; }
    const { x, y } = L.pos;
    const ox = Math.round(x) - OX, oy = Math.round(y) - OY;
    ref.current.style.transform = `translate(${ox}px, ${oy}px)`;
    ctx.save(); ctx.translate(-ox, -oy);
    try { drawCursor(ctx, L, s, x, y, now, dt); } finally { ctx.restore(); }
  });
  return <canvas ref={ref} className="cursor-canvas" aria-hidden />;
}

function drawCursor(ctx, L, s, x, y, now, dt) {
  velocity(s, x, y, dt);
  if (L.mode === 'text') { ctx.fillStyle = C.red; ctx.fillRect(Math.round(x) - 1, Math.round(y) - 10, 2, 20); return; }
  if (L.ctx === 'ball') {
    s.u = (s.u || 0) + (s.bx === undefined ? 0 : (x - s.bx) / 2);
    s.v = (s.v || 0) + (s.by === undefined ? 0 : (y - s.by) / 2);
    s.bx = x; s.by = y;
    if (L.kick) { s.kick = now; L.kick = false; }
    let lift = L.mode === 'interactive' ? Math.abs(Math.sin(now / 170)) * 6 : 0;
    if (s.kick && now - s.kick < 380) lift = Math.max(lift, Math.sin((now - s.kick) / 380 * Math.PI) * 22);
    drawBall(ctx, s, x, y, lift);
    return;
  }
  s.bx = undefined; s.by = undefined;
  const hot = L.mode === 'interactive' || L.ctx === 'tea';
  drawBase('istikan', ctx, x, y, hot, L.down, now, s);
}

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [inside, setInside] = useState(false);
  const [target, setTarget] = useState('');
  const [shown, setShown] = useState('');
  const [preview, setPreview] = useState(null);
  const copiedRef = useRef(false);
  const shownRef = useRef('');
  shownRef.current = shown;
  const live = useRef({ pos: { x: -100, y: -100 }, inside: false, mode: 'default', ctx: null, down: false, kick: false });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle('has-custom-cursor', mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // typewriter in / out for the label
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const from = shownRef.current;
    if (!target && !from) return undefined;
    const d = typeDuration(target || from);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / d);
      setShown(target ? target.slice(0, Math.round(easeOut(p) * target.length)) : from.slice(0, Math.round((1 - easeOut(p)) * from.length)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  useEffect(() => {
    if (!enabled) return undefined;
    const L = live.current;
    const onMove = (e) => {
      L.pos = { x: e.clientX, y: e.clientY }; L.inside = true;
      setPos(L.pos); setInside(true);
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      L.mode = el.closest(TEXT_INPUT) ? 'text' : el.closest(INTERACTIVE) ? 'interactive' : 'default';
      L.ctx = el.closest('[data-ctx]')?.getAttribute('data-ctx') || null;
      const a = el.closest('a[data-preview]');
      setPreview(a ? a.getAttribute('data-preview') : null);
    };
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (!el.closest('[data-cursor="email"]')) copiedRef.current = false;
      setTarget(labelFor(el, copiedRef.current));
    };
    const onClick = async (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest('[data-cursor="coming-soon"]')) { e.preventDefault(); e.stopPropagation(); return; }
      if (el.closest('[data-cursor="email"]')) {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(profile.email);
          copiedRef.current = true;
          setTarget('Email copied!');
          setTimeout(() => { copiedRef.current = false; setTarget((t) => (t === 'Email copied!' ? 'Copy email' : t)); }, 3000);
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      }
    };
    const onDown = () => { L.down = true; if (L.ctx === 'ball') L.kick = true; };
    const onUp = () => { L.down = false; };
    const onLeave = () => { L.inside = false; setInside(false); };
    const onEnter = () => { L.inside = true; setInside(true); };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('click', onClick, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  const nearRight = pos.x > window.innerWidth - 260;
  const nearBottom = pos.y > window.innerHeight - 160;

  return (
    <>
      <CursorCanvas live={live} />
      <div className="cursor" aria-hidden style={{ transform: `translate(${pos.x + 15}px, ${pos.y - 12}px)`, opacity: inside ? 1 : 0 }}>
        {shown && (
          <span className="cursor-label">
            {target === BREWING && <TeaGlass scale={1.5} />}
            {shown}
          </span>
        )}
        {preview && (
          <div
            className="cursor-preview"
            style={{ left: nearRight ? 'auto' : 18, right: nearRight ? 18 : 'auto', top: nearBottom ? 'auto' : 18, bottom: nearBottom ? 18 : 'auto' }}
          >
            <img src={preview} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
