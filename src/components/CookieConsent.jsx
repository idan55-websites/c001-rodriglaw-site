import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { saveConsent } from '../utils/cookieConsent';
import { localizePath } from '../utils/siteRoutes';

export default function CookieConsent({ onClose }) {
  const { t, i18n } = useTranslation();
  const panel = useRef(null);
  const followDetails = useRef(false);
  useEffect(() => {
    const previousFocus = document.activeElement;
    panel.current?.focus({ preventScroll: true });
    return () => {
      if (!followDetails.current && previousFocus !== document.body && previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);
  const choose = (allowed) => { saveConsent(allowed); onClose(); };
  return (
    <section ref={panel} tabIndex={-1} className="cookie-panel" aria-labelledby="cookie-title" aria-describedby="cookie-description" data-clarity-mask="true" onKeyDown={event => { if (event.key === 'Escape') onClose(); }}>
      <h2 id="cookie-title">{t('cookies.title')}</h2>
      <p id="cookie-description">{t('cookies.description')}</p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(false)}>{t('cookies.reject')}</button>
        <button type="button" onClick={() => choose(true)}>{t('cookies.accept')}</button>
      </div>
      <div className="cookie-links"><Link to={localizePath('/privacy-policy#cookies', i18n.language)} onClick={() => { followDetails.current = true; onClose(); }}>{t('cookies.details')}</Link></div>
    </section>
  );
}
