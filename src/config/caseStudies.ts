import snipSquad from '@/assets/portfolio/snip-squad_full.webp';
import systemically from '@/assets/portfolio/systemically_full.webp';
import towarowa from '@/assets/portfolio/towarowa_full.webp';
import n8nPreview from '@/assets/portfolio/n8n.webp';

export type CaseStudySection = {
  title: string;
  intro?: string;
  items?: string[];
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type CaseStudyConfig = {
  eyebrow: string;
  title: string;
  client: string;
  date: string;
  category: string;
  tools: string[];
  image: string;
  imageAlt: string;
  imageScrollable?: boolean;
  websiteUrl?: string;
  websiteLabel?: string;
  sections?: CaseStudySection[];
  testimonial?: CaseStudyTestimonial;
};

export const caseStudiesBySlug: Record<string, CaseStudyConfig> = {
  'snip-squad': {
    eyebrow: 'Web Design & Web Development',
    title: 'Snip Squad',
    client: 'Snip Squad',
    date: 'January 2026',
    category: 'Web Design & Web Development',
    tools: ['WEBFLOW', 'FIGMA', 'RELUME'],
    image: snipSquad,
    imageAlt: 'Snip Squad website preview',
    imageScrollable: true,
    websiteUrl: 'https://snipsquad.org',
    websiteLabel: 'Visit Website',
    sections: [
      {
        title: 'Overview:',
        intro:
          'Snip Squad is a nonprofit veterinary clinic in Norfolk, Virginia providing affordable veterinary care for pets in underserved communities. They needed a website that clearly communicates their mission, encourages donations, and helps pet owners quickly find the information they need.',
      },
      {
        title: 'Approach:',
        items: [
          'Designed a warm visual direction with clear service pathways.',
          'Built a fast, mobile-first Webflow experience with intuitive navigation.',
          'Structured content for clarity, trust, and conversion.',
        ],
      },
      {
        title: 'Impact:',
        items: [
          'Clearer user journeys from first visit to action.',
          'Stronger brand presence with an approachable digital experience.',
          'Easy ongoing content updates without developer dependency.',
        ],
      },
    ],
  },
  systemically: {
    eyebrow: 'Web Development',
    title: 'SystemicAlly',
    client: 'SystemicAlly',
    date: 'May 2025',
    category: 'Web Development',
    tools: ['WEBFLOW', 'GOOGLE ANALYTICS'],
    image: systemically,
    imageAlt: 'SystemicAlly website preview',
    imageScrollable: true,
    websiteUrl: 'https://www.systemically.ch',
    websiteLabel: 'Visit Website',
  },
  towarowa: {
    eyebrow: 'Web Design & Web Development',
    title: 'Towarowa',
    client: 'Towarowa',
    date: 'October 2025',
    category: 'Web Design & Web Development',
    tools: ['TYPESCRIPT', 'TAILWIND', 'FIGMA', 'NETLIFY'],
    image: towarowa,
    imageAlt: 'Towarowa 41 website preview',
    imageScrollable: true,
    websiteUrl: 'https://towarowa41.pl',
    websiteLabel: 'Visit Website',
  },
  'expense-receipt-automation': {
    eyebrow: 'AI Automation',
    title: 'Expense Receipt Automation',
    client: 'Brooksmiller & Partners AG',
    date: 'August 2025',
    category: 'AI Automation',
    tools: ['OUTLOOK', 'N8N', 'ONEDRIVE', 'EXCEL', 'OCR + AI EXTRACTION'],
    image: n8nPreview,
    imageAlt: 'Expense Receipt Automation workflow',
    imageScrollable: false,
    sections: [
      {
        title: 'Before:',
        intro: 'Expenses were tracked manually. Receipts arrived by email and post. As a result:',
        items: [
          'Receipts were processed manually with high risk of errors.',
          'Files were stored inconsistently across folders.',
          'Manual data entry into Excel led to missing receipts and delays.',
        ],
      },
      {
        title: 'After:',
        intro: 'Receipts are now sent via email or Telegram and processed automatically.',
        items: [
          'Images/PDFs are extracted and cleaned via OCR.',
          'Date, amount, currency, and vendor are identified with AI.',
          'Files are renamed and stored in the correct OneDrive monthly folder.',
          'Data is added into the correct Excel table (EUR or CHF).',
          'Everything stays organized & ready for reimbursement review.',
        ],
      },
      {
        title: 'Impact:',
        intro: 'A messy monthly task became a clean, reliable, hands-off workflow.',
        items: [
          '~70% less manual admin time',
          'Fewer mistakes and missing receipts',
          'Consistent file naming + structured archive',
          'Faster workflows with less frustration',
        ],
      },
    ],
  },
};
