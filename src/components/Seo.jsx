import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSeo, renderSeoHead } from '../utils/seo';

export default function Seo() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const seo = getSeo(pathname, i18n.language, t);
    // Replace only managed metadata; preserve favicon, viewport and build assets.
    const fragment = document.createElement('template');
    fragment.innerHTML = renderSeoHead(seo);
    for (const element of fragment.content.children) {
      const selector = element.tagName === 'TITLE' ? 'title' : element.tagName === 'LINK' ? 'link[rel="canonical"]'
        : element.tagName === 'SCRIPT' ? '#site-structured-data'
          : element.hasAttribute('name') ? `meta[name="${element.getAttribute('name')}"]` : `meta[property="${element.getAttribute('property')}"]`;
      document.head.querySelector(selector)?.remove();
    }
    document.head.appendChild(fragment.content);
  }, [pathname, i18n.language, t]);
  return null;
}
