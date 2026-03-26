import snipSquad from '@/assets/portfolio/snip-squad_full.webp';
import systemically from '@/assets/portfolio/systemically_full.webp';
import towarowa from '@/assets/portfolio/towarowa_full.webp';
import n8nPreview from '@/assets/portfolio/n8n.webp';

export type WebCaseStudyConfig = {
  kind: 'web';
  eyebrow: string;
  title: string;
  client: string;
  date: string;
  category: string;
  tools: string[];
  websiteUrl: string;
  websiteLabel: string;
  image: string;
  imageAlt: string;
  gridClassName: string;
  previewClassName: string;
  previewImageClassName: string;
};

export type AiCaseStudySection = {
  title: string;
  intro: string;
  items: string[];
};

export type AiCaseStudyConfig = {
  kind: 'ai';
  eyebrow: string;
  title: string;
  client: string;
  date: string;
  category: string;
  tools: string[];
  image: string;
  imageAlt: string;
  sections: AiCaseStudySection[];
};

export const webCaseStudies = {
  snipSquad: {
    kind: 'web',
    eyebrow: 'Web Design & Web Development',
    title: 'Snip Squad',
    client: 'Snip Squad',
    date: 'January 2026',
    category: 'Web Design & Web Development',
    tools: ['WEBFLOW', 'FIGMA', 'RELUME'],
    websiteUrl: 'https://snipsquad.org',
    websiteLabel: 'Visit Website',
    image: snipSquad,
    imageAlt: 'Snip Squad website preview',
    gridClassName: 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,608px)] gap-10 lg:gap-14 mb-16',
    previewClassName:
      'w-full max-w-[608px] mx-auto lg:mx-0 rounded-xl overflow-hidden border border-border bg-card h-[560px] md:h-[720px] overflow-y-auto',
    previewImageClassName: 'w-auto max-w-full h-auto block mx-auto',
  },
  systemically: {
    kind: 'web',
    eyebrow: 'Web Development',
    title: 'SystemicAlly',
    client: 'SystemicAlly',
    date: 'May 2025',
    category: 'Web Development',
    tools: ['WEBFLOW', 'GOOGLE ANALYTICS'],
    websiteUrl: 'https://www.systemically.ch',
    websiteLabel: 'Visit Website',
    image: systemically,
    imageAlt: 'SystemicAlly website preview',
    gridClassName: 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 mb-16',
    previewClassName: 'rounded-xl overflow-hidden border border-border bg-card h-[560px] md:h-[720px] overflow-y-auto',
    previewImageClassName: 'w-auto max-w-full h-auto block mx-auto',
  },
  towarowa: {
    kind: 'web',
    eyebrow: 'Web Design & Web Development',
    title: 'Towarowa',
    client: 'Towarowa',
    date: 'October 2025',
    category: 'Web Design & Web Development',
    tools: ['TYPESCRIPT', 'TAILWIND', 'FIGMA', 'NETLIFY'],
    websiteUrl: 'https://towarowa41.pl',
    websiteLabel: 'Visit Website',
    image: towarowa,
    imageAlt: 'Towarowa 41 website preview',
    gridClassName: 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 mb-16',
    previewClassName: 'rounded-xl overflow-hidden border border-border bg-card h-[560px] md:h-[720px] overflow-y-auto',
    previewImageClassName: 'w-auto max-w-full h-auto block mx-auto',
  },
} satisfies Record<string, WebCaseStudyConfig>;

export const aiCaseStudies = {
  expenseReceiptAutomation: {
    kind: 'ai',
    eyebrow: 'AI Automation',
    title: 'Expense Receipt Automation',
    client: 'Brooksmiller & Partners AG',
    date: 'August 2025',
    category: 'AI Automation',
    tools: ['OUTLOOK', 'N8N', 'ONEDRIVE', 'EXCEL', 'OCR + AI EXTRACTION'],
    image: n8nPreview,
    imageAlt: 'Expense Receipt Automation workflow',
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
} satisfies Record<string, AiCaseStudyConfig>;
