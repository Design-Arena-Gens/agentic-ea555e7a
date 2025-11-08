import Link from 'next/link';
import { getAllGuidesMeta } from '../../lib/guides';

export const dynamic = 'error';

export default async function Guides() {
  const guides = await getAllGuidesMeta();
  return (
    <div>
      <h1>Guides</h1>
      <p className="small">Quick primers focused on day-1 to day-30 mastery.</p>
      <div className="hr" />
      <ul className="list">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
                <div>
                  <strong>{g.title}</strong>
                  <div className="small">{g.description}</div>
                </div>
                <span className="badge">{g.readingTime}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
