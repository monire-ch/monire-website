import { INSIGHTS_META } from '../config/insightsMeta';

export const SITE_URL = 'https://monire.ch';

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
};

const STATIC_ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Moniré | Web Design, Web Development & AI Automations in Zurich, Switzerland',
    description:
      'Moniré is a digital studio offering web design, web development, and AI automations in Zurich and across Switzerland.',
    keywords: ['Moniré', 'web design Zurich', 'web development Zurich', 'website design Switzerland', 'AI automation Switzerland', 'workflow automation Zurich', 'Webflow development Zurich', 'small business web design Switzerland'],
  },
  '/contact': {
    title: 'Contact Moniré | Web Design, Web Development & AI Automations',
    description:
      'Contact Moniré about web design, web development, and AI automations in Zurich and across Switzerland.',
  },
  '/insights': {
    title: 'Insights on Web Design, Automation & Digital Strategy | Moniré',
    description:
      'Practical articles from Moniré on web design, web development, SEO, AI automation, and digital decisions for small and mid-sized businesses.',
    keywords: ['web design advice', 'website strategy', 'small business website advice', 'AI automation for small businesses', 'web design Switzerland', 'workflow automation Switzerland', 'Webflow Switzerland'],
  },
  '/privacy': {
    title: 'Privacy Policy | Moniré',
    description:
      'Privacy policy for Moniré, a digital studio providing web design, web development, and AI automations.',
  },
  '/apply': {
    title: 'Apply | Moniré',
    description: 'Apply for Moniré complimentary project support for a non-profit or meaningful initiative.',
  },
  '/case-studies/expense-receipt-automation': {
    title: 'Expense Receipt Automation Case Study | Moniré',
    description:
      'Case study: an AI automation workflow for expense receipt processing built by Moniré.',
  },
  '/case-studies/snip-squad': {
    title: 'Snip Squad Case Study | Moniré',
    description: 'Case study: web design and development work delivered by Moniré for Snip Squad.',
  },
  '/case-studies/systemically': {
    title: 'SystemicAlly Case Study | Moniré',
    description: 'Case study: web development work delivered by Moniré for SystemicAlly.',
  },
  '/case-studies/towarowa': {
    title: 'Towarowa Case Study | Moniré',
    description: 'Case study: web design and development work delivered by Moniré for Towarowa.',
  },
};

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
  '/case-studies/systemically',
  '/case-studies/towarowa',
];

export const SITEMAP_ROUTES = PRERENDER_ROUTES.map((route) => ({
  route,
  url: route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`,
  priority: route === '/' ? '1.0' : route.startsWith('/case-studies/') ? '0.7' : '0.8',
  changefreq: route === '/' ? 'weekly' : 'monthly',
}));
