import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { INSIGHTS_POSTS, INSIGHTS_ROUTE_BASE } from "@/config/insightsPosts";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const Insights = () => {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Moniré Insights",
    url: `${SITE_URL}${INSIGHTS_ROUTE_BASE}`,
    about: "Practical guidance on web design, automation, and digital decisions that help your business grow.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INSIGHTS_POSTS.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${INSIGHTS_ROUTE_BASE}/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-20 px-6">
        <section className="max-w-5xl mx-auto">
          <p className="eyebrow-pill eyebrow-pill-light mb-5 inline-block">Insights</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-5">
            Insights for better websites and smarter workflows
          </h1>
          <p className="font-body text-base md:text-lg text-foreground/75 mb-12">
            Practical guidance on web design, automation, and digital decisions that help your business grow.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {INSIGHTS_POSTS.map((post) => (
              <li key={post.slug} className="h-full">
                <Link
                  to={`${INSIGHTS_ROUTE_BASE}/${post.slug}`}
                  onClick={() =>
                    trackEvent("blog_cta_click", {
                      location: "insights_listing",
                      label: post.slug,
                      destination: `${INSIGHTS_ROUTE_BASE}/${post.slug}`,
                      page_path: window.location.pathname,
                    })
                  }
                  className="block h-full group"
                >
                  <article
                    className="h-full rounded-xl border p-6 md:p-8 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_30px_rgba(2,28,36,0.34)] flex flex-col"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(8, 79, 97, 0.98) 0%, rgba(5, 67, 83, 0.98) 55%, rgba(4, 58, 73, 0.98) 100%)",
                      borderColor: "rgba(183, 152, 78, 0.34)",
                    }}
                  >
                    <p className="text-[13px] font-body tracking-[0.04em] uppercase text-[#BFD0D6] mb-3">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      {" · "}
                      {post.readTimeMinutes} min read
                    </p>
                    <h2 className="font-display text-2xl md:text-[2rem] leading-[1.1] text-[#F2F4F5] mb-4">{post.title}</h2>
                    <p className="text-[1.03rem] font-body leading-relaxed text-[#D5E2E7] mb-6">{post.description}</p>
                    <span className="mt-auto text-[0.96rem] font-body text-[#F1D69A] group-hover:text-[#F6DEAB] transition-colors underline group-hover:no-underline">
                      Read article
                    </span>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer hideWave />
      <JsonLd data={collectionSchema} />
    </>
  );
};

export default Insights;
