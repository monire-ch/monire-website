import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandButton from "@/components/BrandButton";
import ContactForm from "@/components/ContactForm";
import PricingSection, { type PricingSectionContent } from "@/components/PricingSection";
import { trackEvent } from "@/lib/analytics";
import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import labsift from "@/assets/portfolio/labsift-og-image.webp";
import nikky from "@/assets/nicole.jpg";
import monika from "@/assets/monika.jpg";
import vetEditorialAnimals from "@/assets/vet-editorial-animals.png";
import goldFill from "@/assets/gold-fill.webp";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";

type AudienceId = "practices" | "animal-health" | "software-teams";

type Audience = {
  id: AudienceId;
  tab: string;
  label: string;
  title: string;
  intro: string;
  items: string[];
  cta: string;
  partner?: boolean;
};

const audiences: Audience[] = [
  {
    id: "practices",
    tab: "Veterinary practices",
    label: "For veterinary practices",
    title: "A clearer website and less admin for your team.",
    intro: "If your website no longer reflects your practice, or your team spends too much time answering the same questions and moving information by hand, we can help.",
    items: [
      "Practice websites that make services, booking and next steps easy to find",
      "Intake, enquiry and follow-up workflows that work with your existing software",
      "Simple internal tools for protocols, onboarding and information your team needs",
    ],
    cta: "Talk to us about your practice",
  },
  {
    id: "animal-health",
    tab: "Animal health",
    label: "For animal-health companies",
    title: "Websites and tools built for veterinary audiences.",
    intro: "We design and build the digital side of your project, using the positioning, scientific content and approved materials your team provides.",
    items: [
      "Product websites, launch sites and education pages",
      "Professional areas for gated veterinary content and resources",
      "Calculators, guides and practical tools connected to your existing systems",
    ],
    cta: "Talk to us about your project",
    partner: true,
  },
  {
    id: "software-teams",
    tab: "Veterinary software",
    label: "For veterinary software teams",
    title: "Software that fits the way clinics actually work.",
    intro: "A workflow can look convincing in a demo and still fall apart at a busy reception desk. We bring veterinary context into the design and build process.",
    items: [
      "Workflow and usability reviews grounded in real clinic experience",
      "Product UX, prototypes and frontend development in React, TypeScript and Vue",
      "Product websites, onboarding and help content that make the software easier to use",
    ],
    cta: "Talk to us about your product",
  },
];

const vetPricingContent: PricingSectionContent = {
  title: "Clear starting prices for websites.",
  titleAccent: "Other work is scoped around your needs.",
  webDesignTab: "Website packages",
  otherServicesTab: "Other services",
  websitePlanDescriptions: [
    "A clear, professional website for an independent veterinary practice or small veterinary business",
    "A more strategic website for a growing practice, referral centre or animal-health team",
    "A larger digital platform for multi-location practices, animal-health companies or veterinary products",
  ],
  customWebsiteTitle: "Not sure which website package fits?",
  customWebsiteDescription: "Tell us what you need the website to do and we will recommend the right scope. If none of the packages fits, we can quote a custom website.",
  otherServices: {
    title: "A clear quote based on the work involved.",
    description: "Software, product work and workflow automations vary too much for useful package prices. We first understand the problem, the people using it and the systems involved, then give you a written scope and price before we start.",
    items: [
      { title: "Workflow automations", description: "For repetitive admin, handovers and information that needs to move between the tools your team already uses." },
      { title: "Product UX and frontend", description: "For veterinary software teams that need workflow input, interface design, prototypes or production frontend development." },
      { title: "Custom software and tools", description: "For calculators, internal tools and purpose-built software that does not fit into an off-the-shelf system." },
    ],
    cta: "Tell us about your project",
  },
};

const SectionHeading = ({ label, title, dark = false }: { label: string; title: string; dark?: boolean }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
    <span className={`eyebrow-pill mb-4 ${dark ? "eyebrow-pill-dark" : "eyebrow-pill-light"}`}>{label}</span>
    <h2 className={`font-body text-3xl leading-tight md:text-4xl ${dark ? "text-off-white" : "text-main-teal"}`}>{title}</h2>
  </div>
);

