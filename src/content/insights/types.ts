import type { ReactNode } from "react";

export type InsightPost = {
  slug: string;
  locale: "en";
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  quickAnswer: string;
  primaryCta: {
    title: string;
    body: string;
    label: string;
    href: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  relatedSlugs: string[];
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  content: ReactNode;
};
