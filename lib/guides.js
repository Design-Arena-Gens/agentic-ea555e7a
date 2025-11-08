import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const guidesDir = path.join(process.cwd(), 'content', 'guides');

function calcReadingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export async function getGuideSlugs() {
  return fs.readdirSync(guidesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getAllGuidesMeta() {
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.md'));
  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(guidesDir, file), 'utf8');
    const { data, content: body } = matter(content);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      updated: data.updated || '',
      readingTime: calcReadingTime(body),
      order: data.order ?? 999,
    };
  });
  return items.sort((a, b) => a.order - b.order);
}

export async function getGuideBySlug(slug) {
  const md = fs.readFileSync(path.join(guidesDir, `${slug}.md`), 'utf8');
  const { data, content } = matter(md);
  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    updated: data.updated || '',
    html: htmlContent,
    readingTime: calcReadingTime(content),
  };
}
