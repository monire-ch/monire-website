import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { INSIGHTS_POSTS, INSIGHTS_ROUTE_BASE, type InsightPost } from "@/config/insightsPosts";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { useLocalePath } from "@/hooks/useLocalePath";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const CATEGORY_STYLES: Record<string, { text: string; bg: string }> = {
  "Automation": {
    text: "#A8D8C2",
    bg: "rgba(92, 183, 150, 0.15)",
  },
  "Web Design & Development": {
    text: "#9BBFDA",
    bg: "rgba(92, 150, 204, 0.15)",
  },
};

const Insights = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const localePath = useLocalePath();
  const localizedInsightsPath = localePath(INSIGHTS_ROUTE_BASE);
  const posts = INSIGHTS_POSTS.map((post) => ({
    ...post,
    ...(t(`insightsPosts.${post.slug}`, { returnObjects: true }) as Partial<InsightPost>),
  }));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t('insightsPage.schemaName'),
    url: `${SITE_URL}${localizedInsightsPath}`,
    about: t('insightsPage.intro'),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${localePath(`${INSIGHTS_ROUTE_BASE}/${post.slug}`)}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-20 px-6">
        <section className="max-w-5xl mx-auto">
          <p className="eyebrow-pill eyebrow-pill-light mb-3 md:mb-5 inline-block">{t('insightsPage.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-main-teal leading-tight mb-5">
            {t('insightsPage.title')}
          </h1>
          <p className="font-body text-base md:text-lg text-foreground/75 mb-8 md:mb-12">
            {t('insightsPage.intro')}
          </p>

          <ul className="flex flex-col gap-5">
            {posts.map((post, index) => {
              const categoryStyle = post.category ? CATEGORY_STYLES[post.category] : undefined;
              return (
                <li key={post.slug}>
                  <Link
                    to={localePath(`${INSIGHTS_ROUTE_BASE}/${post.slug}`)}
                    onClick={() =>
                      trackEvent("blog_cta_click", {
                        location: "insights_listing",
                        label: post.slug,
                        destination: `${INSIGHTS_ROUTE_BASE}/${post.slug}`,
                        page_path: window.location.pathname,
                        locale: location.pathname.startsWith('/de') ? 'de' : 'en',
                      })
                    }
                    className="block group"
                  >
                    <article
                      className="rounded-xl border px-7 py-6 md:px-10 md:py-8 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_30px_rgba(2,28,36,0.34)] flex flex-col gap-3 md:gap-4"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(8, 79, 97, 0.98) 0%, rgba(5, 67, 83, 0.98) 55%, rgba(4, 58, 73, 0.98) 100%)",
                        borderColor: "rgba(183, 152, 78, 0.34)",
                      }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.category && (
                          <span
                            className="text-[11px] font-body tracking-[0.1em] uppercase rounded-full px-3 py-0.5"
                            style={categoryStyle
                              ? { color: categoryStyle.text, background: categoryStyle.bg }
                              : { color: "#BFD0D6", background: "rgba(255,255,255,0.1)" }
                            }
                          >
                            {post.category}
                          </span>
                        )}
                        {index === 0 && (
                          <span className="text-[11px] font-body tracking-[0.1em] uppercase text-[#F1D69A] bg-[#F1D69A]/10 rounded-full px-3 py-0.5">
                            {t('common.latest')}
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.25rem] leading-[1.1] text-[#F2F4F5]">
                        {post.title}
                      </h2>

                      <p className="font-body text-[0.95rem] md:text-base leading-relaxed text-[#BFD0D6]">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
                        <p className="text-[12px] font-body tracking-[0.04em] uppercase text-[#7FA8B4]">
                          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                          {" · "}
                          {post.readTimeMinutes} {t('common.minRead')}
                        </p>
                        <span
                          className="text-[0.875rem] font-body text-[#F1D69A] border rounded-full px-5 py-1.5 transition-colors group-hover:border-[#F1D69A]/70 group-hover:text-[#F6DEAB]"
                          style={{ borderColor: "rgba(183, 152, 78, 0.5)" }}
                        >
                          {t('common.readArticle')} →
                        </span>
                      </div>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer hideWave />
      <JsonLd data={collectionSchema} />
    </>
  );
};

export default Insights;
