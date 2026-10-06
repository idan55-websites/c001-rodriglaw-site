import { useTranslation } from 'react-i18next';
import { englishNames, hebrewNames } from '../utils/businessIdentity';

export default function NameReference({ bilingual = false }) {
  const { t, i18n } = useTranslation();
  const hebrew = i18n.language.split('-')[0] === 'he';
  return <div className="name-reference">
    <p className="section-copy">{t('about.nameReference')}</p>
    {bilingual && <p className="section-copy name-reference-alternates" lang={hebrew ? 'en' : 'he'} dir={hebrew ? 'ltr' : 'rtl'}>
      {(hebrew ? englishNames : hebrewNames).join(' · ')}
    </p>}
  </div>;
}
