import { useRef } from 'react';
import { href } from '../hooks/useRoute';
import { useCanvasLoop } from '../motion/useCanvasLoop';
import { KS, KPAL, flip, sprM, clamp, easeOut, R, C, reduce } from '../motion/engine';

const S = 3, GW = 72, GH = 40;
const GOAL = { x: 8, y: 6, w: 56, h: 26 };

/* 404: a tiny penalty shootout. Click a corner of the goal to shoot; the keeper guesses. */
export default function NotFound() {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const resRef = useRef(null);
  const g = useRef({ you: 0, kp: 0, shots: 0, state: 'idle', t0: 0, tx: 0, ty: 0, dive: 0, goal: false, lastUser: -1e9, lastAuto: 0 });

  const setText = (el, t, color) => { if (el && el.textContent !== t) el.textContent = t; if (el && color) el.style.color = color; };

  const shoot = (tx, ty, user) => {
    const s = g.current;
    if (s.state !== 'idle') return;
    if (user) s.lastUser = performance.now();
    if (s.shots >= 5) { s.you = 0; s.kp = 0; s.shots = 0; }
    s.tx = clamp(tx, GOAL.x + 2, GOAL.x + GOAL.w - 3); s.ty = clamp(ty, GOAL.y + 2, GOAL.y + GOAL.h - 3);
    s.state = 'shot'; s.t0 = performance.now();
    s.dive = Math.floor(Math.random() * 3) - 1;
    const col = s.tx < GOAL.x + GOAL.w / 3 ? -1 : s.tx > GOAL.x + GOAL.w * 2 / 3 ? 1 : 0;
    s.goal = !(col === s.dive && (col !== 0 || s.ty > GOAL.y + 8));
  };

  useCanvasLoop(canvasRef, (ctx, w, h, now) => {
    const s = g.current;
    ctx.clearRect(0, 0, w, h);
    const px = (x, y, w2, h2, col) => { ctx.fillStyle = col; ctx.fillRect(R(x) * S, R(y) * S, w2 * S, h2 * S); };
    for (let y = GOAL.y + 2; y < GOAL.y + GOAL.h; y++) for (let x = GOAL.x + 2; x < GOAL.x + GOAL.w - 1; x++) if ((x + y) % 3 === 0) px(x, y, 1, 1, '#DDE3E8');
    px(GOAL.x - 2, GOAL.y - 2, GOAL.w + 4, 2, C.ink); px(GOAL.x - 2, GOAL.y, 2, GOAL.h, C.ink); px(GOAL.x + GOAL.w, GOAL.y, 2, GOAL.h, C.ink); px(0, GOAL.y + GOAL.h, GW, 1, '#C3CAD1');
    let kx = 33, ky = GOAL.y + GOAL.h - 8, kspr = KS.stand, bx = 35, by = GH - 3;

    if (s.state === 'idle') {
      setText(scoreRef.current, `You ${s.you}-${s.kp} Keeper · shot ${Math.min(5, s.shots + 1)}/5`);
      if (!reduce && now - s.lastUser > 6000 && now - s.lastAuto > 2800) { s.lastAuto = now; shoot(GOAL.x + 4 + Math.random() * (GOAL.w - 8), GOAL.y + 3 + Math.random() * (GOAL.h - 8), false); }
    }
    if (s.state === 'shot') {
      const k = clamp((now - s.t0) / 520, 0, 1); const kk = easeOut(k);
      bx = 35 + (s.tx - 35) * kk; by = (GH - 3) + (s.ty - (GH - 3)) * kk;
      const dk = clamp((now - s.t0 - 80) / 380, 0, 1);
      if (s.dive === 0) { kspr = KS.jump; ky = GOAL.y + GOAL.h - 8 - dk * 5; }
      else { kspr = s.dive < 0 ? KS.dive : flip(KS.dive); kx = 33 + s.dive * dk * 16 - (s.dive < 0 ? 6 : 0); ky = GOAL.y + 10 + dk * 6; }
      if (k >= 1) {
        s.state = 'result'; s.t0 = now; s.shots++; if (s.goal) s.you++; else s.kp++;
        setText(resRef.current, s.goal ? 'GOAL!' : 'Saved.', s.goal ? C.red : C.green);
        setText(scoreRef.current, `You ${s.you}-${s.kp} Keeper`);
      }
    }
    if (s.state === 'result') {
      kspr = s.dive === 0 ? KS.jump : s.dive < 0 ? KS.dive : flip(KS.dive);
      kx = 33 + s.dive * 16 - (s.dive < 0 ? 6 : 0); ky = s.dive === 0 ? GOAL.y + GOAL.h - 13 : GOAL.y + 16;
      bx = s.goal ? s.tx : kx + 3; by = s.goal ? s.ty : ky + 2;
      if (now - s.t0 > 1100) {
        s.state = 'idle';
        setText(resRef.current, s.shots >= 5 ? (s.you > s.kp ? 'You win the shootout.' : 'The keeper wins this one.') : '', C.ink);
      }
    }
    sprM(ctx, kspr, R(kx) * S, R(ky) * S, S, KPAL);
    px(bx - 1, by - 1, 2, 2, C.ink); ctx.fillStyle = '#fff'; ctx.fillRect(R(bx - 1) * S, R(by - 1) * S, S, S);
  });

  const onClick = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    shoot((e.clientX - r.left) / S, (e.clientY - r.top) / S, true);
  };

  return (
    <div className="notfound">
      <canvas
        ref={canvasRef}
        className="penalty"
        style={{ width: GW * S, height: GH * S }}
        onClick={onClick}
        data-cursor-text="Shoot here"
        role="img"
        aria-label="Penalty mini-game: click inside the goal to shoot"
      />
      <h1 className="hero-headline">Offside.</h1>
      <p className="value">This page doesn't exist. Take a penalty while you're here.</p>
      <p className="score" ref={scoreRef} />
      <p className="score res" ref={resRef} aria-live="polite" />
      <a className="back-link" href={href.work}>← Back to Work</a>
    </div>
  );
}
