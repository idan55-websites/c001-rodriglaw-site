import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import i18n from './i18n/i18n';
import { getSeo, renderSeoHead } from './utils/seo';

export function render(pathname) {
  const seo = getSeo(pathname, 'he', i18n.getFixedT('he'));
  return {
    content: renderToString(<StaticRouter location={pathname}><App /></StaticRouter>),
    head: renderSeoHead(seo),
  };
}
