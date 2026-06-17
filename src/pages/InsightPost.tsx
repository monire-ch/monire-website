import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { INSIGHTS_POSTS, INSIGHTS_ROUTE_BASE, getInsightPostBySlug, type InsightPost } from "@/config/insightsPosts";
import NotFound from "@/pages/NotFound";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { useLocalePath } from "@/hooks/useLocalePath";
import { getLocaleFromPathname, localizeInternalHtmlLinks } from "@/lib/localeRouting";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const renderHeadingWithPunctuation = (text: string) => {
  if (!text.endsWith("?")) return text;
  return (
    <>
      {text.slice(0, -1)}
      <span className="insight-heading-punctuation">?</span>
    </>
  );
};

const InsightPost = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const localePath = useLocalePath();
  const locale = getLocaleFromPathname(location.pathname);
  const { slug } = useParams();
  const basePost = slug ? getInsightPostBySlug(slug) : undefined;
  const translatedPost = slug
    ? (t(`insightsPosts.${slug}`, { returnObjects: true }) as Partial<InsightPost> | string)
    : undefined;
  const post = basePost
    ? {
        ...basePost,
        ...(translatedPost && typeof translatedPost !== 'string' ? translatedPost : {}),
      }
    : undefined;

  if (!post) {
    return <NotFound />;
  }

  const canonicalPath = localePath(`${INSIGHTS_ROUTE_BASE}/${post.slug}`);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const localizedContentHtml = post.contentHtml ? localizeInternalHtmlLinks(post.contentHtml, locale) : undefined;
  const relatedPosts = INSIGHTS_POSTS.filter((candidate) => post.relatedSlugs.includes(candidate.slug)).map((relatedPost) => ({
    ...relatedPost,
    ...(t(`insightsPosts.${relatedPost.slug}`, { returnObjects: true }) as Partial<InsightPost>),
  }));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: locale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "Moniré",
      url: SITE_URL,
    },
  };
  const faqSchema = post.faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const handleInsightLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;

    trackEvent("blog_cta_click", {
      location: "insight_post",
      destination: href,
      page_path: window.location.pathname,
    });
  };

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-20 px-6">
        <article className="max-w-3xl mx-auto" onClickCapture={handleInsightLinkClick}>
          <div className="mb-8">
            <Link
              to={localePath(INSIGHTS_ROUTE_BASE)}
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              <ArrowLeft size={16} />
              {t('insightsPage.backToAll')}
            </Link>
          </div>
          <p className="eyebrow-pill eyebrow-pill-light mb-5 inline-block">{t('insightsPage.eyebrow')}</p>
          <p className="text-sm font-body text-main-teal mb-4">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {" · "}
            {post.readTimeMinutes} {t('common.minRead')}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-tertiary italic text-2xl md:text-3xl text-main-teal/90 mb-10">{post.description}</p>
          <section className="rounded-xl border border-border bg-card p-5 md:p-6 mb-10" aria-labelledby="quick-answer">
            <h2 id="quick-answer" className="font-display text-xl md:text-2xl text-foreground mb-2">
              {t('insightsPage.quickAnswer')}
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">{post.quickAnswer}</p>
          </section>

          <div
            className="insight-prose"
            dangerouslySetInnerHTML={localizedContentHtml ? { __html: localizedContentHtml } : undefined}
          >
            {localizedContentHtml ? null : post.content}
          </div>

          <section className="rounded-xl border border-border bg-card p-5 md:p-6 mt-10" aria-labelledby="post-cta">
            <h2 id="post-cta" className="font-display text-xl md:text-2xl text-foreground mb-2">
              {renderHeadingWithPunctuation(post.primaryCta.title)}
            </h2>
            <p className="font-body text-base text-foreground/80 mb-4">
              {post.primaryCta.body}
            </p>
            <Link
              to={localePath(post.primaryCta.href)}
              className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              {post.primaryCta.label}
            </Link>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-12 pt-6 border-t border-border" aria-labelledby="related-insights">
              <h2 id="related-insights" className="font-display text-2xl md:text-3xl text-foreground mb-4">
                {t('insightsPage.related')}
              </h2>
              <ul className="space-y-2">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <Link
                      to={localePath(`${INSIGHTS_ROUTE_BASE}/${relatedPost.slug}`)}
                      className="text-base font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
                    >
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

        </article>
      </main>
      <Footer hideWave />
      <JsonLd data={articleSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
    </>
  );
};

export default InsightPost;
