import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { INSIGHTS_POSTS, INSIGHTS_ROUTE_BASE, getInsightPostBySlug } from "@/config/insightsPosts";
import NotFound from "@/pages/NotFound";
import { SITE_URL } from "@/lib/seo";

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
  const { slug } = useParams();
  const post = slug ? getInsightPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const canonicalPath = `${INSIGHTS_ROUTE_BASE}/${post.slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const relatedPosts = INSIGHTS_POSTS.filter((candidate) => post.relatedSlugs.includes(candidate.slug));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en",
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

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <p className="eyebrow-pill eyebrow-pill-light mb-5 inline-block">Insights</p>
          <p className="text-sm font-body text-main-teal mb-4">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {" · "}
            {post.readTimeMinutes} min read
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-tertiary italic text-2xl md:text-3xl text-main-teal/90 mb-10">{post.description}</p>
          <section className="rounded-xl border border-border bg-card p-5 md:p-6 mb-10" aria-labelledby="quick-answer">
            <h2 id="quick-answer" className="font-display text-xl md:text-2xl text-foreground mb-2">
              Quick answer
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">{post.quickAnswer}</p>
          </section>

          <div className="insight-article">
            {post.content}
          </div>

          <section className="rounded-xl border border-border bg-card p-5 md:p-6 mt-10" aria-labelledby="post-cta">
            <h2 id="post-cta" className="font-display text-xl md:text-2xl text-foreground mb-2">
              {renderHeadingWithPunctuation(post.primaryCta.title)}
            </h2>
            <p className="font-body text-base text-foreground/80 mb-4">
              {post.primaryCta.body}
            </p>
            <Link
              to={post.primaryCta.href}
              className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              {post.primaryCta.label}
            </Link>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-12 pt-6 border-t border-border" aria-labelledby="related-insights">
              <h2 id="related-insights" className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Related insights
              </h2>
              <ul className="space-y-2">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <Link
                      to={`${INSIGHTS_ROUTE_BASE}/${relatedPost.slug}`}
                      className="text-base font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
                    >
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-12 pt-6 border-t border-border">
            <Link
              to={INSIGHTS_ROUTE_BASE}
              className="text-sm font-body font-medium text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>
      </main>
      <Footer hideWave />
      <JsonLd data={articleSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
    </>
  );
};

export default InsightPost;
