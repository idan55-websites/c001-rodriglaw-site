import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const OfficeMap = lazy(() => import('./OfficeMap'));

export default function DeferredOfficeMap(props) {
  const { t } = useTranslation();
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!import.meta.env.VITE_MAPBOX_TOKEN) return;
    if (typeof IntersectionObserver !== 'function') {
      // Keep the address and external map links available on older browsers.
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '250px' });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const fallback = <div className="mapbox-canvas map-address-placeholder"><p>{t('home.contactAddress')}</p></div>;
  return <div ref={container}>
    {visible ? <Suspense fallback={fallback}><OfficeMap {...props} /></Suspense> : fallback}
  </div>;
}
