import { motion } from 'framer-motion';
import AssetSlot from '../components/AssetSlot';
import { aboutPhotos, profile, roles, socials } from '../data/content';
import { href } from '../hooks/useRoute';
import { useChatSqueeze } from '../hooks/useBreakpoint';

const aliDecodes = socials.find((s) => s.label === 'Ali Decodes');

const fade = (delay) => ({
  initial: { opacity: 0, filter: 'blur(2px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.2, ease: 'easeOut', delay },
});

export default function About({ chatOpen }) {
  // reference: with the chat open and <1280px usable, the intro grid becomes 1.5fr / 1fr
  const squeezed = useChatSqueeze(chatOpen, 1680);

  return (
    <div className="about">
      <motion.div {...fade(0.1)} className={`about-intro${squeezed ? ' squeezed' : ''}`}>
        <div className="about-bio">
          <p>I'm an AI engineer working on GenAI and agentic systems, with the AI × SmartOps team at Sopra Steria Next.</p>
          <p>
            I spend most of my time around the model: the harness, the evals, and what happens after the demo.
          </p>
          <p>
            Outside of work, I decode football with data at{' '}
            <a href={aliDecodes.href} target="_blank" rel="noopener noreferrer" data-cursor="linkedin">Ali Decodes</a>,
            build things at <a href={href.fun}>hackathons</a>, and cheer loudly for Morocco.
          </p>
          <p>
            Always up for a conversation about agents, football analytics, or both.{' '}
            <a href={`mailto:${profile.email}`} data-cursor="email" data-ctx="tea">Say hi</a>!
          </p>
        </div>

        <div className="about-spacer" aria-hidden />

        <div className="roles">
          {roles.map((r) => (
            <div className="role" key={r.company}>
              <p className={`date${r.date === 'Now' ? ' now' : ''}`}>{r.date}</p>
              <div className="who">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="company">{r.company}</a>
                ) : (
                  <p className="company">{r.company}</p>
                )}
                <p className="title">{r.title}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fade(0.2)}>
        <div className="photo-grid">
          {aboutPhotos.flatMap((group, gi) =>
            group.photos.map((photo, pi) => (
              <div className="photo-cell" key={`${gi}-${pi}`}>
                {pi === 0 ? (
                  <div className="photo-label">
                    <span>0{gi + 1}</span>
                    <span className="slash">/</span>
                    <span>{group.label}</span>
                  </div>
                ) : (
                  <div className="photo-label" style={{ visibility: 'hidden' }}>&nbsp;</div>
                )}
                <div data-cursor-text={photo.cursor}>
                  <AssetSlot src={photo.src} ratio={photo.ratio} hint={photo.hint} alt={photo.alt || photo.cursor} />
                </div>
              </div>
            )),
          )}
        </div>
      </motion.div>
    </div>
  );
}
