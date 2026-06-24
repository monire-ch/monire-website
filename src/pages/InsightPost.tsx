import { useEffect, useMemo, useState } from "react";
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

const CATEGORY_STYLES: Record<string, { text: string; bg: string }> = {
  "Automation": { text: "#A8D8C2", bg: "rgba(92, 183, 150, 0.15)" },
  "Web Design & Development": { text: "#9BBFDA", bg: "rgba(92, 150, 204, 0.15)" },
};

const CARD_STYLE = {
  background: "linear-gradient(145deg, rgba(8, 79, 97, 0.98) 0%, rgba(5, 67, 83, 0.98) 55%, rgba(4, 58, 73, 0.98) 100%)",
  borderColor: "rgba(183, 152, 78, 0.34)",
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
  activeHeadingId,
  collapsible = false,
}: {
  headings: ArticleHeading[];
  title: string;
  activeHeadingId?: string;
  collapsible?: boolean;
}) => {
  if (!headings.length) return null;

  const contentsList = (
    <ol className="space-y-3">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={activeHeadingId === heading.id ? "location" : undefined}
            className={[
              "block text-sm font-body leading-snug transition-colors duration-200",
              activeHeadingId === heading.id
                ? "text-[#F1D69A]"
                : "text-[#BFD0D6]/80 hover:text-[#F1D69A]",
            ].join(" ")}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );

  if (collapsible) {
    return (
      <details
        className="group rounded-xl border p-5"
        style={CARD_STYLE}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-body uppercase tracking-[0.16em] text-[#F1D69A] [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown size={16} className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(183, 152, 78, 0.2)" }}>
          {contentsList}
        </div>
      </details>
    );
  }

  return (
    <nav
      aria-label={title}
      className="rounded-xl border p-5"
      style={CARD_STYLE}
    >
      <p className="mb-4 text-xs font-body uppercase tracking-[0.16em] text-[#F1D69A]">{title}</p>
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
        ...(translatedPost && typeof translatedPost !== "string" ? translatedPost : {}),
      }
    : undefined;

  const localizedContentHtml = post?.contentHtml ? localizeInternalHtmlLinks(post.contentHtml, locale) : undefined;
  const articleHeadings = useMemo(() => extractArticleHeadings(localizedContentHtml), [localizedContentHtml]);
  const [activeHeadingId, setActiveHeadingId] = useState(articleHeadings[0]?.id);

  useEffect(() => {
    setActiveHeadingId(articleHeadings[0]?.id);
  }, [articleHeadings]);

  useEffect(() => {
    if (!articleHeadings.length) return;

    const headingElements = articleHeadings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headingElements.length) return;

    let activeId = headingElements[0].id;
    const updateActiveHeading = () => {
      const candidates = headingElements
        .map((element) => ({
          element,
          top: element.getBoundingClientRect().top,
        }))
        .filter(({ top }) => top <= 180);

      const nextActiveHeading = candidates.at(-1)?.element.id ?? headingElements[0].id;
      if (nextActiveHeading !== activeId) {
        activeId = nextActiveHeading;
        setActiveHeadingId(nextActiveHeading);
      }
    };

    updateActiveHeading();

    const observer = new IntersectionObserver(updateActiveHeading, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0, 1],
    });

    headingElements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [articleHeadings]);

  if (!post) {
    return <NotFound />;
  }

  const canonicalPath = localePath(`${INSIGHTS_ROUTE_BASE}/${post.slug}`);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const relatedPosts = INSIGHTS_POSTS.filter((candidate) => post.relatedSlugs.includes(candidate.slug)).map(
    (relatedPost) => ({
      ...relatedPost,
      ...(t(`insightsPosts.${relatedPost.slug}`, { returnObjects: true }) as Partial<InsightPost>),
    })
  );
  const categoryStyle = post.category ? CATEGORY_STYLES[post.category] : undefined;

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
    publisher: { "@type": "Organization", name: "Moniré", url: SITE_URL },
  };

  const faqSchema = post.faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
          <div className="mb-6">
            <Link
              to={localePath(INSIGHTS_ROUTE_BASE)}
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              <ArrowLeft size={16} />
              {t("insightsPage.backToAll")}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,44rem)] lg:gap-14 lg:items-start">
            <aside className="hidden lg:block lg:sticky lg:top-36">
              <ArticleContents
                headings={articleHeadings}
                title={t("insightsPage.contents")}
                activeHeadingId={activeHeadingId}
              />
            </aside>

            <article onClickCapture={handleInsightLinkClick}>
              {/* Header card */}
              <div className="rounded-xl border px-7 py-8 md:px-10 md:py-10 mb-8" style={CARD_STYLE}>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.category && (
                      <span
                        className="text-[11px] font-body tracking-[0.1em] uppercase rounded-full px-3 py-0.5"
                        style={
                          categoryStyle
                            ? { color: categoryStyle.text, background: categoryStyle.bg }
                            : { color: "#BFD0D6", background: "rgba(255,255,255,0.1)" }
                        }
                      >
                        {post.category}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-body tracking-[0.04em] uppercase text-[#7FA8B4]">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    {" · "}
                    {post.readTimeMinutes} {t("common.minRead")}
                  </p>
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F2F4F5] leading-tight mb-4 md:mb-6">
                  {post.title}
                </h1>
                <p className="font-tertiary italic text-xl md:text-2xl text-[#BFD0D6] leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Mobile TOC */}
              <div className="mb-8 lg:hidden">
                <ArticleContents
                  headings={articleHeadings}
                  title={t("insightsPage.contents")}
                  activeHeadingId={activeHeadingId}
                  collapsible
                />
              </div>

              {/* Quick answer */}
              <section
                className="rounded-none border-l-[3px] pl-5 md:pl-6 py-1 mb-10"
                style={{ borderColor: "rgba(183, 152, 78, 0.55)" }}
                aria-labelledby="quick-answer"
              >
                <h2 id="quick-answer" className="font-display text-xl md:text-2xl text-focus-teal mb-2">
                  {t("insightsPage.quickAnswer")}
                </h2>
                <p className="font-body text-base text-foreground/75 leading-relaxed">{post.quickAnswer}</p>
              </section>

              <div
                className="insight-prose"
                dangerouslySetInnerHTML={localizedContentHtml ? { __html: localizedContentHtml } : undefined}
              >
                {localizedContentHtml ? null : post.content}
              </div>

              {/* CTA */}
              <section
                className="rounded-xl border p-5 md:p-6 mt-10"
                style={{ ...CARD_STYLE, borderColor: "rgba(183, 152, 78, 0.5)" }}
                aria-labelledby="post-cta"
              >
                <h2 id="post-cta" className="font-display text-xl md:text-2xl text-[#F1D69A] mb-2">
                  {renderHeadingWithPunctuation(post.primaryCta.title ?? "")}
                </h2>
                <p className="font-body text-base text-[#BFD0D6] mb-5">{post.primaryCta.body}</p>
                <Link
                  to={localePath(post.primaryCta.href)}
                  className="inline-flex text-[0.875rem] font-body text-[#F1D69A] border rounded-full px-5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:text-[#F6DEAB] hover:border-[#F1D69A]/75 hover:bg-white/[0.04] hover:shadow-[0_6px_18px_rgba(2,28,36,0.18)]"
                  style={{ borderColor: "rgba(183, 152, 78, 0.5)" }}
                >
                  {post.primaryCta.label} →
                </Link>
              </section>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-12" aria-labelledby="related-insights">
                  <h2
                    id="related-insights"
                    className="font-display text-2xl md:text-3xl text-main-teal mb-4"
                  >
                    {t("insightsPage.related")}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {relatedPosts.map((relatedPost) => {
                      const relCategoryStyle = relatedPost.category
                        ? CATEGORY_STYLES[relatedPost.category]
                        : undefined;
                      return (
                        <li key={relatedPost.slug}>
                          <Link
                            to={localePath(`${INSIGHTS_ROUTE_BASE}/${relatedPost.slug}`)}
                            className="group block rounded-xl border px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(2,28,36,0.3)]"
                            style={CARD_STYLE}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex flex-col gap-1.5 min-w-0">
                                {relatedPost.category && (
                                  <span
                                    className="text-[10px] font-body tracking-[0.1em] uppercase rounded-full px-2.5 py-0.5 self-start"
                                    style={
                                      relCategoryStyle
                                        ? { color: relCategoryStyle.text, background: relCategoryStyle.bg }
                                        : { color: "#BFD0D6", background: "rgba(255,255,255,0.1)" }
                                    }
                                  >
                                    {relatedPost.category}
                                  </span>
                                )}
                                <span className="font-display text-base md:text-lg text-[#F2F4F5] leading-snug truncate">
                                  {relatedPost.title}
                                </span>
                              </div>
                              <span
                                className="shrink-0 text-[0.8rem] font-body text-[#F1D69A] border rounded-full px-4 py-1 transition-colors group-hover:border-[#F1D69A]/70"
                                style={{ borderColor: "rgba(183, 152, 78, 0.5)" }}
                              >
                                {t("common.readArticle")} →
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
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
