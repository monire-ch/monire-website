export const SUPPORTED_LOCALES = ['en', 'de'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';
export const LOCALE_PREFIXES: Record<SupportedLocale, string> = {
  en: '',
  de: '/de',
};

export const isSupportedLocale = (locale: string | null | undefined): locale is SupportedLocale =>
  SUPPORTED_LOCALES.includes(locale as SupportedLocale);

export const getLocaleFromPathname = (pathname: string): SupportedLocale => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return firstSegment === 'de' ? 'de' : DEFAULT_LOCALE;
};

export const stripLocalePrefix = (pathname: string) => {
  if (pathname === '/de') return '/';
  if (pathname.startsWith('/de/')) return pathname.slice(3) || '/';
  return pathname || '/';
};

export const withLocalePrefix = (path: string, locale: SupportedLocale) => {
  if (!path || path === '/') return locale === DEFAULT_LOCALE ? '/' : LOCALE_PREFIXES[locale];
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;

  if (path.startsWith('#')) {
    return `${locale === DEFAULT_LOCALE ? '/' : LOCALE_PREFIXES[locale]}${path}`;
  }

  const [pathWithoutHash, hash = ''] = path.split('#');
  const [pathnamePart, search = ''] = pathWithoutHash.split('?');
  const normalizedPathname = stripLocalePrefix(pathnamePart.startsWith('/') ? pathnamePart : `/${pathnamePart}`);
  const prefixedPathname =
    locale === DEFAULT_LOCALE
      ? normalizedPathname
      : normalizedPathname === '/'
        ? LOCALE_PREFIXES[locale]
        : `${LOCALE_PREFIXES[locale]}${normalizedPathname}`;

  return `${prefixedPathname}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
};

export const getLocalizedPath = (path: string, currentPathname: string) =>
  withLocalePrefix(path, getLocaleFromPathname(currentPathname));

export const getAlternateLocalePath = (
  currentPathname: string,
  targetLocale: SupportedLocale,
  search = '',
  hash = ''
) => withLocalePrefix(`${stripLocalePrefix(currentPathname)}${search}${hash}`, targetLocale);

const isLocalizableInternalPath = (path: string) =>
  path.startsWith('/') &&
  !path.startsWith('//') &&
  !path.startsWith('/documents/') &&
  !path.startsWith('/assets/') &&
  !path.startsWith('/favicon') &&
  !/\.[a-z0-9]+($|[?#])/i.test(path);

export const localizeInternalHtmlLinks = (html: string, locale: SupportedLocale) =>
  html.replace(/href=(["'])(\/(?!\/)[^"']*)\1/g, (match, quote: string, href: string) => {
    if (!isLocalizableInternalPath(href)) return match;
    return `href=${quote}${withLocalePrefix(href, locale)}${quote}`;
  });
