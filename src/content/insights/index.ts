import { whatAiAutomationActuallyMeansForASmallBusinessPost } from "./posts/what-ai-automation-actually-means-for-a-small-business";
import { websiteBuildersVsCustomDevelopmentPost } from "./posts/website-builders-vs-custom-development";
import { whyYourWebsiteMightBeLosingYouClientsPost } from "./posts/why-your-website-might-be-losing-you-clients";

export type { InsightPost } from "./types";

export const INSIGHTS_POSTS = [
  whatAiAutomationActuallyMeansForASmallBusinessPost,
  websiteBuildersVsCustomDevelopmentPost,
  whyYourWebsiteMightBeLosingYouClientsPost,
];

export const INSIGHTS_ROUTE_BASE = "/insights";

export const getInsightPostBySlug = (slug: string) =>
  INSIGHTS_POSTS.find((post) => post.slug === slug);
