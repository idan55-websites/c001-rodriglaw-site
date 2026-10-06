import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import i18n from './i18n/i18n';
import { getSeo, renderSeoHead } from './utils/seo';
import { getRouteInfo } from './utils/siteRoutes';

export async function render(pathname) {
  const { language } = getRouteInfo(pathname);
  await i18n.changeLanguage(language);
  const seo = getSeo(pathname, i18n.getFixedT(language));
  return {
    content: renderToString(<StaticRouter location={pathname}><App /></StaticRouter>),
    head: renderSeoHead(seo),
    language,
  };
}
