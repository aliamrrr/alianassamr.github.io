import { useEffect, useState } from 'react';

// Same breakpoints as the reference: desktop ≥1200, tablet ≥768, else mobile.
const get = () =>
  window.matchMedia('(min-width:1200px)').matches ? 'desktop'
    : window.matchMedia('(min-width:768px)').matches ? 'tablet' : 'mobile';

export function useBreakpoint() {
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const on = () => setBp(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return bp;
}

// Chat dock eats 400px — the reference drops to 2 columns when it's open below 1400px.
export function useChatSqueeze(chatOpen, below = 1400) {
  const [squeezed, setSqueezed] = useState(false);
  useEffect(() => {
    const on = () => setSqueezed(chatOpen && window.innerWidth < below);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [chatOpen, below]);
  return squeezed;
}

export const columnCount = (bp, squeezed) => (bp === 'mobile' ? 1 : bp === 'tablet' || squeezed ? 2 : 4);

// Round-robin into columns (keeps reading order left→right, top→bottom).
export function distribute(items, n) {
  const cols = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}
