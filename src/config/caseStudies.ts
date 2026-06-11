import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import portco from "@/assets/portfolio/portco_full.webp";
import portcoLogin from "@/assets/portfolio/portco_login.webp";
import systemically from "@/assets/portfolio/systemically_full.webp";
import towarowa from "@/assets/portfolio/towarowa_full.webp";
import n8nPreview from "@/assets/portfolio/n8n.webp";

export type CaseStudySection = {
  title: string;
  intro?: string;
  items?: string[];
  visualImage?: CaseStudyVisualImage;
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type CaseStudyVisualImage = {
  src: string;
  alt: string;
  scrollable?: boolean;
};

export type CaseStudyConfig = {
  title: string;
  subtitle?: string;
  client: string;
  date: string;
  industry: string;
  category: string;
  tools: string[];
  image?: string;
  imageAlt?: string;
  imageScrollable?: boolean;
  websiteUrl?: string;
  websiteLabel?: string;
  sections?: CaseStudySection[];
  testimonial?: CaseStudyTestimonial;
};

export const caseStudiesBySlug: Record<string, CaseStudyConfig> = {
  "snip-squad": {
    title: "Snip Squad",
    subtitle:
      "A modern, approachable website for a nonprofit veterinary clinic",
    client: "Snip Squad",
    date: "January 2026",
    industry: "Veterinary & Nonprofit",
    category: "Web Design & Web Development",
    tools: ["WEBFLOW", "FIGMA", "RELUME"],
    image: snipSquad,
    imageAlt: "Snip Squad website preview",
    imageScrollable: true,
    websiteUrl: "https://snipsquad.org",
    websiteLabel: "Visit Website",
    sections: [
      {
        title: "Overview:",
        intro:
          "Snip Squad is a nonprofit veterinary clinic in Norfolk, Virginia providing affordable care for pets in underserved communities.\n\nThey needed a website that clearly communicates their mission, supports donations, and helps visitors quickly find key information.",
      },
      {
        title: "Approach:",
        intro:
          "Snip Squad wanted to move away from the typical clinical look and create something more modern, friendly, and community-focused.\n\nWe focused on:",
        items: [
          "A warm, approachable visual style",
          "Clear, structured, easy-to-scan content",
          "A fully responsive experience across mobile, tablet, and desktop",
          "An easy-to-manage CMS for the team",
        ],
      },
      {
        title: "Outcome:",
        intro:
          "The result is a clean, welcoming digital presence that reflects Snip Squad’s mission and supports both service discovery and donations.",
      },
    ],
    testimonial: {
      quote:
        "What an incredible website designer!! From start to finish they made it easy to make my dreams come true. Sometimes it can be overwhelming to even start and figure out what your vision would be for your website but Monire was able to speak with me and help me create the vision that I wanted for my website/business. In this day and age website design is so important and I would choose Monire 10/10 times to work with. Great team with excellent deadline times and easy to work with during modification process. Can't recommend them enough!",
      author: "Dr. Alex Phan, Snip Squad",
    },
  },
  "portco-hr-collective": {
    title: "PortCo HR Collective",
    subtitle:
      "An exclusive membership platform for HR leaders in private equity",
    client: "PortCo HR Collective",
    date: "2026",
    industry: "Private Equity / Professional Networks",
    category: "Branding, Web Design & Development, AI Automation",
    tools: ["WEBFLOW", "MEMBERSTACK", "N8N", "FIGMA"],
    image: portco,
    imageAlt: "PortCo HR Collective homepage preview",
    imageScrollable: true,
    sections: [
      {
        title: "Overview:",
        intro:
          "PortCo HR Collective is a peer network for Chief HR Officers working in PE-backed companies across Europe.\n\nThey came with a clear vision: build something that felt as considered and distinctive as the community itself. Not a generic platform, but a real identity with a real presence.",
        visualImage: {
          src: portcoLogin,
          alt: "PortCo HR Collective login page preview",
        },
      },
      {
        title: "Approach:",
        intro:
          "The design starts with a painting. The client brought a single piece of original artwork and asked for it to live throughout the site, not as decoration, but as the soul of it. Every hero, every full-bleed section, every background draws from it.\n\nOn top of that foundation:",
        items: [
          "A gated member directory with passwordless magic link login",
          "A self-managed Webflow CMS the client controls independently",
          "Two n8n automations: new members appear on the platform the moment they are approved, and new LinkedIn posts sync to the insights page automatically",
        ],
      },
      {
        title: "Outcome:",
        intro:
          "A complete community platform that looks like nothing else and runs itself.",
      },
    ],
  },
  systemically: {
    title: "SystemicAlly",
    client: "SystemicAlly",
    date: "May 2025",
    industry: "Consulting",
    category: "Web Development",
    tools: ["WEBFLOW", "GOOGLE ANALYTICS"],
    image: systemically,
    imageAlt: "SystemicAlly website preview",
    imageScrollable: true,
    websiteUrl: "https://www.systemically.ch",
    websiteLabel: "Visit Website",
  },
  towarowa: {
    title: "Towarowa",
    client: "Towarowa",
    date: "October 2025",
    industry: "Real Estate",
    category: "Web Design & Web Development",
    tools: ["TYPESCRIPT", "TAILWIND", "FIGMA", "NETLIFY"],
    image: towarowa,
    imageAlt: "Towarowa 41 website preview",
    imageScrollable: true,
    websiteUrl: "https://towarowa.netlify.app/",
    websiteLabel: "Visit Website",
  },
  "expense-receipt-automation": {
    title: "Expense Receipt Automation",
    client: "Brooksmiller & Partners AG",
    date: "August 2025",
    industry: "Executive Search",
    category: "AI Automation",
    tools: ["OUTLOOK", "N8N", "ONEDRIVE", "EXCEL", "OCR + AI EXTRACTION"],
    image: n8nPreview,
    imageAlt: "Expense Receipt Automation workflow",
    imageScrollable: false,
    sections: [
      {
        title: "Before:",
        intro:
          "Expenses were tracked manually. Receipts arrived by email and post. As a result:",
        items: [
          "Receipts were processed manually with high risk of errors.",
          "Files were stored inconsistently across folders.",
          "Manual data entry into Excel led to missing receipts and delays.",
        ],
      },
      {
        title: "After:",
        intro:
          "Receipts are now sent via email or Telegram and processed automatically.",
        items: [
          "Images/PDFs are extracted and cleaned via OCR.",
          "Date, amount, currency, and vendor are identified with AI.",
          "Files are renamed and stored in the correct OneDrive monthly folder.",
          "Data is added into the correct Excel table (EUR or CHF).",
          "Everything stays organized & ready for reimbursement review.",
        ],
      },
      {
        title: "Impact:",
        intro:
          "A messy monthly task became a clean, reliable, hands-off workflow.",
        items: [
          "~70% less manual admin time",
          "Fewer mistakes and missing receipts",
          "Consistent file naming + structured archive",
          "Faster workflows with less frustration",
        ],
      },
    ],
  },
};
