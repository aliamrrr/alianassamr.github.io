import { useEffect, useRef, useState } from 'react';
import ZelligeVeil from './ZelligeVeil';
import { reduce } from '../motion/engine';

/**
 * Media slot. With `src` → image/video, revealed through zellige tiles once loaded.
 * `controls` → a playable film (with sound, poster, no autoplay) instead of a silent loop.
 * Without `src` → grey "[INSERT ASSET HERE]" placeholder.
 */
export default function AssetSlot({ src, type, ratio = '16 / 9', hint, alt = '', pos, fit, poster, controls = false, className = '' }) {
  const isVideo = type === 'video' || /\.(mp4|webm|mov)$/i.test(src || '');
  const [loaded, setLoaded] = useState(false);
  const [veil, setVeil] = useState(!reduce);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el && (el.complete || el.readyState >= 2)) setLoaded(true);
  }, [src]);

  // fit="contain": show the whole image (logos), centred with breathing room on white
  const mediaStyle = { ...(pos ? { objectPosition: pos } : {}), ...(fit === 'contain' ? { objectFit: 'contain', padding: '0 16%', background: '#fff' } : {}) };

  return (
    <div className={`asset inset-border ${className}`} style={{ aspectRatio: String(ratio) }}>
      {src ? (
        <>
          {isVideo ? (
            controls ? (
              <video ref={ref} src={src} poster={poster} controls playsInline preload="metadata" style={mediaStyle}
                onLoadedMetadata={() => setLoaded(true)} />
            ) : (
              <video ref={ref} src={src} poster={poster} autoPlay muted loop playsInline style={mediaStyle} onLoadedData={() => setLoaded(true)} />
            )
          ) : (
            <img ref={ref} src={src} alt={alt} loading="lazy" draggable={false} style={mediaStyle} onLoad={() => setLoaded(true)} />
          )}
          {veil && <ZelligeVeil loaded={loaded} onDone={() => setVeil(false)} />}
        </>
      ) : (
        <div className="asset-empty">
          <span className="tag">[INSERT ASSET HERE]</span>
          {hint && <span className="hint">{hint}</span>}
        </div>
      )}
    </div>
  );
}
