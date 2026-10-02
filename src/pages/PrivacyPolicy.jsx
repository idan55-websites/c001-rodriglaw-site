import { useTranslation } from "react-i18next";

const sections = ['scope', 'data', 'purpose', 'systems', 'cookies', 'legalBasis', 'disclosure', 'retention', 'security', 'rights'];
const providerLinks = [
  ['Microsoft Clarity', 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies'],
  ['Microsoft Privacy', 'https://privacy.microsoft.com/privacystatement'],
  ['Mapbox', 'https://www.mapbox.com/legal/privacy'],
  ['Google Fonts', 'https://developers.google.com/fonts/faq/privacy'],
];

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return <section className="section_contact"><div className="page-padding"><div className="container-large"><div className="padding-vertical-large space-y-5">
    <p className="eyebrow">{t('privacy.eyebrow')}</p>
    <h1 className="section-title">{t('privacy.title')}</h1>
    <p className="section-copy">{t('privacy.intro')}</p>
    {sections.map(key => <article key={key} id={key === 'cookies' ? 'cookies' : undefined} tabIndex={key === 'cookies' ? -1 : undefined} aria-labelledby={`privacy-${key}-title`} className="content-card privacy-card">
      <h2 id={`privacy-${key}-title`} className="card-title">{t(`privacy.sections.${key}.title`)}</h2>
      {key === 'cookies' && <dl className="cookie-categories">
        <dt>{t('cookies.essential')}</dt><dd>{t('cookies.essentialBody')}</dd>
        <dt>{t('cookies.analytics')}</dt><dd>{t('cookies.analyticsBody')}</dd>
      </dl>}
      <p className="card-copy">{t(`privacy.sections.${key}.body`)}</p>
      {key === 'systems' && <ul className="privacy-list">{providerLinks.map(([name, url]) => <li key={name}><a href={url}>{name}</a></li>)}</ul>}
    </article>)}
    <article className="content-card privacy-card">
      <h2 className="card-title">{t('privacy.sections.contact.title')}</h2>
      <p className="card-copy">{t('brand.name')}<br />
        {t('privacy.sections.contact.phoneLabel')}: <a href="tel:+972546225654" className="phone-ltr">+972-54-622-5654</a><br />
        {t('privacy.sections.contact.emailLabel')}: <a href="mailto:moria@rodriglaw.com">moria@rodriglaw.com</a><br />
        {t('privacy.sections.contact.addressLabel')}: {t('home.contactAddress')}
      </p>
    </article>
    <article className="content-card privacy-card"><h2 className="card-title">{t('privacy.sections.revisions.title')}</h2><p className="card-copy">{t('privacy.sections.revisions.body')}</p></article>
  </div></div></div></section>;
}
