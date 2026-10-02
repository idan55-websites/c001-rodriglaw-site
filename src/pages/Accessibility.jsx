import { useTranslation } from 'react-i18next';

export default function Accessibility() {
  const { t } = useTranslation();
  const features = t('accessibility.features', { returnObjects: true });
  return <section className="section_contact"><div className="page-padding"><div className="container-large"><div className="padding-vertical-large space-y-5">
    <h1 className="section-title">{t('accessibility.title')}</h1>
    <p className="section-copy">{t('accessibility.intro')}</p>
    <article className="content-card privacy-card"><h2 className="card-title">{t('accessibility.featuresTitle')}</h2><ul className="privacy-list">{features.map(item => <li key={item}>{item}</li>)}</ul></article>
    <article className="content-card privacy-card"><h2 className="card-title">{t('accessibility.limitationsTitle')}</h2><p className="card-copy">{t('accessibility.limitations')}</p></article>
    <article className="content-card privacy-card"><h2 className="card-title">{t('accessibility.helpTitle')}</h2><p className="card-copy">{t('accessibility.help')}</p>
      <p className="card-copy">{t('brand.name')}<br /><a href="tel:+972546225654" className="phone-ltr">+972-54-622-5654</a><br /><a href="mailto:moria@rodriglaw.com">moria@rodriglaw.com</a></p>
      <p className="card-copy">{t('accessibility.office')}</p>
    </article>
    <article className="content-card privacy-card"><h2 className="card-title">{t('accessibility.reviewTitle')}</h2><p className="card-copy">{t('accessibility.review')}</p></article>
  </div></div></div></section>;
}