const Vet = () => {
  const fontsLoaded = useFontsLoaded();
  const [animateHero, setAnimateHero] = useState(false);
  const [activeAudience, setActiveAudience] = useState<AudienceId>("practices");

  useEffect(() => {
    if (fontsLoaded) requestAnimationFrame(() => setAnimateHero(true));
  }, [fontsLoaded]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Veterinary Websites, Software & Automations | Moniré";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const selectFromHash = () => {
      const hash = window.location.hash.slice(1) as AudienceId;
      if (audiences.some((audience) => audience.id === hash)) setActiveAudience(hash);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  const heroWords = "Veterinary experience meets software expertise".split(" ");
  const audience = audiences.find((item) => item.id === activeAudience) ?? audiences[0];
  const vetNavLinks = [
    { label: "About", href: "#about" },
    { label: "Our work", href: "#vet-work" },
    { label: "Who we help", href: "#services" },
    { label: "Pricing", href: "#pricing" },
  ];

  const scrollTo = (id: string) => {
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const contactFor = (selectedAudience: AudienceId) => {
    window.dispatchEvent(new CustomEvent("vet-audience", { detail: selectedAudience }));
    const url = new URL(window.location.href);
    url.searchParams.set("for", selectedAudience);
    url.hash = "contact";
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    trackEvent("vet_cta", { audience: selectedAudience, location: "audience_toggle" });
  };

  return (
    <>
      <Navbar pageLinks={vetNavLinks} contactHref="#contact" />
      <main className="bg-off-white">
        <section id="top" className="hero-bg relative flex min-h-screen items-center justify-center px-6 pb-44 pt-36 text-center text-off-white md:pb-56 md:pt-48">
          <div className="relative z-10 mx-auto w-full max-w-5xl px-2 xs:px-8">
            <h1 className="hero-title mx-auto mb-6 max-w-4xl text-[38px] sm:text-[52px] md:mb-8 md:text-[70px]">
              {heroWords.map((word, index) => (
                <span key={`${word}-${index}`} className={`hero-word ${animateHero ? "visible" : ""} inline-block pb-2`} style={{ transitionDelay: `${60 * index}ms`, backgroundImage: `url(${goldFill})`, backgroundSize: "100% auto", backgroundPosition: "center", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                  {word}{index < heroWords.length - 1 ? "\u00a0" : ""}
                </span>
              ))}
            </h1>
            <p className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mx-auto mb-9 max-w-3xl text-base leading-[1.55] text-off-white/90 md:text-xl`} style={{ transitionDelay: "320ms" }}>
              Websites, software and workflow automations for veterinary practices, animal health and veterinary software companies. Led by <span className="text-gold-text">Dr. Nikky Pyra</span>, veterinarian and software engineer.
            </p>
            <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} flex flex-col items-center justify-center gap-3 sm:flex-row`} style={{ transitionDelay: "400ms" }}>
              <BrandButton type="button" variant="hero" showStar className="text-base" onClick={() => scrollTo("contact")}>Talk to us</BrandButton>
              <BrandButton type="button" variant="secondary" className="text-base" onClick={() => scrollTo("vet-work")}>See our work</BrandButton>
            </div>
          </div>
          <div className="wave-mask absolute -bottom-1.5 left-0 right-0">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-10 w-full md:h-auto"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
        </section>

        <section id="about" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
          <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading dark label="About Moniré" title="Software experience, with veterinary context built in." />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[
                { image: nikky, name: "Dr. Nikky Pyra", role: "Co-founder, Veterinarian & Software Engineer", bio: "Nikky practised small-animal medicine for six years in Canada and Germany before moving into software. She has spent six years as a frontend engineer building with React, TypeScript and Vue. She also created LabSift, a privacy-first tool for pulling lab values out of PDF reports." },
                { image: monika, name: "Monika Märki", role: "Co-founder, Software Engineer" },
              ].map((person) => (
                <article key={person.name} className="grid overflow-hidden rounded-xl border border-neutral-border bg-neutral-card sm:grid-cols-[180px_1fr]">
                  <img src={person.image} alt={`${person.name} portrait`} className="h-full min-h-64 w-full object-cover" />
                  <div className="p-7">
                    <h3 className="font-display text-3xl text-main-teal">{person.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-main-teal/65">{person.role}</p>
                    {person.bio && <p className="mt-4 text-sm leading-relaxed text-main-teal/80">{person.bio}</p>}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-off-white/15 bg-off-white/[0.06] p-8">
              <p className="text-xs uppercase tracking-widest text-gold-text">Our strategy partner</p>
              <h3 className="mt-2 font-display text-2xl text-off-white">Linley Collaborative</h3>
              <p className="mt-3 max-w-3xl text-off-white/75">For animal-health projects that also need commercial strategy or scientific messaging, we work with Linley Collaborative. They lead that work; we design and build the website or tool.</p>
              <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-gold-text underline decoration-gold underline-offset-4">Visit Linley Collaborative →</a>
            </div>
          </div>
        </section>

        <figure className="relative h-[280px] overflow-hidden md:h-[420px]">
          <img src={vetEditorialAnimals} alt="A dog and cat resting in a contemporary veterinary consultation room" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ink/30 via-transparent to-deep-ink/10" aria-hidden="true" />
        </figure>

        <section id="vet-work" className="scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading label="Selected work" title="Veterinary experience is useful. The work still has to be good." />
            <div className="grid gap-6 lg:grid-cols-2">
              <Link to="/case-studies/snip-squad" className="group overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card">
                <div className="h-[360px] overflow-y-auto bg-white md:h-[460px]" aria-label="Scrollable Snip Squad website preview">
                  <img src={snipSquad} alt="Snip Squad veterinary clinic website" className="block h-auto w-full" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary website · Webflow</p>
                  <h3 className="mt-3 font-display text-3xl text-main-teal">Snip Squad</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">A clear, approachable website for a nonprofit veterinary clinic providing affordable care in underserved communities.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4">Read the case study <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
              <Link to="/case-studies/labsift" className="group overflow-hidden rounded-2xl border border-neutral-border bg-white">
                <div className="flex h-[360px] items-center justify-center bg-white p-6 md:h-[460px] md:p-10">
                  <img src={labsift} alt="LabSift lab report results interface" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="border-t border-neutral-border bg-neutral-card p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary software · React and TypeScript</p>
                  <h3 className="mt-3 font-display text-3xl text-main-teal">LabSift</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">Our own browser tool for turning PDF lab reports into a consistent, copy-ready list without sending reports to a server.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4">Read the case study <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="services" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
          <span id="practices" className="absolute top-0 scroll-mt-28" aria-hidden="true" />
          <span id="animal-health" className="absolute top-0 scroll-mt-28" aria-hidden="true" />
          <span id="software-teams" className="absolute top-0 scroll-mt-28" aria-hidden="true" />
          <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading dark label="How we can help" title="Start with the kind of team you are." />
            <div className="mx-auto mb-10 flex max-w-3xl flex-col gap-2 rounded-2xl border border-off-white/15 bg-off-white/[0.06] p-2 sm:flex-row" role="tablist" aria-label="Customer type">
              {audiences.map((item) => (
                <button key={item.id} type="button" role="tab" aria-selected={activeAudience === item.id} aria-controls={`panel-${item.id}`} onClick={() => { setActiveAudience(item.id); trackEvent("vet_tile_click", { audience: item.id }); }} className={`min-h-12 flex-1 rounded-xl px-4 py-3 text-sm transition-colors ${activeAudience === item.id ? "bg-off-white text-main-teal shadow-md" : "text-off-white/70 hover:bg-off-white/[0.06] hover:text-off-white"}`}>
                  {item.tab}
                </button>
              ))}
            </div>

            <div id={`panel-${audience.id}`} role="tabpanel" className="rounded-2xl border border-off-white/15 bg-off-white/[0.07] p-7 md:p-12 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-text">{audience.label}</p>
              <h3 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-off-white md:text-6xl">{audience.title}</h3>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-off-white/80 md:text-xl">{audience.intro}</p>
              <ul className="mt-9 grid gap-5 md:grid-cols-3">
                {audience.items.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl border border-off-white/10 bg-off-white/[0.05] p-5 text-off-white/85">
                    <Check size={18} className="mt-0.5 shrink-0 text-gold-text" /><span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              {audience.partner && <p className="mt-7 text-sm leading-relaxed text-off-white/70">Need commercial strategy or scientific messaging too? <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="text-gold-text underline decoration-gold underline-offset-4">Linley Collaborative</a> can lead that part of the project while we handle the design and build.</p>}
              <div className="mt-9"><BrandButton type="button" variant="primary" showStar className="text-sm" data-track="vet-cta" data-audience={audience.id} onClick={() => contactFor(audience.id)}>{audience.cta}</BrandButton></div>
            </div>
          </div>
        </section>

        <div className="dark-teal-surface"><PricingSection content={vetPricingContent} onContactClick={() => scrollTo("contact")} /></div>

        <section id="contact" className="scroll-mt-28 dark-teal-surface px-6 pb-24 pt-8 md:pb-32 md:pt-12">
          <div className="mx-auto grid max-w-6xl gap-12 border-t border-off-white/10 pt-20 lg:grid-cols-2 md:pt-24">
            <div>
              <span className="eyebrow-pill eyebrow-pill-dark mb-4">Contact</span>
              <h2 className="font-display text-4xl text-off-white md:text-5xl">Tell us what you need to build.</h2>
              <p className="mt-5 text-lg leading-relaxed text-off-white/75">Whether it is a new website, a product interface or a workflow that needs improving, tell us what is happening and what you would like to change. You do not need to arrive with the technical solution.</p>
              <p className="mt-5 text-sm leading-relaxed text-off-white/60">Based in Zürich and working in English and German. We work remotely with clients in Switzerland and abroad, and can visit veterinary practices in Switzerland when seeing the workflow in person would help.</p>
              <a href="mailto:hello@monire.ch" className="mt-6 inline-block text-gold-text underline decoration-gold underline-offset-4">hello@monire.ch</a>
            </div>
            <ContactForm variant="page" formName="vet-contact" formLocation="vet_page" mode="vet" />
          </div>
        </section>
      </main>
      <Footer hideWave pageLinks={[...vetNavLinks, { label: "Contact", href: "#contact" }]} />
    </>
  );
};

export default Vet;
