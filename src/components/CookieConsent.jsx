import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { readConsent, saveConsent } from '../utils/cookieConsent';

export default function CookieConsent({ onClose }) {
  const { t } = useTranslation();
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(() => readConsent()?.analytics === true);
  const choose = (allowed) => { saveConsent(allowed); onClose(); };
  return (
    <section className="cookie-panel" aria-labelledby="cookie-title" aria-describedby="cookie-description" data-clarity-mask="true">
      <h2 id="cookie-title">{t('cookies.title')}</h2>
      <p id="cookie-description">{t('cookies.description')}</p>
      {details && <div className="cookie-details">
        <p><strong>{t('cookies.essential')}</strong> — {t('cookies.essentialBody')}</p>
        <label className="cookie-option"><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span><strong>{t('cookies.analytics')}</strong><br />{t('cookies.analyticsBody')}</span></label>
      </div>}
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(false)}>{t('cookies.reject')}</button>
        <button type="button" onClick={() => choose(true)}>{t('cookies.accept')}</button>
        {details ? <button type="button" onClick={() => choose(analytics)}>{t('cookies.save')}</button> : <button type="button" aria-expanded={false} onClick={() => setDetails(true)}>{t('cookies.customize')}</button>}
      </div>
      <div className="cookie-links"><Link to="/privacy-policy" onClick={onClose}>{t('footer.privacy')}</Link><button type="button" onClick={onClose}>{t('cookies.later')}</button></div>
    </section>
  );
}
