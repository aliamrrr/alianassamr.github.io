import { useEffect, useState } from 'react';
import { Croissant, TeaPour } from './Pixel';

// Nantes (France) and Meknes (Morocco).
// Morocco is pinned to UTC+0 on purpose: browsers ship different tz data for Africa/Casablanca
// (some say +01, some +00), so the zone name gave visitors different times. Change MOROCCO_TZ if Morocco moves again.
const MOROCCO_TZ = 'Etc/GMT';
const CITIES = [
  { city: 'Nantes', tz: 'Europe/Paris', Icon: Croissant, hint: 'Croissant time in Nantes' },
  { city: 'Meknes', tz: MOROCCO_TZ, Icon: TeaPour, hint: 'Atay time in Meknes' },
];

const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });

export default function TopClocks() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="top-clocks">
      {CITIES.map(({ city, tz, Icon, hint }) => (
        <div className="top-clock" key={city} data-cursor-text={hint}>
          <Icon scale={2} />
          <span className="city">{city}</span>
          <time className="t">{fmt(tz).format(now)}</time>
        </div>
      ))}
    </div>
  );
}
