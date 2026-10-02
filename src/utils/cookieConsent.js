// Optional analytics is never loaded until a current, explicit choice allows it.
export const CONSENT_KEY = 'moria-cookie-consent';
const VERSION = 1;
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
let analyticsStarted = false;

export function readConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY));
    const age = Date.now() - value?.timestamp;
    return value?.version === VERSION && typeof value.analytics === 'boolean' &&
      Number.isFinite(age) && age >= 0 && age < MAX_AGE ? value : null;
  } catch { return null; }
}

function clearAnalyticsCookies() {
  const parts = location.hostname.split('.');
  const domains = ['', ...parts.map((_, index) => parts.slice(index).join('.'))];
  const paths = ['/', ...location.pathname.split('/').map((_, index, all) => all.slice(0, index + 1).join('/') || '/')];
  for (const name of ['_clck', '_clsk']) {
    for (const domain of domains) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; path=${path};${domain ? ` domain=${domain};` : ''} SameSite=Lax`;
    }
  }
}

export function applyConsent(analytics) {
  if (!analytics) {
    if (analyticsStarted) {
      window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    }
    clearAnalyticsCookies();
    // Removing the script alone cannot stop its listeners or cookieless collection.
    if (analyticsStarted) location.reload();
    return;
  }
  if (analyticsStarted) return;
  analyticsStarted = true;
  window.clarity = window.clarity || function (...args) {
    (window.clarity.q = window.clarity.q || []).push(args);
  };
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  const script = document.createElement('script');
  script.id = 'moria-clarity';
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/vn0an3mzfg';
  document.head.appendChild(script);
}

export function saveConsent(analytics) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: VERSION, analytics, timestamp: Date.now() }));
  } catch { /* Private browsing/storage restrictions: default off on the next visit. */ }
  applyConsent(analytics);
}

export function initializeConsent() {
  const check = () => applyConsent(readConsent()?.analytics === true);
  check();
  window.addEventListener('storage', check);
  window.addEventListener('focus', check);
  const timer = window.setInterval(check, 60 * 1000);
  return () => {
    window.removeEventListener('storage', check);
    window.removeEventListener('focus', check);
    window.clearInterval(timer);
  };
}
