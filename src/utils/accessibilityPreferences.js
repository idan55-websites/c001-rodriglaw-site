export const ACCESSIBILITY_KEY = 'moria-accessibility-v1';
export const defaultPreferences = {
  textSize: 100, contrast: false, reduceMotion: false,
  underlineLinks: false, readableFont: false, textSpacing: false, grayscale: false,
};

export function readAccessibilityPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(ACCESSIBILITY_KEY));
    return Object.fromEntries(Object.entries(defaultPreferences).map(([key, value]) => [
      key, key === 'textSize' ? ([100, 125, 150, 175, 200].includes(saved?.[key]) ? saved[key] : value)
        : (typeof saved?.[key] === 'boolean' ? saved[key] : value),
    ]));
  } catch { return { ...defaultPreferences }; }
}

export function applyAccessibilityPreferences(preferences) {
  const root = document.documentElement;
  root.style.setProperty('--a11y-text-size', `${preferences.textSize}%`);
  for (const key of Object.keys(defaultPreferences).filter(key => key !== 'textSize')) {
    root.toggleAttribute(`data-a11y-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`, preferences[key]);
  }
  window.dispatchEvent(new Event('accessibilitychange'));
}

export function motionDisabled() {
  return document.documentElement.hasAttribute('data-a11y-reduce-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
