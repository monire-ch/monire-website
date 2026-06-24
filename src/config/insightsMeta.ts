import en from "../i18n/en.json";

export type InsightMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const INSIGHTS_META: InsightMeta[] = Object.entries(en.insightsPosts).map(([slug, post]) => ({
  slug,
  title: post.title,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  keywords: post.keywords,
}));
