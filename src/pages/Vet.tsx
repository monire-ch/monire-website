import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandButton from "@/components/BrandButton";
import ContactForm from "@/components/ContactForm";
import PricingSection, { type PricingSectionContent } from "@/components/PricingSection";
import { trackEvent } from "@/lib/analytics";
import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import labsift from "@/assets/portfolio/labsift-site.webp";
import nikky from "@/assets/nicole.jpg";
import monika from "@/assets/monika.jpg";
import vetEditorialAnimals from "@/assets/vet-editorial-animals.png";
import vetServicesConsultation from "@/assets/vet-services-consultation.png";
import goldFill from "@/assets/gold-fill.webp";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";

type AudienceId = "practices" | "animal-health" | "software-teams";

type Audience = {
  id: AudienceId;
  tab: string;
  title: string;
  intro: string;
  items: string[];
  cta: string;
  partner?: boolean;
  note?: string;
};

const audiences: Audience[] = [
  {
    id: "practices",
    tab: "Veterinary practices",
    title: "A clearer website. Less admin for your team.",
    intro: "When your website no longer reflects your practice, or your team spends hours answering the same questions and copying information between systems, we design and build something better.",
    items: [
      "Practice websites that make services, booking and next steps easy to find",
      "Round-the-clock website assistants that reduce routine questions by sharing veterinary-approved information and directing medical concerns to your team",
      "Automations that connect the tools you already use, so intake, reminders, follow-ups and handovers keep moving without manual work",
      "Custom software for tasks your practice software does not cover",
    ],
    cta: "Talk to us about your practice",
  },
  {
    id: "animal-health",
    tab: "Animal health",
    title: "Make complex veterinary information clear and useful.",
    intro: "We turn your approved scientific and commercial content into websites and software that veterinary professionals can understand, trust and use.",
    items: [
      "Product websites, launch sites and educational resources",
      "Automations that connect the systems you already use, so enquiries, sample requests and handovers to sales keep moving without manual work",
      "Login-only areas where veterinary professionals can access approved resources",
      "Calculators, product finders and software for veterinary customers and sales teams",
      "AI assistants that answer only from your approved information",
    ],
    cta: "Talk to us about your project",
    partner: true,
  },
  {
    id: "software-teams",
    tab: "Veterinary software",
    title: "Clinical expertise, UX and development for veterinary software.",
    intro: "Software can impress in a demo and still frustrate a busy practice, where staff have little time to learn new systems. We advise, design and build with your team to close that gap.",
    items: [
      "A veterinarian’s review of your product: where it doesn’t fit clinic workflows, where staff get stuck and what to change",
      "Redesigned screens and workflows that busy staff can use with minimal training",
      "Onboarding flows and help content that get new clinics using your product faster",
      "Frontend development in React, Vue and TypeScript, inside your existing codebase",
    ],
    cta: "Talk to us about your product",
    note: "No engineering team yet? We can design and build your product with you.",
  },
];

const vetPricingContent: PricingSectionContent = {
  title: "You’ll know the price before we start.",
  titleAccent: "",
  webDesignTab: "Website packages",
  otherServicesTab: "Other services",
  websitePlanDescriptions: [
    "A clear, professional website for an independent veterinary practice or small veterinary business",
    "A more strategic website for a growing practice, referral centre or animal health team",
    "A larger digital platform for multi-location practices, animal health companies or veterinary products",
  ],
  customWebsiteTitle: "Not sure which website package fits?",
  customWebsiteDescription: "Tell us what you need the website to do and we will recommend the right scope. If none of the packages fits, we can quote a custom website.",
  otherServices: {
    title: "A clear quote based on the work involved.",
    description: "Every project starts with a short discovery call. We learn what the problem is, who it affects and which systems you already use. Then you get a written scope and price, before we start.",
    cta: "Tell us about your project",
  },
};

