import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { SITE_URL, publicRoutes } from '../src/utils/seo.js';

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  for (const route of publicRoutes) {
    const { content, head, language } = await render(route);
    const html = template.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n${head}\n<!--seo-end-->`)
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
      .replace('<html lang="he" dir="rtl">', `<html lang="${language}" dir="${language === 'he' ? 'rtl' : 'ltr'}">`);
    const directory = new URL(`../dist${route === '/' ? '/' : `${route}/`}`, import.meta.url);
    await mkdir(directory, { recursive: true });
    await writeFile(new URL('index.html', directory), html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map(route => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap);
  await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Prerendered ${publicRoutes.length} localized pages, sitemap.xml and robots.txt for ${SITE_URL}.`);
} finally { await server.close(); }
