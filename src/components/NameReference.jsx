import { useTranslation } from 'react-i18next';

export default function NameReference() {
  const { t } = useTranslation();
  return <div className="name-reference">
    <p className="section-copy">{t('about.nameReference')}</p>
  </div>;
}
