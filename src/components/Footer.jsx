import { socials, profile } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="links">
        {socials.map((s) => {
          const external = s.href.startsWith('http') || s.href.endsWith('.pdf');
          return (
            <a
              key={s.label}
              href={s.href}
              data-cursor={s.cursor}
              data-ctx={s.cursor === 'email' ? 'tea' : undefined}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {s.label}
            </a>
          );
        })}
      </div>
      <span className="fine">© {new Date().getFullYear()} {profile.name} · Nantes ↔ Meknes</span>
    </footer>
  );
}
