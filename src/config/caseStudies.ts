import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import portco from "@/assets/portfolio/portco_full.webp";
import portcoLogin from "@/assets/portfolio/portco_login.webp";
import systemically from "@/assets/portfolio/systemically_full.webp";
import towarowa from "@/assets/portfolio/towarowa_full.webp";
import n8nPreview from "@/assets/portfolio/n8n.webp";

export type CaseStudySection = {
  title?: string;
  intro?: string;
  items?: string[];
  visualImage?: CaseStudyVisualImage;
};

export type CaseStudyTestimonial = {
  quote?: string;
  author?: string;
  role?: string;
};

export type CaseStudyMetric = {
  value?: string;
  description?: string;
};

export type CaseStudyVisualImage = {
  src: string;
  alt?: string;
  scrollable?: boolean;
};

export type CaseStudyConfig = {
  title?: string;
  subtitle?: string;
  client?: string;
  date?: string;
  industry?: string;
  category?: string;
  tools?: string[];
  image?: string;
  imageAlt?: string;
  imageScrollable?: boolean;
  websiteUrl?: string;
  websiteLabel?: string;
  sections?: CaseStudySection[];
  metrics?: CaseStudyMetric[];
  testimonial?: CaseStudyTestimonial;
};

const section = (visualImage?: CaseStudyVisualImage): CaseStudySection => ({
  visualImage,
});

const metric = (): CaseStudyMetric => ({});

const testimonial = (): CaseStudyTestimonial => ({});

export const caseStudiesBySlug: Record<string, CaseStudyConfig> = {
  "snip-squad": {
    image: snipSquad,
    imageScrollable: true,
    websiteUrl: "https://snipsquad.org",
    sections: [section(), section(), section()],
    testimonial: testimonial(),
  },
  "portco-hr-collective": {
    image: portco,
    imageScrollable: true,
    sections: [
      section({
        src: portcoLogin,
      }),
      section(),
      section(),
    ],
  },
  systemically: {
    image: systemically,
    imageScrollable: true,
    websiteUrl: "https://www.systemically.ch",
    sections: [section(), section(), section()],
  },
  towarowa: {
    image: towarowa,
    imageScrollable: true,
    websiteUrl: "https://towarowa.netlify.app/",
    sections: [section(), section(), section()],
    metrics: [metric(), metric()],
  },
  "expense-receipt-automation": {
    image: n8nPreview,
    imageScrollable: false,
    sections: [section(), section(), section()],
    testimonial: testimonial(),
  },
};
