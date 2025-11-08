import { getGuideBySlug, getGuideSlugs } from '../../../lib/guides';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function GuidePage({ params }) {
  const guide = await getGuideBySlug(params.slug);
  return (
    <article>
      <h1>{guide.title}</h1>
      <div className="small" style={{marginBottom:16}}>
        {guide.readingTime} ? Updated {guide.updated}
      </div>
      <div className="hr" />
      <div className="content" dangerouslySetInnerHTML={{ __html: guide.html }} />
    </article>
  );
}
