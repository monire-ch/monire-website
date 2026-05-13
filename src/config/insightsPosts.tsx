import type { ReactNode } from "react";

export type InsightPost = {
  slug: string;
  locale: "en";
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  quickAnswer: string;
  primaryCta: {
    title: string;
    body: string;
    label: string;
    href: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  relatedSlugs: string[];
  content: ReactNode;
};

const articleOneContent = (
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
        technical improvements can often make a significant difference.
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
      <p>
        If your contact form is your main way of getting enquiries, test it. Fill it in yourself and make sure the
        message actually arrives where it&apos;s supposed to.
      </p>
    </section>

    <section aria-labelledby="quick-self-check">
      <h2 id="quick-self-check">Quick website self-check</h2>
      <p>
        If you are not sure whether your website is helping or hurting your business, start with these questions:
      </p>
      <ul>
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
        At Moniré, we help small and mid-sized businesses identify what is working, what is not, and what would make
        the biggest difference first.
      </p>
    </section>
  </>
);

const articleTwoContent = (
  <>
    <p>
      If you&apos;ve been hearing a lot about AI lately and wondering whether any of it applies to you, you&apos;re
      not alone.
    </p>
    <p>
      Most of the conversation around AI automation is aimed at enterprise companies with large budgets and dedicated
      tech teams. For a small business owner, it can feel expensive and overly technical.
    </p>
    <p>
      But in practice, the most valuable automations for small businesses are often very simple. They&apos;re the
      repetitive tasks teams are doing manually every day that quietly eat up hours each week.
    </p>

    <section aria-labelledby="not-replacing-people">
      <h2 id="not-replacing-people">It&apos;s not about replacing people</h2>
      <p>
        The most common concern we hear is that automation means people will lose their jobs or decisions will get
        handed over to a machine. That&apos;s not what we build.
      </p>
      <p>
        Every workflow we create keeps a human in the loop. The AI handles the repetitive, time-consuming parts. The
        person reviews, confirms, and stays in control. The goal is to make sure your team&apos;s time and judgment
        goes toward work that actually needs it.
      </p>
    </section>

    <section aria-labelledby="in-practice">
      <h2 id="in-practice">What it looks like in practice</h2>
      <p>Here are three examples from work we&apos;ve done with real clients.</p>

      <h3>Expense receipts</h3>
      <p>
        One client was spending part of every month filing expense receipts by hand, chasing emails, renaming files,
        entering numbers into spreadsheets. It was slow, error-prone, and nobody enjoyed doing it.
      </p>
      <p>
        Now receipts arrive by email, get read automatically, and land in the right folder with the right information
        pulled out. The team reviews and confirms. That&apos;s it.
      </p>
      <p>
        The result was around 70% less time spent on that task every month, with fewer errors and a consistent archive
        that&apos;s always ready for review.
      </p>
      <p>
        You can read the full case study{" "}
        <a href="/case-studies/expense-receipt-automation" className="text-main-teal underline hover:no-underline">
          here
        </a>
        .
      </p>

      <h3>Client onboarding</h3>
      <p>
        When a client says yes to a project, there&apos;s a predictable set of things that need to happen. A contract
        needs to go out, an onboarding email needs to be sent, folders need to be created, tasks need to be set up
        internally.
      </p>
      <p>It&apos;s not complicated, but it takes time and it&apos;s easy to miss a step.</p>
      <p>
        With the right automation in place, all of that happens automatically the moment a project is confirmed. Every
        time, without anyone having to remember.
      </p>

      <h3>Community membership</h3>
      <p>
        When someone applies to join a private community and gets accepted, their account needs to be created across
        multiple platforms, and those platforms don&apos;t naturally talk to each other.
      </p>
      <p>
        Without automation, that means logging into each one separately and entering the same details manually.
      </p>
      <p>
        With a connected workflow, acceptance triggers the setup across every platform automatically. No copy-pasting,
        no manual setup, and much less risk of something being missed.
      </p>
    </section>

    <section aria-labelledby="common-pattern">
      <h2 id="common-pattern">The common pattern</h2>
      <p>All three examples follow the same pattern:</p>
      <p>Something happens, the same steps follow every time, and someone used to do all of it by hand.</p>
      <p>That&apos;s where automation tends to help most.</p>
      <p>
        Not creative decisions. Not judgment calls. Just the repetitive, predictable tasks that quietly eat up time.
      </p>
    </section>

    <section aria-labelledby="setup-complexity">
      <h2 id="setup-complexity">
        Is it complicated to set up
        <span className="insight-heading-punctuation">?</span>
      </h2>
      <p>It doesn&apos;t have to be.</p>
      <p>
        We build workflows using tools that connect to the systems businesses already use, including email,
        spreadsheets, cloud storage, CRMs, and membership platforms.
      </p>
      <p>There&apos;s no need to replace your existing setup or learn an entirely new way of working.</p>
      <p>The right automation fits around how you already work, not the other way around.</p>
    </section>

    <section aria-labelledby="where-to-start-ai">
      <h2 id="where-to-start-ai">Where to start</h2>
      <p>The best place to start is usually the task you do the most often and enjoy the least.</p>
      <p>If you find yourself:</p>
      <ul>
        <li>copying information between tools</li>
        <li>sending the same emails repeatedly</li>
        <li>creating the same folders or documents</li>
        <li>manually setting people up across platforms</li>
        <li>chasing small administrative tasks every week</li>
      </ul>
      <p>there&apos;s a good chance part of that process could be automated.</p>
      <p>
        Often, the best automation opportunities are not huge systems. They are small workflows that remove a few repetitive steps from your week.
      </p>
    </section>
  </>
);

const articleThreeContent = (
  <>
    <p>
      One of the easiest ways for a website project to become expensive or frustrating is choosing the wrong platform
      too early.
    </p>
    <p>
      We&apos;ve worked across many different website builders and built fully custom coded websites and applications.
      Here&apos;s how we actually think through the decision.
    </p>
    <p>
      There&apos;s no single platform that&apos;s right for every business. The right choice depends on what your site
      needs to do, who needs to manage it, and where the business is heading.
    </p>

    <section aria-labelledby="start-with-needs">
      <h2 id="start-with-needs">We start with what the site needs to do</h2>
      <p>
        Before we look at any platform, we want to understand the job the website has to do.
      </p>
      <p>
        A simple five-page site for a consultant has very different requirements to a membership platform, a
        booking-heavy service business, or a site that needs to connect to external tools. The platform choice follows
        the requirements. Not the other way around.
      </p>
      <p>Some things we ask early on:</p>
      <p>
        Will you be updating the site yourself, or will someone else manage it? How often will the content change?
        Does it need to connect to any other tools? How important is design quality to the brand? Is SEO performance a
        priority?
      </p>
      <p>The answers shape everything that follows.</p>
    </section>

    <section aria-labelledby="why-webflow">
      <h2 id="why-webflow">Why we often choose Webflow</h2>
      <p>
        A lot of the websites we build are marketing sites, service-based business sites, or CMS-driven sites that
        need to look great, perform well, and stay that way without ongoing technical work. That&apos;s where Webflow
        tends to stand out.
      </p>
      <p>
        The biggest practical advantage is that Webflow maintains the platform for you. There are no plugins to
        update, no security patches to apply, no risk of something breaking because two tools stopped working together.
        Day to day it runs without anyone needing to babysit it.
      </p>
      <p>
        Performance is also genuinely strong. Webflow sites load quickly, are built with clean code, and are
        structured in a way that search engines handle well. That&apos;s not always the case with platforms that rely
        heavily on third-party plugins to add functionality.
      </p>
      <p>
        On the design side, Webflow gives us more flexibility than most builders. Every site we build looks and feels
        unique to that business, not like a template with a logo swapped in.
      </p>
      <p>
        For many businesses, the cost structure is also simpler and more predictable than platforms that rely heavily
        on third-party plugins and ongoing maintenance work.
      </p>
      <p>
        We&apos;d suggest Webflow when design quality matters, performance and SEO are priorities, and the business
        wants a site that runs reliably without needing constant attention.
      </p>
    </section>

    <section aria-labelledby="wordpress-note">
      <h2 id="wordpress-note">A note on WordPress</h2>
      <p>
        WordPress powers a huge part of the internet and we&apos;ve built with it too. For content-heavy sites or
        businesses already deeply invested in the WordPress ecosystem, it can still be a reasonable option.
      </p>
      <p>
        That said, it&apos;s not our first recommendation. The main reason is maintenance. Plugins need updating,
        security vulnerabilities come up, and without regular attention things can break or slow down in ways that
        aren&apos;t always obvious. For small teams that don&apos;t want to think about technical upkeep, that overhead
        adds up and the ongoing costs are easy to underestimate at the start.
      </p>
      <p>
        A well-built WordPress site can work well. But in our experience, for most small businesses there are better
        options available now.
      </p>
    </section>

    <section aria-labelledby="custom-dev">
      <h2 id="custom-dev">When custom development makes sense</h2>
      <p>
        Sometimes a project goes beyond what any website builder is designed for. If a business needs highly custom
        backend logic, complex integrations, application-like functionality, or advanced user systems, custom
        development often becomes the better option.
      </p>
      <p>
        The tradeoff is time, cost, and ongoing maintenance responsibility. Not every business needs a fully custom
        build, even if it sounds impressive. In fact, many businesses are better served by a simpler system their team
        can realistically manage long-term.
      </p>
    </section>

    <section aria-labelledby="what-we-balance">
      <h2 id="what-we-balance">What we&apos;re actually trying to balance</h2>
      <p>
        We care less about using the most popular platform and more about choosing something that fits the business
        properly.
      </p>
      <p>
        A beautiful website doesn&apos;t help much if updating it becomes stressful. A highly custom setup isn&apos;t
        always a good thing if it creates unnecessary complexity. And the cheapest option upfront isn&apos;t always the
        cheapest over time.
      </p>
      <p>
        Most of the time we&apos;re trying to find the right balance between flexibility, ease of use, performance,
        maintainability, cost, and how the business actually operates day to day.
      </p>
    </section>

    <section aria-labelledby="question-most">
      <h2 id="question-most">The question that matters most</h2>
      <p>
        A lot of platform decisions get framed as technical debates, but for most businesses the real question is much
        simpler:
      </p>
      <p>Will this still work well for the team two to three years from now?</p>
      <p>Will people feel comfortable updating it?</p>
      <p>Will it become harder or more expensive to manage over time?</p>
      <p>
        Those questions usually matter more than which platform happens to be popular right now.
      </p>
    </section>
  </>
);

export const INSIGHTS_POSTS: InsightPost[] = [
  {
    slug: "what-ai-automation-actually-means-for-a-small-business",
    locale: "en",
    title: "What AI automation actually means for a small business",
    description:
      "A practical look at how small businesses can automate repetitive workflows while keeping people in control.",
    seoTitle: "What AI automation actually means for a small business | Moniré Insights",
    seoDescription:
      "A practical guide to AI automation for small businesses: where it helps most, real examples, and where to start.",
    keywords: ["AI automation for small business", "small business workflow automation", "automate admin tasks"],
    quickAnswer:
      "For small businesses, AI automation usually means removing repetitive admin steps while keeping people in control of decisions.",
    primaryCta: {
      title: "Ready to reduce repetitive work?",
      body: "We can look at your current workflow and tell you honestly where automation would help most.",
      label: "Book a free workflow review",
      href: "/contact",
    },
    publishedAt: "2026-05-13",
    readTimeMinutes: 7,
    relatedSlugs: ["website-builders-vs-custom-development", "why-your-website-might-be-losing-you-clients"],
    content: articleTwoContent,
  },
  {
    slug: "website-builders-vs-custom-development",
    locale: "en",
    title: "How we choose the right website platform for your business",
    description:
      "How we decide between website builders and custom development based on goals, maintenance, SEO, and long-term fit.",
    seoTitle: "Website Builder vs Custom Development: How We Choose | Moniré Insights",
    seoDescription:
      "How we choose between website builders and custom development based on business goals, SEO, maintainability, and long-term costs.",
    keywords: ["website builder vs custom development", "webflow vs custom website", "how to choose website platform"],
    quickAnswer:
      "We choose platforms based on business fit, maintainability, SEO and long-term cost, not on trends or technical hype.",
    primaryCta: {
      title: "Not sure which platform fits your business?",
      body: "We can help you choose a setup that fits your goals, team, and long-term growth plans.",
      label: "Get platform advice for your website",
      href: "/contact",
    },
    publishedAt: "2026-05-13",
    readTimeMinutes: 8,
    relatedSlugs: ["why-your-website-might-be-losing-you-clients", "what-ai-automation-actually-means-for-a-small-business"],
    content: articleThreeContent,
  },
  {
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
    content: articleOneContent,
  },
];

export const INSIGHTS_ROUTE_BASE = "/insights";

export const getInsightPostBySlug = (slug: string) => INSIGHTS_POSTS.find((post) => post.slug === slug);
