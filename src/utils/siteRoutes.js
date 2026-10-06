export const languages = ['he', 'en', 'fr', 'nl'];
export const baseRoutes = ['/', '/about', '/services', '/contact', '/privacy-policy', '/accessibility'];

export function getRouteInfo(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/');
  const language = languages.includes(parts[1]) && parts[1] !== 'he' ? parts[1] : 'he';
  const basePath = language === 'he' ? clean : `/${parts.slice(2).join('/')}`;
  return { language, basePath: basePath || '/' };
}

export function localizePath(destination, language) {
  const match = destination.match(/^([^?#]*)(.*)$/);
  const { basePath } = getRouteInfo(match[1] || '/');
  const prefix = language === 'he' ? '' : `/${language}`;
  return `${`${prefix}${basePath === '/' ? '' : basePath}` || '/'}${match[2]}`;
}

export const publicRoutes = languages.flatMap(language => baseRoutes.map(route => localizePath(route, language)));
