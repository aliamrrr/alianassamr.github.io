import { useEffect, useState } from 'react';

// Hash routing keeps GitHub Pages happy (no server rewrites needed).
//   #/          → work
//   #/fun       → fun
//   #/about     → about
//   #/journal   → journal (blog & sharing)
//   #/work/slug → project case study
//   anything else → pixel 404
function parse() {
  const h = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const [a, b, ...rest] = h.split('/');
  if (h === '' || (a === 'work' && !b)) return { page: 'work', key: 'work' };
  if (a === 'work' && b && rest.length === 0) return { page: 'project', slug: b, key: `work/${b}` };
  if ((a === 'fun' || a === 'about' || a === 'journal') && !b) return { page: a, key: a };
  return { page: 'notfound', key: `404:${h}` };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const href = {
  work: '#/',
  fun: '#/fun',
  about: '#/about',
  journal: '#/journal',
  project: (slug) => `#/work/${slug}`,
};
