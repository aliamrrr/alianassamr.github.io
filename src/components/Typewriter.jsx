/* Adapted from 21st.dev/r/danielpetho/typewriter */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({
  text,
  speed        = 52,
  initialDelay = 300,
  waitTime     = 2200,
  deleteSpeed  = 28,
  loop         = true,
  style        = {},
  showCursor   = true,
  cursorChar   = '_',
  cursorStyle  = {},
}) {
  const [displayText,      setDisplayText]      = useState('');
  const [currentIndex,     setCurrentIndex]     = useState(0);
  const [isDeleting,       setIsDeleting]       = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    let timeout;
    const currentText = texts[currentTextIndex];

    const tick = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false);
          if (currentTextIndex === texts.length - 1 && !loop) return;
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
          setCurrentIndex(0);
        } else {
          timeout = setTimeout(() => setDisplayText(prev => prev.slice(0, -1)), deleteSpeed);
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev + currentText[currentIndex]);
            setCurrentIndex(prev => prev + 1);
          }, speed);
        } else if (texts.length > 1) {
          timeout = setTimeout(() => setIsDeleting(true), waitTime);
        }
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(tick, initialDelay);
    } else {
      tick();
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, displayText, isDeleting, texts, currentTextIndex, loop, speed, deleteSpeed, waitTime, initialDelay]);

  return (
    <span style={{ display: 'inline', ...style }}>
      {displayText}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, repeat: Infinity, repeatDelay: 0.45, repeatType: 'reverse' }}
          style={{ marginLeft: 2, ...cursorStyle }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}
