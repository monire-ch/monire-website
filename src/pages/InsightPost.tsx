import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ChevronDown } from "lucide-react";
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

type ArticleHeading = {
  id: string;
  title: string;
};

const decodeHtml = (value: string) => {
  if (typeof document !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    return textarea.value;
  }

  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
};

const extractArticleHeadings = (html?: string): ArticleHeading[] => {
  if (!html) return [];

  return Array.from(html.matchAll(/<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)).map((match) => ({
    id: match[1],
    title: decodeHtml(match[2].replace(/<[^>]*>/g, "").trim()),
  }));
};

const ArticleContents = ({
  headings,
  title,
  collapsible = false,
}: {
  headings: ArticleHeading[];
  title: string;
  collapsible?: boolean;
}) => {
  if (!headings.length) return null;

  const contentsList = (
    <ol className="space-y-3">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="block text-sm font-body leading-snug text-foreground/70 transition-colors hover:text-main-teal"
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );

  if (collapsible) {
    return (
      <details className="group rounded-xl border border-border bg-card/70 p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-body uppercase tracking-[0.16em] text-main-teal [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown size={16} className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 border-t border-border/75 pt-4">{contentsList}</div>
      </details>
    );
  }

  return (
    <nav aria-label={title} className="rounded-xl border border-border bg-card/70 p-5">
      <p className="mb-4 text-xs font-body uppercase tracking-[0.16em] text-main-teal">{title}</p>
      {contentsList}
    </nav>
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
  const articleHeadings = extractArticleHeadings(localizedContentHtml);
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
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              to={localePath(INSIGHTS_ROUTE_BASE)}
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              <ArrowLeft size={16} />
              {t('insightsPage.backToAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,44rem)] lg:gap-14 lg:items-start">
            <aside className="hidden lg:block lg:sticky lg:top-36">
              <ArticleContents headings={articleHeadings} title={t('insightsPage.contents')} />
            </aside>

            <article onClickCapture={handleInsightLinkClick}>
              <p className="eyebrow-pill eyebrow-pill-light mb-4 md:mb-6 inline-block">{t('insightsPage.eyebrow')}</p>
              <p className="text-sm font-body text-main-teal mb-4 md:mb-6">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {" · "}
                {post.readTimeMinutes} {t('common.minRead')}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-main-teal leading-tight mb-6 md:mb-8">
                {post.title}
              </h1>
              <p className="font-tertiary italic text-2xl md:text-3xl text-main-teal/90 mb-6 md:mb-10">{post.description}</p>
              <div className="mb-10 lg:hidden">
                <ArticleContents headings={articleHeadings} title={t('insightsPage.contents')} collapsible />
              </div>
              <section className="rounded-xl border border-border bg-card p-5 md:p-6 mb-10" aria-labelledby="quick-answer">
                <h2 id="quick-answer" className="font-display text-xl md:text-2xl text-main-teal mb-2">
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
                <h2 id="post-cta" className="font-display text-xl md:text-2xl text-main-teal mb-2">
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
                  <h2 id="related-insights" className="font-display text-2xl md:text-3xl text-main-teal mb-4">
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
          </div>
        </div>
      </main>
      <Footer hideWave />
      <JsonLd data={articleSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
    </>
  );
};

export default InsightPost;
