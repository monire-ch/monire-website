import { INSIGHTS_META } from '../config/insightsMeta';
import en from '../i18n/en.json';

export const SITE_URL = 'https://monire.ch';

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
};

const STATIC_ROUTE_SEO: Record<string, RouteSeo> = en.seo.routes;

const INSIGHTS_ROUTE_SEO: Record<string, RouteSeo> = INSIGHTS_META.reduce((acc, post) => {
  acc[`/insights/${post.slug}`] = {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
  };

  return acc;
}, {} as Record<string, RouteSeo>);

export const ROUTE_SEO: Record<string, RouteSeo> = {
  ...STATIC_ROUTE_SEO,
  ...INSIGHTS_ROUTE_SEO,
};

const INSIGHTS_ROUTES = INSIGHTS_META.map((post) => `/insights/${post.slug}`);

export const PRERENDER_ROUTES = [
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

export const SITEMAP_ROUTES = PRERENDER_ROUTES.map((route) => ({
  route,
  url: route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`,
  priority: route === '/' ? '1.0' : route.startsWith('/case-studies/') ? '0.7' : '0.8',
  changefreq: route === '/' ? 'weekly' : 'monthly',
}));
