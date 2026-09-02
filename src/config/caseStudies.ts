import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import portco from "@/assets/portfolio/portco_full.webp";
import portcoLogin from "@/assets/portfolio/portco_login.webp";
import systemically from "@/assets/portfolio/systemically_full.webp";
import towarowa from "@/assets/portfolio/towarowa_full.webp";
import n8nPreview from "@/assets/portfolio/n8n.webp";
import labsift from "@/assets/portfolio/labsift-og-image.webp";
import horizonCollective from "@/assets/portfolio/horizon_full.webp";

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

export type CaseStudyCategory =
  | "branding"
  | "webDesignDevelopment"
  | "webDevelopment"
  | "automations";

export type CaseStudyConfig = {
  title?: string;
  subtitle?: string;
  client?: string;
  date?: string;
  industry?: string;
  category?: CaseStudyCategory;
  categories?: CaseStudyCategory[];
  tools?: string[];
  image?: string;
  imageAlt?: string;
  imageScrollable?: boolean;
  websiteUrl?: string;
  websiteLabel?: string;
  showLiveNote?: boolean;
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
    categories: ["webDesignDevelopment"],
    sections: [section(), section(), section()],
    testimonial: testimonial(),
  },
    "horizon-collective": {
    image: horizonCollective,
    imageScrollable: true,
    websiteUrl: "https://thehorizoncollective.co/",
    categories: ["webDesignDevelopment"],
    sections: [
      section(),
      section(),
      section(),
    ],
  },
  "portco-hr-collective": {
    image: portco,
    imageScrollable: true,
    websiteUrl: "https://www.portcohrcollective.com/",
    categories: ["branding", "webDesignDevelopment", "automations"],
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
    categories: ["webDevelopment"],
    sections: [section(), section(), section()],
  },
  towarowa: {
    image: towarowa,
    imageScrollable: true,
    websiteUrl: "https://towarowa.netlify.app/",
    categories: ["webDesignDevelopment"],
    sections: [section(), section(), section()],
    metrics: [metric(), metric()],
  },
  "expense-receipt-automation": {
    image: n8nPreview,
    imageScrollable: false,
    categories: ["automations"],
    sections: [section(), section(), section()],
    testimonial: testimonial(),
  },
  labsift: {
    image: labsift,
    imageScrollable: false,
    websiteUrl: "https://lab-sift.com",
    showLiveNote: false,
    categories: ["automations"],
    sections: [section(), section(), section()],
  },
};
