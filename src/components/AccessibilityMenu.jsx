import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applyAccessibilityPreferences, defaultPreferences, readAccessibilityPreferences, ACCESSIBILITY_KEY } from '../utils/accessibilityPreferences';

export default function AccessibilityMenu() {
  const { t } = useTranslation();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const followingStatement = useRef(false);
  const [preferences, setPreferences] = useState(readAccessibilityPreferences);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    applyAccessibilityPreferences(preferences);
    try { localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(preferences)); } catch { /* Controls still work without storage. */ }
  }, [preferences]);
  useEffect(() => {
    const sync = event => {
      if (event.key === ACCESSIBILITY_KEY || event.key === null) setPreferences(readAccessibilityPreferences());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const close = () => dialog.current?.close();
  const change = (key, value) => setPreferences(previous => ({ ...previous, [key]: value }));
  return <>
    <button ref={trigger} className="accessibility-trigger" type="button" aria-label={t('accessibility.menu.open')}
      aria-haspopup="dialog" aria-expanded={open} aria-controls="accessibility-dialog"
      onClick={() => { followingStatement.current = false; dialog.current.showModal(); setOpen(true); }}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="4" r="2" fill="currentColor" /><path d="M4 8h16M12 7v7m0-1-4 8m4-8 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    </button>
    <dialog ref={dialog} id="accessibility-dialog" className="accessibility-dialog" aria-labelledby="accessibility-menu-title"
      onClose={() => { setOpen(false); if (!followingStatement.current) trigger.current?.focus({ preventScroll: true }); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(dialog.current.querySelectorAll('button:not(:disabled), a[href]'));
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}
      onClick={event => { if (event.target === dialog.current) {
        const bounds = dialog.current.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      } }}>
      <div className="accessibility-menu-header"><h2 id="accessibility-menu-title">{t('accessibility.menu.title')}</h2>
        <button type="button" className="accessibility-close" aria-label={t('accessibility.menu.close')} onClick={close}>×</button></div>
      <p className="accessibility-menu-intro">{t('accessibility.menu.intro')}</p>
      <fieldset className="accessibility-text-size"><legend>{t('accessibility.menu.textSize')}</legend>
        <button type="button" aria-label={t('accessibility.menu.decrease')} disabled={preferences.textSize === 100} onClick={() => change('textSize', preferences.textSize - 25)}>A−</button>
        <output aria-live="polite" aria-atomic="true">{preferences.textSize}%</output>
        <button type="button" aria-label={t('accessibility.menu.increase')} disabled={preferences.textSize === 200} onClick={() => change('textSize', preferences.textSize + 25)}>A+</button>
      </fieldset>
      <div className="accessibility-options">{['contrast', 'reduceMotion', 'underlineLinks', 'readableFont', 'textSpacing', 'grayscale'].map(key =>
        <button key={key} type="button" aria-pressed={preferences[key]} onClick={() => change(key, !preferences[key])}>
          <span>{t(`accessibility.menu.${key}`)}</span><span aria-hidden="true">{preferences[key] ? '✓' : '+'}</span>
        </button>)}</div>
      <button type="button" className="accessibility-reset" onClick={() => setPreferences({ ...defaultPreferences })}>{t('accessibility.menu.reset')}</button>
      <Link className="accessibility-statement-link" to="/accessibility" onClick={() => { followingStatement.current = true; close(); }}>{t('accessibility.title')}</Link>
      <p className="accessibility-menu-note">{t('accessibility.menu.saved')}</p>
    </dialog>
  </>;
}
