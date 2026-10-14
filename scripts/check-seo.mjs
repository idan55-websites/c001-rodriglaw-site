import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SITE_URL } from '../src/utils/seo.js';
import { baseRoutes, getRouteInfo, languages, localizePath, publicRoutes } from '../src/utils/siteRoutes.js';
import { businessNames, englishNames, hebrewNames, personNames } from '../src/utils/businessIdentity.js';

const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
assert.equal(publicRoutes.length, baseRoutes.length * languages.length);
assert.equal((sitemap.match(/<loc>/g) || []).length, publicRoutes.length);
for (const route of publicRoutes) {
  const { language, basePath } = getRouteInfo(route);
  const html = await readFile(new URL(`../dist${route === '/' ? '' : route}/index.html`, import.meta.url), 'utf8');
  assert.ok(html.includes(`<html lang="${language}" dir="${language === 'he' ? 'rtl' : 'ltr'}">`), `HTML language: ${route}`);
  assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${route}" />`), `Canonical: ${route}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/rel="icon"/g) || []).length, 1);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(html.includes('<meta name="robots" content="index, follow, max-image-preview:large" />'));
  assert.ok(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`), `Sitemap: ${route}`);
  for (const alternate of languages) {
    assert.ok(html.includes(`<link rel="alternate" hreflang="${alternate}" href="${SITE_URL}${localizePath(basePath, alternate)}" />`), `Reciprocal alternate ${route}: ${alternate}`);
  }
  assert.ok(html.includes(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${basePath}" />`));
  if (route !== '/') assert.ok(config.rewrites.some(rewrite => rewrite.source === route && rewrite.destination === `${route}/index.html`), `Production route: ${route}`);
  const schema = JSON.parse(html.match(/<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const office = schema['@graph'].find(node => node['@type'] === 'LegalService');
  for (const name of [...personNames, ...businessNames]) assert.ok(office.alternateName.includes(name), `Name ${route}: ${name}`);
  if (['/', '/about'].includes(basePath)) {
    const body = html.split('</head>')[1];
    const localizedNames = language === 'he' ? hebrewNames : englishNames;
    for (const name of localizedNames) assert.ok(body.includes(name), `Localized biography name ${route}: ${name}`);
    assert.ok(!body.includes('name-reference-alternates'), `No standalone name list: ${route}`);
    for (const names of [hebrewNames, englishNames]) assert.ok(!body.includes(names.join(' · ')), `No repeated name variants: ${route}`);
  }
  if (basePath === '/services') assert.equal(office.hasOfferCatalog.itemListElement.length, 2);
  assert.ok(!html.includes('seo.home.title'), `No untranslated SEO keys: ${route}`);
}
assert.equal(localizePath('/en/about#contacts', 'he'), '/about#contacts');
assert.equal(localizePath('/#contacts', 'he'), '/#contacts');
assert.equal(localizePath('/fr/privacy-policy?source=footer#cookies', 'en'), '/en/privacy-policy?source=footer#cookies');
console.log(`Verified ${publicRoutes.length} static pages: languages, canonicals, reciprocal hreflang, sitemap, route rewrites and name variants.`);
