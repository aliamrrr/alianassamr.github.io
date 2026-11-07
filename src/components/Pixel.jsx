import { useEffect, useMemo, useState } from 'react';
import art from '../data/pixelArt.json';

/*
 * Tiny pixel-art renderer. Art lives in src/data/pixelArt.json as rows of
 * characters ('.' = empty, other chars = palette keys). Each frame is drawn as
 * crisp SVG rects (horizontal runs merged). Respects prefers-reduced-motion.
 */

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function toRects(rows, colors) {
  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === '.') { x += 1; continue; }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end += 1;
      rects.push({ x, y, w: end - x, fill: colors[ch] ?? art.palette[ch] ?? 'currentColor' });
      x = end;
    }
  });
  return rects;
}

/**
 * @param frames   array of frames (each an array of strings)
 * @param scale    px per pixel
 * @param fps      base frame rate
 * @param holds    { [frameIndex]: multiplier } — how many ticks a frame stays
 * @param still    frame shown when motion is reduced (default: last)
 * @param colors   palette overrides, e.g. { X: 'currentColor' }
 */
export function PixelArt({ frames, scale = 2, fps = 4, holds = {}, still, colors = {}, label, className, style }) {
  const animate = frames.length > 1 && !reducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!animate) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % frames.length), (holds[i] || 1) * (1000 / fps));
    return () => clearTimeout(t);
  }, [i, animate, fps, frames.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const idx = animate ? i : (still ?? frames.length - 1);
  const frame = frames[idx];
  const rects = useMemo(() => toRects(frame, colors), [frame, colors]);
  const w = Math.max(...frames[0].map((r) => r.length));
  const h = frames[0].length;

  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects.map((r, k) => <rect key={k} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />)}
    </svg>
  );
}

/** Moroccan fanous lantern, 15×22. Dim at rest, lit (glass glows, white core) when `lit`. */
export function Lantern({ lit = false, scale = 1, className, style }) {
  return <PixelArt frames={[lit ? art.lantern.hot : art.lantern.idle]} scale={scale} colors={art.lantern.palette} className={className} style={style} />;
}

/** 7×11 mini lantern for small UI marks (pills, chat header, buttons). */
export function MiniLantern({ lit = true, scale = 1, className, style }) {
  return <PixelArt frames={[lit ? art.lantern.miniHot : art.lantern.miniIdle]} scale={scale} colors={art.lantern.palette} className={className} style={style} />;
}

/** Berrad pouring atay into a glass; mint leaf + steam at the end. */
export function TeaPour({ scale = 2 }) {
  return <PixelArt frames={art.tea} scale={scale} fps={6} holds={{ 0: 4, 6: 3, 7: 3 }} colors={art.teaPalette} label="Teapot pouring mint tea" />;
}

/** A steaming glass of atay. */
export function TeaGlass({ scale = 2, animated = true }) {
  return <PixelArt frames={animated ? art.cup : [art.cup[0]]} scale={scale} fps={2.5} />;
}

/* Croissant for Nantes (22×16, same box as the teapot) — a sparkle twinkles on the glaze. */
export function Croissant({ scale = 2 }) {
  return <PixelArt frames={art.croissant} scale={scale} fps={9} holds={{ 0: 36 }} still={0} colors={art.croissantPalette} label="Croissant" />;
}

/** Keeper dives the wrong way, ball goes top corner. */
export function KeeperScene({ scale = 6 }) {
  return (
    <PixelArt
      frames={art.keeper}
      scale={scale}
      fps={4}
      holds={{ 0: 4, 1: 2, 2: 1, 3: 2, 4: 8 }}
      label="Pixel goalkeeper diving the wrong way while the ball goes into the top corner"
    />
  );
}
