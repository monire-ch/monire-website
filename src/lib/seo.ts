import { INSIGHTS_META } from '../config/insightsMeta';
import { stripLocalePrefix, SUPPORTED_LOCALES, withLocalePrefix, type SupportedLocale } from './localeRouting';
import de from '../i18n/de.json';
import en from '../i18n/en.json';

export const SITE_URL = 'https://monire.ch';

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
};

const LOCALE_RESOURCES = {
  en,
  de,
} as const;

const getLocaleRouteSeo = (locale: SupportedLocale) => {
  const translations = LOCALE_RESOURCES[locale];
  const staticRouteSeo = translations.seo.routes as Record<string, RouteSeo>;
  const insightsRouteSeo = Object.entries(translations.insightsPosts).reduce((acc, [slug, post]) => {
    acc[`/insights/${slug}`] = {
      title: post.seoTitle,
      description: post.seoDescription,
      keywords: post.keywords,
    };

    return acc;
  }, {} as Record<string, RouteSeo>);

  return {
    ...staticRouteSeo,
    ...insightsRouteSeo,
  };
};

export type RouteAlternateUrls = Record<SupportedLocale | 'x-default', string>;

export type LocalizedRouteSeo = RouteSeo & {
  locale: SupportedLocale;
  canonicalPath: string;
  canonicalUrl: string;
  alternateUrls: RouteAlternateUrls;
};

const baseRouteSeo = getLocaleRouteSeo('en');

const localizedRouteEntries = SUPPORTED_LOCALES.flatMap((locale) => {
  const localizedSeo = getLocaleRouteSeo(locale);

  return Object.keys(baseRouteSeo).map((baseRoute) => {
    const route = withLocalePrefix(baseRoute, locale);
    const canonicalUrl = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    const alternateUrls = {
      en: baseRoute === '/' ? `${SITE_URL}/` : `${SITE_URL}${withLocalePrefix(baseRoute, 'en')}`,
      de: `${SITE_URL}${withLocalePrefix(baseRoute, 'de')}`,
      'x-default': baseRoute === '/' ? `${SITE_URL}/` : `${SITE_URL}${withLocalePrefix(baseRoute, 'en')}`,
    };

    return [
      route,
      {
        ...(localizedSeo[baseRoute] ?? baseRouteSeo[baseRoute]),
        locale,
        canonicalPath: route,
        canonicalUrl,
        alternateUrls,
      },
    ] as const;
  });
});

export const ROUTE_SEO: Record<string, LocalizedRouteSeo> = Object.fromEntries(localizedRouteEntries);

const INSIGHTS_ROUTES = INSIGHTS_META.map((post) => `/insights/${post.slug}`);

const BASE_PRERENDER_ROUTES = [
  '/',
  '/privacy',
  '/apply',
  '/contact',
  '/insights',
  ...INSIGHTS_ROUTES,
  '/case-studies/expense-receipt-automation',
  '/case-studies/snip-squad',
  '/case-studies/portco-hr-collective',
  '/case-studies/systemically',
  '/case-studies/towarowa',
];

export const PRERENDER_ROUTES = SUPPORTED_LOCALES.flatMap((locale) =>
  BASE_PRERENDER_ROUTES.map((route) => withLocalePrefix(route, locale))
);

const getRoutePriority = (route: string) => {
  const baseRoute = stripLocalePrefix(route);
  if (baseRoute === '/') return '1.0';
  if (baseRoute.startsWith('/case-studies/')) return '0.7';
  return '0.8';
};

const getRouteChangefreq = (route: string) => (stripLocalePrefix(route) === '/' ? 'weekly' : 'monthly');

export const SITEMAP_ROUTES = PRERENDER_ROUTES.map((route) => ({
  route,
  url: route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`,
  alternates: ROUTE_SEO[route]?.alternateUrls,
  priority: getRoutePriority(route),
  changefreq: getRouteChangefreq(route),
}));
