import { businessNames, personNames } from './businessIdentity.js';
import { getRouteInfo, languages, localizePath } from './siteRoutes.js';
export { publicRoutes } from './siteRoutes.js';

// The production apex domain redirects to www; all indexing signals use that host.
export const SITE_URL = 'https://www.rodriglaw.com';
const pageKeys = {
  '/': ['home.heroTitle', 'home.heroIntro'],
  '/about': ['about.title', 'about.p1'],
  '/services': ['services.title', 'services.intro'],
  '/contact': ['contact.title', 'home.contactAddress'],
  '/privacy-policy': ['privacy.title', 'privacy.intro'],
  '/accessibility': ['accessibility.title', 'accessibility.intro'],
};
const seoKeys = { '/': 'home', '/about': 'about', '/services': 'services', '/contact': 'contact' };

function getServiceCatalog(t) {
  return {
    '@type': 'OfferCatalog', name: t('services.title'),
    itemListElement: ['legal', 'notary'].map(category => ({
      '@type': 'OfferCatalog', name: t(`services.${category}Title`),
      itemListElement: Object.values(t(`services.${category}Items`, { returnObjects: true })).map(name => ({
        '@type': 'Offer', itemOffered: { '@type': 'Service', name, provider: { '@id': `${SITE_URL}/#office` } },
      })),
    })),
  };
}

export function getSeo(pathname, t) {
  const { basePath: path, language: lang } = getRouteInfo(pathname);
  const keys = pageKeys[path];
  const seoKey = seoKeys[path];
  const title = seoKey ? t(`seo.${seoKey}.title`) : `${t(keys?.[0] || 'brand.name')} | ${t('brand.name')}`;
  const description = seoKey ? t(`seo.${seoKey}.description`) : `${t(keys?.[1] || 'home.heroIntro')} ${t('brand.name')}`;
  const url = `${SITE_URL}${localizePath(path, lang)}`;
  const alternates = languages.map(language => ({ language, url: `${SITE_URL}${localizePath(path, language)}` }));
  const name = 'מוריה רודריג – משרד עורכי דין ונוטריון';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LegalService', '@id': `${SITE_URL}/#office`, name,
        alternateName: [...personNames, ...businessNames], description: t('seo.home.description'),
        url: `${SITE_URL}/`, logo: `${SITE_URL}/brand-logo.png`, image: `${SITE_URL}/moria-portrait.jpeg`,
        telephone: '+972-54-622-5654', email: 'moria@rodriglaw.com',
        address: { '@type': 'PostalAddress', streetAddress: 'הסיבים 49', addressLocality: 'פתח תקווה', addressCountry: 'IL' },
        geo: { '@type': 'GeoCoordinates', latitude: 32.0831515, longitude: 34.8567889 },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '19:00' }],
        areaServed: { '@type': 'Country', name: 'Israel' },
        ...(path === '/services' ? { hasOfferCatalog: getServiceCatalog(t) } : {}),
      },
      { '@type': 'Person', '@id': `${SITE_URL}/#moria`, name: 'מוריה רודריג', alternateName: personNames.filter(name => name !== 'מוריה רודריג'),
        jobTitle: t('about.role'), worksFor: { '@id': `${SITE_URL}/#office` }, url: `${SITE_URL}${localizePath('/about', lang)}`, image: `${SITE_URL}/moria-portrait.jpeg`, knowsLanguage: ['he', 'en', 'fr', 'nl'] },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name,
        alternateName: personNames, publisher: { '@id': `${SITE_URL}/#office` }, inLanguage: ['he', 'en', 'fr', 'nl'] },
      { '@type': path === '/about' ? 'ProfilePage' : 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
        inLanguage: lang, isPartOf: { '@id': `${SITE_URL}/#website` }, about: [{ '@id': `${SITE_URL}/#office` }, { '@id': `${SITE_URL}/#moria` }],
        ...(path === '/about' ? { mainEntity: { '@id': `${SITE_URL}/#moria` } } : {}),
      },
    ],
  };
  return { title, description, url, lang, schema, alternates, indexable: Boolean(keys) };
}

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export function renderSeoHead(seo) {
  const locale = { he: 'he_IL', en: 'en_US', fr: 'fr_FR', nl: 'nl_NL' }[seo.lang] || 'he_IL';
  return `<title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${seo.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />
    <link rel="canonical" href="${escapeHtml(seo.url)}" />
    ${seo.indexable ? seo.alternates.map(alternate => `<link rel="alternate" hreflang="${alternate.language}" href="${escapeHtml(alternate.url)}" />`).join('\n    ') : ''}
    ${seo.indexable ? `<link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.alternates.find(alternate => alternate.language === 'he').url)}" />` : ''}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="מוריה רודריג – משרד עורכי דין ונוטריון" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(seo.url)}" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:image" content="${SITE_URL}/social-preview.jpg" />
    <meta property="og:image:alt" content="מוריה רודריג – משרד עורכי דין ונוטריון" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${SITE_URL}/social-preview.jpg" />
    <script id="site-structured-data" type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, '\\u003c')}</script>`;
}
