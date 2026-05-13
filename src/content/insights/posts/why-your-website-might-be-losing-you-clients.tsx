import type { InsightPost } from "../types";

const content = (
<>
    <p>
      Most business owners know their website isn&apos;t perfect. Fewer realise it might be actively costing them
      clients.
    </p>
    <p>
      The problem is that a website can look fine and still be failing. It can be live, reasonably well designed, and
      totally invisible to the people you&apos;re trying to reach. Or visible, but doing nothing to convince them to get
      in touch.
    </p>
    <p>Here are seven signs to look out for.</p>

    <section aria-labelledby="hero-section-problem">
      <h2 id="hero-section-problem">1. Your hero section doesn&apos;t explain what you do</h2>
      <p>
        The hero is the first thing someone sees when they land on your site. You have a few seconds to answer one
        question: what does this business actually do?
      </p>
      <p>
        Most hero sections fail this test. They lead with a tagline that sounds good but says nothing. &quot;Empowering
        businesses to grow.&quot; &quot;Your success is our mission.&quot; &quot;Taking things to the next level.&quot;
      </p>
      <p>None of those tell a visitor what you do, who you do it for, or why they should stay.</p>
      <p>
        A simple test: cover your logo and show the page to someone who doesn&apos;t know your business. Can they tell
        what you do within five seconds? If not, your hero needs work.
      </p>
    </section>

    <section aria-labelledby="client-focused-content">
      <h2 id="client-focused-content">2. The content is about you, not your client</h2>
      <p>This is the most common mistake, and the hardest one to self-diagnose.</p>
      <p>
        &quot;We are a leading provider of...&quot; &quot;We have over 20 years of experience...&quot; &quot;We are
        passionate about...&quot;
      </p>
      <p>
        Your visitors don&apos;t arrive wondering about you. They arrive with a problem. They want to know whether you
        can solve it.
      </p>
      <p>
        The shift is simple in theory but hard in practice. Instead of &quot;We build websites for small businesses,&quot;
        try &quot;Get a website that actually brings in clients.&quot; Same information, completely different focus.
      </p>
      <p>
        Read through your homepage and count how many sentences start with &quot;we.&quot; Then rewrite them from the
        client&apos;s perspective.
      </p>
    </section>

    <section aria-labelledby="clear-cta">
      <h2 id="clear-cta">3. There&apos;s no clear call to action</h2>
      <p>If someone reads your site and wants to take the next step, what do they do?</p>
      <p>
        If the answer isn&apos;t immediately obvious, you&apos;re losing people. Visitors won&apos;t hunt around for a
        way to contact you. They&apos;ll leave.
      </p>
      <p>
        Every page should have one clear primary action. Not three. Not a contact button buried in the footer alongside
        six other links. One clear next step that tells the visitor exactly what to do and what to expect when they do
        it.
      </p>
      <p>
        Not sure whether your site gives visitors a clear next step? It&apos;s one of the first things we look at when
        we work with a new client.
      </p>
      <aside className="insight-pullquote" aria-label="Key takeaway">
        <p>One clear next step on every page beats five competing choices.</p>
      </aside>
    </section>

    <section aria-labelledby="mobile-breaks">
      <h2 id="mobile-breaks">4. It breaks on mobile</h2>
      <p>
        More than 60% of web traffic comes from phones. If your site doesn&apos;t work properly on mobile, you&apos;re
        losing more than half your potential visitors before they&apos;ve even read a word.
      </p>
      <p>
        This isn&apos;t just about things looking slightly different on a smaller screen. Buttons that are too small to
        tap, text that runs off the edge, images that don&apos;t resize, menus that don&apos;t open. All of these tell a
        visitor the site wasn&apos;t built with them in mind.
      </p>
      <p>
        Pull out your phone and go through your site properly. Not a quick glance. Actually try to use it the way a new
        visitor would.
      </p>
    </section>

    <section aria-labelledby="slow-loads">
      <h2 id="slow-loads">5. It loads too slowly</h2>
      <p>Most people will leave a page that takes more than three seconds to load. They won&apos;t wait and they won&apos;t come back.</p>
      <p>
        Slow sites lose visitors before the design, copy, or photography have a chance to do their job. This is
        especially true on mobile, where people are often browsing with less patience and weaker connections.
      </p>
      <p>
        If your site feels slow, or if visitors seem to drop off before engaging, it is worth looking into. Small
        technical improvements can often make a significant difference. But if your site is slow because of heavy
        templates, unnecessary plugins, or a setup that is difficult to maintain, it may be worth{" "}
        <a
          href="/insights/website-builders-vs-custom-development"
          className="text-main-teal underline hover:no-underline"
        >
          reconsidering the platform behind it
        </a>
        .
      </p>
    </section>

    <section aria-labelledby="search-visibility">
      <h2 id="search-visibility">6. It doesn&apos;t show up on Google or AI search</h2>
      <p>A website being live does not mean people can find it.</p>
      <p>
        Search engines like Google, and increasingly AI tools like ChatGPT, need to be able to read, understand, and
        index your site before they can show it to anyone. If the technical foundations are not in place, your site may
        be effectively invisible, even to people who are actively looking for what you offer.
      </p>
      <p>
        Most business owners never check this. They assume that because the site is up, people can find it. Often
        that&apos;s not the case.
      </p>
      <p>
        A simple way to think about it: how would a new client find you if they had never heard of you? If the only way
        someone can reach your site is by already knowing your name, your website isn&apos;t doing enough work.
      </p>
    </section>

    <section aria-labelledby="contact-form">
      <h2 id="contact-form">7. Your contact form goes nowhere</h2>
      <p>This one sounds unlikely but we have seen it on real client sites more than once.</p>
      <p>
        Forms that were never properly connected to an email address. Inboxes that nobody checks anymore. Confirmation
        messages that go straight to spam. A potential client fills in the form, waits for a response, hears nothing,
        and moves on.
      </p>
      <div className="insight-stat-break" role="note" aria-label="Practical check">
        <strong>Simple test: submit your own form today.</strong>
        <span>If you don&apos;t receive the enquiry, your visitors probably don&apos;t either.</span>
      </div>
    </section>

    <section aria-labelledby="quick-self-check">
      <h2 id="quick-self-check">Quick website self-check</h2>
      <p>
        If you are not sure whether your website is helping or hurting your business, start with these questions:
      </p>
      <ul className="insight-checklist">
        <li>Can a stranger understand what you do within five seconds?</li>
        <li>Is your main call to action easy to find?</li>
        <li>Does your homepage speak more about your client&apos;s needs than your company?</li>
        <li>Does the site work smoothly on mobile?</li>
        <li>Does it load quickly enough to feel easy to use?</li>
        <li>Can new clients find you through search or AI tools?</li>
        <li>Does your contact form actually deliver enquiries?</li>
      </ul>
      <p>If you answered no to some of these, your website is likely costing you clients.</p>
    </section>

    <section aria-labelledby="where-next">
      <h2 id="where-next">Where to go from here</h2>
      <p>You don&apos;t have to fix everything at once. Start with whichever one is most likely to be costing you enquiries right now.</p>
      <p>
        <a href="/" className="text-main-teal underline hover:no-underline">At Moniré</a>, we help small and mid-sized businesses identify what is working, what is not, and what would make
        the biggest difference first.
      </p>
    </section>
  </>
);

export const whyYourWebsiteMightBeLosingYouClientsPost: InsightPost = {
  slug: "why-your-website-might-be-losing-you-clients",
  locale: "en",
  title: "Why your website might be losing you clients",
  description:
    "Seven practical signs your website may be costing you enquiries, plus a quick self-check to prioritize what to fix first.",
  seoTitle: "Why your website might be losing you clients | Moniré Insights",
  seoDescription:
    "Seven practical signs your website may be costing you enquiries, plus a self-check to prioritize what to fix first.",
  keywords: ["website losing clients", "improve website conversion", "small business website mistakes"],
  quickAnswer:
    "If visitors cannot quickly understand what you do, trust your offer, and take a clear next step, your website is likely costing you leads.",
  primaryCta: {
    title: "Not sure if your website needs a redesign?",
    body: "We can take a look at your current site and help you understand whether it needs focused improvements or a stronger foundation.",
    label: "Book a free website consultation",
    href: "/contact",
  },
  publishedAt: "2026-05-13",
  readTimeMinutes: 8,
  relatedSlugs: ["website-builders-vs-custom-development", "what-ai-automation-actually-means-for-a-small-business"],
  content,
};
