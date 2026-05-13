import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { INSIGHTS_POSTS, INSIGHTS_ROUTE_BASE } from "@/config/insightsPosts";
import { SITE_URL } from "@/lib/seo";

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

          <ul className="grid grid-cols-1 gap-5">
            {INSIGHTS_POSTS.map((post) => (
              <li key={post.slug}>
                <Link to={`${INSIGHTS_ROUTE_BASE}/${post.slug}`} className="block group">
                  <article className="rounded-xl border border-border bg-card p-6 md:p-8 transition-colors group-hover:border-main-teal/40">
                    <p className="text-sm font-body text-main-teal mb-2">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      {" · "}
                      {post.readTimeMinutes} min read
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{post.title}</h2>
                    <p className="text-base font-body text-foreground/75 mb-5">{post.description}</p>
                    <span className="text-sm font-body text-main-teal group-hover:text-soft-teal transition-colors underline group-hover:no-underline">
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
