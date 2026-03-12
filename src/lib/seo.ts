export const SITE_URL = 'https://monire.ch';

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
};

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Moniré | Web Design, Web Development & AI Automations in Zurich, Switzerland',
    description:
      'Moniré is a digital studio offering web design, web development, and AI automations in Zurich and across Switzerland.',
    keywords: ['Moniré', 'web design Zurich', 'web development Zurich', 'AI automations Switzerland'],
  },
  '/contact': {
    title: 'Contact Moniré | Web Design, Web Development & AI Automations',
    description:
      'Contact Moniré about web design, web development, and AI automations in Zurich and across Switzerland.',
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

export const PRERENDER_ROUTES = [
  '/',
  '/privacy',
  '/apply',
  '/contact',
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
