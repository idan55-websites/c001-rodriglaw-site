// The production apex domain redirects to www; all indexing signals use that host.
export const SITE_URL = 'https://www.rodriglaw.com';
export const publicRoutes = ['/', '/about', '/services', '/contact', '/privacy-policy', '/accessibility'];
const pageKeys = {
  '/': ['home.heroTitle', 'home.heroIntro'],
  '/about': ['about.title', 'about.p1'],
  '/services': ['services.title', 'services.intro'],
  '/contact': ['contact.title', 'home.contactAddress'],
  '/privacy-policy': ['privacy.title', 'privacy.intro'],
  '/accessibility': ['accessibility.title', 'accessibility.intro'],
};
const descriptions = {
  he: 'מוריה רודריג, עורכת דין ונוטריון בפתח תקווה. ליווי עסקאות נדל״ן, צוואות, ייפוי כוח מתמשך ושירותים נוטריוניים בישראל ובחו״ל. שירות אישי ורב־לשוני.',
  en: 'Moria Rodrig, lawyer and notary in Petah Tikva, Israel. Real estate transactions, wills, lasting powers of attorney and multilingual notarial services.',
  fr: 'Moria Rodrig, avocate et notaire à Petah Tikva, Israël. Immobilier, testaments, mandats de protection et services notariaux multilingues.',
  nl: 'Moria Rodrig, advocaat en notaris in Petah Tikva, Israël. Vastgoedtransacties, testamenten, duurzame volmachten en meertalige notariële diensten.',
};

export function getSeo(pathname, language, t) {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const lang = language.split('-')[0];
  const keys = pageKeys[path];
  const title = path === '/' ? t('home.heroTitle') : `${t(keys?.[0] || 'brand.name')} | ${t('brand.name')}`;
  const description = ['/', '/about', '/services'].includes(path) ? descriptions[lang] || descriptions.he
    : `${t(keys?.[1] || 'home.heroIntro')} ${t('brand.name')}`;
  const url = `${SITE_URL}${path}`;
  const name = 'מוריה רודריג – משרד עורכי דין ונוטריון';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LegalService', '@id': `${SITE_URL}/#office`, name,
        alternateName: ['Moria Rodrig - Law Office and Notary', 'מוריה רודריג', 'Moria Rodrig'],
        url: `${SITE_URL}/`, logo: `${SITE_URL}/brand-logo.png`, image: `${SITE_URL}/moria-portrait.jpeg`,
        telephone: '+972-54-622-5654', email: 'moria@rodriglaw.com',
        address: { '@type': 'PostalAddress', streetAddress: 'הסיבים 49', addressLocality: 'פתח תקווה', addressCountry: 'IL' },
        geo: { '@type': 'GeoCoordinates', latitude: 32.0831515, longitude: 34.8567889 },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '19:00' }],
        areaServed: { '@type': 'Country', name: 'Israel' },
      },
      { '@type': 'Person', '@id': `${SITE_URL}/#moria`, name: 'מוריה רודריג', alternateName: 'Moria Rodrig',
        jobTitle: 'עורכת דין ונוטריון', worksFor: { '@id': `${SITE_URL}/#office` }, url: `${SITE_URL}/about`, image: `${SITE_URL}/moria-portrait.jpeg`, knowsLanguage: ['he', 'en', 'fr', 'nl'] },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name,
        alternateName: 'Moria Rodrig', publisher: { '@id': `${SITE_URL}/#office` }, inLanguage: ['he', 'en', 'fr', 'nl'] },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
        inLanguage: lang, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#office` } },
    ],
  };
  return { title, description, url, lang, schema, indexable: Boolean(keys) };
}

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export function renderSeoHead(seo) {
  const locale = { he: 'he_IL', en: 'en_US', fr: 'fr_FR', nl: 'nl_NL' }[seo.lang] || 'he_IL';
  return `<title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${seo.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />
    <link rel="canonical" href="${escapeHtml(seo.url)}" />
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