const SectionHeading = ({ label, title, dark = false, className = "mb-10 md:mb-16" }: { label: string; title: string; dark?: boolean; className?: string }) => (
  <div className={`mx-auto max-w-3xl text-center ${className}`}>
    <span className={`eyebrow-pill mb-4 ${dark ? "eyebrow-pill-dark" : "eyebrow-pill-light"}`}>{label}</span>
    <h2 className={`font-body text-3xl leading-tight md:text-4xl ${dark ? "text-off-white" : "text-main-teal"}`}>{title}</h2>
  </div>
);

const Vet = () => {
  const { t } = useTranslation();
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

  const heroWords = "Veterinary work is complicated enough. Your website and software should make it easier.".split(" ");
  const audience = audiences.find((item) => item.id === activeAudience) ?? audiences[0];
  const vetNavLinks = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#vet-work" },
    { label: "About", href: "#about" },
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
        <section id="top" className="hero-bg relative flex min-h-screen items-center px-6 pb-32 pt-36 text-off-white md:pb-36 md:pt-36">
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mb-6 flex items-center justify-center lg:justify-start`} style={{ transitionDelay: "180ms" }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-off-white/90 sm:text-xs">For vet clinics, animal health companies &amp; vet software teams</p>
              </div>
              <h1 className="hero-title mb-6 text-[38px] sm:text-[48px] md:mb-7 lg:text-[54px]">
                {heroWords.map((word, index) => (
                  <span key={`${word}-${index}`} className={`hero-word ${animateHero ? "visible" : ""} inline-block pb-2`} style={{ transitionDelay: `${60 * index}ms`, backgroundImage: `url(${goldFill})`, backgroundSize: "100% auto", backgroundPosition: "center", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                    {word === "easier." ? <em className="font-serif italic">{word}</em> : word}{index < heroWords.length - 1 ? "\u00a0" : ""}
                  </span>
                ))}
              </h1>
              <p className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mx-auto mb-8 max-w-2xl text-base leading-[1.55] text-off-white/90 md:text-lg lg:mx-0`} style={{ transitionDelay: "320ms" }}>
                Co-founded by <span className="text-gold-text">Dr. Nikky Pyra</span>, veterinarian and software engineer, Moniré builds websites, custom software and automations based on firsthand knowledge of how veterinary teams work.
              </p>
              <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start`} style={{ transitionDelay: "400ms" }}>
                <BrandButton type="button" variant="hero" showStar className="text-base" onClick={() => scrollTo("contact")}>{t("hero.cta")}</BrandButton>
                <BrandButton type="button" variant="secondary" className="text-base" onClick={() => scrollTo("vet-work")}>See our work</BrandButton>
              </div>
            </div>
            <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-off-white/15 shadow-2xl`} style={{ transitionDelay: "360ms" }}>
              <img src={vetEditorialAnimals} alt="A dog and cat in a contemporary veterinary consultation room" className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]" />
            </div>
          </div>
          <div className="wave-mask absolute -bottom-1.5 left-0 right-0">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-10 w-full md:h-auto"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
        </section>

        <section id="services" className="relative scroll-mt-28 overflow-hidden bg-off-white px-6 pb-20 pt-12 md:pb-28 md:pt-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading label="How we can help" title="Support for every part of the veterinary sector." className="mb-8 md:mb-10" />
            <div className="overflow-hidden rounded-3xl border border-main-teal/15 bg-neutral-card shadow-xl lg:grid lg:min-h-[860px] lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative h-[300px] lg:h-auto">
                <img src={vetServicesConsultation} alt="A dog and cat in a veterinary consultation room" className="absolute inset-0 h-full w-full object-cover object-center" />
              </div>
              <div className="flex flex-col p-5 sm:p-7 md:p-9 lg:p-11">
                <div className="grid gap-2 rounded-2xl bg-main-teal/[0.05] p-2 sm:grid-cols-3" role="tablist" aria-label="Customer type">
                  {audiences.map((item) => (
                    <button id={item.id} key={item.id} type="button" role="tab" aria-selected={activeAudience === item.id} aria-controls={`panel-${item.id}`} onClick={() => { setActiveAudience(item.id); trackEvent("vet_tile_click", { audience: item.id }); }} className={`min-h-12 scroll-mt-28 rounded-xl px-3 py-3 text-sm transition-all ${activeAudience === item.id ? "bg-main-teal text-off-white shadow-md" : "text-main-teal/65 hover:bg-off-white hover:text-main-teal"}`}>
                      {item.tab}
                    </button>
                  ))}
                </div>
                <div id={`panel-${audience.id}`} role="tabpanel" className="flex flex-1 flex-col pt-9 md:pt-11">
                  <h3 className="max-w-2xl font-display text-4xl leading-tight text-main-teal md:text-5xl">{audience.title}</h3>
                  <p className="mt-5 max-w-2xl leading-relaxed text-main-teal/85 md:text-lg">{audience.intro}</p>
                  <ul className="mt-7 grid gap-4 border-t border-main-teal/10 pt-6">
                    {audience.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-main-teal/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-teal/10 text-main-teal" aria-hidden="true"><Check size={13} strokeWidth={2.25} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {audience.partner && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">Need commercial strategy or scientific messaging? We partner with <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="text-main-teal underline decoration-gold underline-offset-4">Linley Collaborative</a>, an animal health consultancy.</p>}
                  {audience.note && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">{audience.note}</p>}
                  <div className="pt-7"><BrandButton type="button" variant="primary" showStar className="text-sm" data-track="vet-cta" data-audience={audience.id} onClick={() => contactFor(audience.id)}>{audience.cta}</BrandButton></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vet-work" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
          <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading dark label="Selected work" title="From clinic websites to clinical software." />
            <div className="grid gap-6 lg:grid-cols-2">
              <Link to="/case-studies/snip-squad" className="group overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card">
                <div className="h-[360px] overflow-y-auto bg-white md:h-[460px]" aria-label="Scrollable Snip Squad website preview">
                  <img src={snipSquad} alt="Snip Squad veterinary clinic website" className="block h-auto w-full" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary website</p>
                  <h3 className="mt-3 font-display text-3xl text-main-teal">Snip Squad</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">A modern, approachable website for a nonprofit veterinary clinic providing affordable care in underserved communities.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4">Read the case study <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
              <Link to="/case-studies/labsift" className="group overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card">
                <div className="h-[360px] overflow-y-auto bg-white md:h-[460px]" aria-label="Scrollable LabSift website preview">
                  <img src={labsift} alt="LabSift website" className="block h-auto w-full" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary software</p>
                  <h3 className="mt-3 font-display text-3xl text-main-teal">LabSift</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">A browser-based app that turns PDF lab reports into copy-ready results, processed entirely on the user’s device. We designed and built the app and its website.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4">Read the case study <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="relative scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading label="About Moniré" title="Software experience, with veterinary context built in." />
            <p className="mx-auto mb-10 max-w-3xl text-center font-display text-3xl leading-tight text-main-teal md:mb-14 md:text-4xl">Six years treating patients. <em className="font-tertiary italic">Six years writing software.</em></p>
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
            <div className="mt-8 rounded-2xl border border-main-teal/15 bg-main-teal/[0.04] p-8">
              <p className="text-xs uppercase tracking-widest text-main-teal/60">Our strategy partner</p>
              <h3 className="mt-2 font-display text-2xl text-main-teal">Linley Collaborative</h3>
              <p className="mt-3 max-w-3xl text-main-teal/75">For animal health projects that also need commercial strategy or scientific messaging, we work with Linley Collaborative. They lead that work; we design and build the website or tool.</p>
              <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-main-teal underline decoration-gold underline-offset-4">Visit Linley Collaborative →</a>
            </div>
          </div>
        </section>

        <div className="dark-teal-surface"><PricingSection compact content={vetPricingContent} onContactClick={() => scrollTo("contact")} /></div>

        <section id="contact" className="scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
          <div className="dark-teal-surface mx-auto grid max-w-6xl gap-12 rounded-2xl p-8 lg:grid-cols-2 md:p-12 lg:p-16">
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
