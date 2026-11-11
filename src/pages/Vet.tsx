import { useEffect, useState } from "react";
import { ArrowRight, Check, Mail, MapPin } from "lucide-react";
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
import linkedinIcon from "@/assets/linkedin.svg";
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

type TeamMember = {
  image: string;
  name: string;
  role: string;
  bio: string;
  languages: string;
  linkedinUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    image: nikky,
    name: "Dr. Nikky Pyra, DVM",
    role: "Veterinarian & Software Engineer",
    bio: "Nikky spent six years working as a veterinarian in small-animal and shelter medicine in Canada and Germany before expanding her career into software engineering. Her clinical experience gives her first-hand insight into the time pressures, practical constraints and safety considerations that shape how veterinary teams use technology and evaluate new products. At Moniré, she combines that clinical perspective with technical expertise to create digital experiences that make sense for the people who use them.",
    languages: "Languages: English, German",
    linkedinUrl: "https://www.linkedin.com/in/nicole-pyra/",
  },
  {
    image: monika,
    name: "Monika Märki",
    role: "Software Engineer",
    bio: "Monika is a frontend developer based in Switzerland. She combines a background in business operations with web development and AI automation to help teams simplify their work and bring their ideas to life. As a mum of two, she is also passionate about helping women build confidence with technology and create more flexible working lives.",
    languages: "Languages: Polish, English, German",
    linkedinUrl: "https://www.linkedin.com/in/monika-malecka/",
  },
];

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
  webDesignTab: "Veterinary websites",
  otherServicesTab: "Other services",
  simpleWebsiteOffer: {
    price: "Websites from CHF 3'500",
    description: "Software, automation and other custom work are priced individually. After a short discovery call, you’ll receive a clear scope and fixed price before we begin.",
    cta: "Discuss your project",
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
                <img src={vetServicesConsultation} alt="A dog and cat in a veterinary consultation room" className="absolute inset-0 h-full w-full object-cover object-top lg:object-center" />
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
                  {audience.partner && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">Need commercial strategy or scientific messaging? We partner with <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-main-teal underline decoration-gold decoration-1 underline-offset-4 transition-colors duration-200 hover:no-underline focus-visible:no-underline focus-visible:outline-none">Linley Collaborative</a>, an animal health consultancy.</p>}
                  {audience.note && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">{audience.note}</p>}
                  <div className="pt-7"><BrandButton type="button" variant="primary" showStar className="text-sm" data-track="vet-cta" data-audience={audience.id} onClick={() => contactFor(audience.id)}>{audience.cta}</BrandButton></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vet-work" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
          <div className="wave-mask absolute -top-px left-0 right-0 z-[5] rotate-180" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
          <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading dark label="Selected work" title="From clinic websites to clinical software." />
            <div className="grid gap-6 lg:grid-cols-2">
              <Link to="/case-studies/snip-squad" className="group overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card transition-all duration-200 hover:-translate-y-1 hover:border-main-teal/35 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-main-teal/35 focus-visible:shadow-xl focus-visible:outline-none">
                <div className="h-[240px] overflow-y-auto bg-white sm:h-[320px] md:h-[460px]" aria-label="Scrollable Snip Squad website preview">
                  <img src={snipSquad} alt="Snip Squad veterinary clinic website" className="block h-auto w-full" />
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary website</p>
                  <h3 className="mt-3 font-display text-2xl text-main-teal sm:text-3xl">Snip Squad</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">A modern, approachable website for a nonprofit veterinary clinic providing affordable care in underserved communities.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 group-hover:no-underline group-focus-visible:no-underline">Read the case study <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></span>
                </div>
              </Link>
              <Link to="/case-studies/labsift" className="group overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card transition-all duration-200 hover:-translate-y-1 hover:border-main-teal/35 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-main-teal/35 focus-visible:shadow-xl focus-visible:outline-none">
                <div className="h-[240px] overflow-y-auto bg-white sm:h-[320px] md:h-[460px]" aria-label="Scrollable LabSift website preview">
                  <img src={labsift} alt="LabSift website" className="block h-auto w-full" />
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/55">Veterinary software</p>
                  <h3 className="mt-3 font-display text-2xl text-main-teal sm:text-3xl">LabSift</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">A browser-based app that turns PDF lab reports into copy-ready results, processed entirely on the user’s device. We designed and built the app and its website.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 group-hover:no-underline group-focus-visible:no-underline">Read the case study <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="relative scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading label="About Moniré" title="Clinical experience, translated into software." />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {teamMembers.map((person) => (
                <article key={person.name} className="grid overflow-hidden rounded-xl border border-neutral-border bg-neutral-card sm:grid-cols-[180px_1fr] sm:items-start">
                  <div className="p-5 sm:contents">
                    <div className="flex items-center gap-5 sm:hidden">
                      <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-lg border border-main-teal/10">
                        <img src={person.image} alt={`${person.name} portrait`} className="h-full w-full object-cover" />
                        <a
                          href={person.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name}'s LinkedIn profile`}
                          className="absolute bottom-2.5 right-2.5 z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-gold-text/40 bg-[#0a3440cc] backdrop-blur-sm transition-all duration-200 hover:border-gold-text/70 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)] focus-visible:border-gold-text/70 focus-visible:shadow-[0_0_8px_rgba(207,169,71,0.2)] focus-visible:outline-none"
                        >
                          <img src={linkedinIcon} alt="" aria-hidden="true" className="h-4 w-4" style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)" }} />
                        </a>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-main-teal">{person.name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-main-teal/70">{person.role}</p>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-main-teal/85">{person.languages}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-main-teal/80 sm:hidden">{person.bio}</p>
                  </div>

                  <div className="relative m-5 mr-0 hidden aspect-[4/5] overflow-hidden rounded-lg sm:block">
                    <img src={person.image} alt={`${person.name} portrait`} className="absolute inset-0 h-full w-full object-cover" />
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name}'s LinkedIn profile`}
                      className="absolute bottom-3 right-3 z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-gold-text/40 bg-[#0a3440cc] backdrop-blur-sm transition-all duration-200 hover:border-gold-text/70 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)] focus-visible:border-gold-text/70 focus-visible:shadow-[0_0_8px_rgba(207,169,71,0.2)] focus-visible:outline-none"
                    >
                      <img src={linkedinIcon} alt="" aria-hidden="true" className="h-4 w-4" style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)" }} />
                    </a>
                  </div>
                  <div className="hidden p-7 sm:block">
                    <h3 className="font-display text-3xl text-main-teal">{person.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-main-teal/65">{person.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-main-teal/80">{person.bio}</p>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-main-teal/85">{person.languages}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/#about" className="group inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 hover:no-underline focus-visible:no-underline focus-visible:outline-none">Read about our founder journey <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></Link>
            </div>
          </div>
        </section>

        <div className="dark-teal-surface relative overflow-hidden">
          <PricingSection compact content={vetPricingContent} onContactClick={() => scrollTo("contact")} />
          <div className="wave-mask absolute -bottom-px left-0 right-0" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
        </div>

        <section id="contact" className="scroll-mt-28 bg-off-white px-6 py-14 md:py-20">
          <div className="dark-teal-surface mx-auto max-w-5xl rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.55fr)] lg:gap-10">
              <div className="order-2 rounded-xl border border-off-white/[0.07] bg-off-white/[0.025] p-5 md:p-6 lg:order-2">
                <ContactForm variant="page" formName="vet-contact" formLocation="vet_page" mode="vet" />
              </div>

              <div className="order-1 text-center lg:order-1 lg:text-left">
                <span className="eyebrow-pill eyebrow-pill-dark mb-4">Contact</span>
                <h2 className="mx-auto max-w-xs font-display text-3xl leading-tight text-off-white md:text-4xl lg:mx-0">Let’s work together.</h2>

                <div className="mt-9 hidden space-y-8 lg:block">
                <div>
                  <h3 className="mb-4 text-sm uppercase tracking-widest text-gold-text">{t("common.getInTouch")}</h3>
                  <a
                    href="mailto:hello@monire.ch"
                    className="group flex items-center gap-3 text-base text-off-white transition-colors hover:text-gold-hover focus-visible:text-gold-hover focus-visible:outline-none"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-text/30 transition-colors group-hover:border-gold-text/60 group-focus-visible:border-gold-text/60">
                      <Mail size={18} className="text-gold-text" />
                    </span>
                    hello@monire.ch
                  </a>
                </div>

                <div>
                  <h3 className="mb-4 text-sm uppercase tracking-widest text-gold-text">{t("common.location")}</h3>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-text/30">
                      <MapPin size={18} className="text-gold-text" />
                    </span>
                    <div>
                      <p className="text-base text-off-white">{t("footer.locationCity")}</p>
                      <p className="mt-1 text-sm text-off-white/50">{t("footer.locationService")}</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer hideWave />
    </>
  );
};

export default Vet;
