import { useEffect, useState, type KeyboardEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandButton from "@/components/BrandButton";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PricingSection, { type PricingSectionContent } from "@/components/PricingSection";
import ScrollReveal from "@/components/ScrollReveal";
import { trackEvent } from "@/lib/analytics";
import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import labsift from "@/assets/portfolio/labsift-site.webp";
import nikky from "@/assets/nicole.jpg";
import monika from "@/assets/monika.jpg";
import vetEditorialAnimals from "@/assets/vet-editorial-animals.webp";
import vetEditorialAnimalsDesktop from "@/assets/vet-editorial-animals-desktop-reframed-v2.webp";
import vetServicesConsultation from "@/assets/vet-services-consultation.webp";
import goldFill from "@/assets/gold-fill.webp";
import linkedinIcon from "@/assets/linkedin.svg";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { useLocalePath } from "@/hooks/useLocalePath";
import { SITE_URL } from "@/lib/seo";

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

const teamMembersDe: TeamMember[] = [
  {
    ...teamMembers[0],
    role: "Tierärztin & Softwareentwicklerin",
    bio: "Nikky arbeitete sechs Jahre lang als Tierärztin in der Kleintier- und Tierheimmedizin in Kanada und Deutschland, bevor sie in die Softwareentwicklung wechselte. Sie kennt den Zeitdruck, die praktischen Einschränkungen und die Anforderungen an die Patientensicherheit, die den Einsatz neuer Technologien im Praxisalltag bestimmen. Bei Moniré verbindet sie diese klinische Erfahrung mit technischer Expertise und entwickelt digitale Lösungen, die für die Menschen funktionieren, die täglich damit arbeiten.",
    languages: "Sprachen: Englisch, Deutsch",
  },
  {
    ...teamMembers[1],
    role: "Softwareentwicklerin",
    bio: "Monika ist Frontend-Entwicklerin und lebt in der Schweiz. Ihr Hintergrund in der Betriebswirtschaft hilft ihr, technische Lösungen immer auch aus Unternehmenssicht zu betrachten. Mit Webentwicklung und KI-Automatisierung unterstützt sie Teams dabei, Abläufe zu vereinfachen und Ideen umzusetzen. Als zweifache Mutter ist es ihr ausserdem wichtig, Frauen im Umgang mit Technologie zu stärken und flexiblere Arbeitsmodelle zu fördern.",
    languages: "Sprachen: Polnisch, Englisch, Deutsch",
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
    intro: "We turn your content into websites and software that veterinary professionals can understand, trust and use.",
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

const audiencesDe: Audience[] = [
  {
    id: "practices",
    tab: "Tierarztpraxen",
    title: "Eine klare Website. Weniger Aufwand für Ihr Team.",
    intro: "Ihre Website passt nicht mehr zu Ihrer Praxis? Ihr Team beantwortet immer wieder dieselben Fragen oder überträgt Daten von Hand zwischen verschiedenen Systemen? Wir entwickeln eine Lösung, die den Praxisalltag spürbar entlastet.",
    items: [
      "Praxiswebsites, auf denen Leistungen, Terminbuchung und nächste Schritte leicht zu finden sind",
      "Website-Assistenten, die rund um die Uhr häufige Fragen mit tierärztlich geprüften Informationen beantworten und bei medizinischen Anliegen klar an Ihr Team verweisen",
      "Automatisierungen, die Ihre bestehenden Systeme verbinden – damit Anmeldung, Erinnerungen, Nachkontrollen und Übergaben ohne Handarbeit laufen",
      "Individuelle Software für Aufgaben, die Ihre Praxissoftware nicht abdeckt",
    ],
    cta: "Sprechen Sie mit uns über Ihre Praxis",
  },
  {
    id: "animal-health",
    tab: "Tiergesundheit",
    title: "Komplexe Fachinformationen klar und verständlich vermitteln.",
    intro: "Wir machen aus Ihren Inhalten Websites und Software, die für Fachpersonen klar, glaubwürdig und einfach zu nutzen sind.",
    items: [
      "Produkt-Websites, Seiten für Markteinführungen sowie Informations- und Schulungsmaterialien",
      "Automatisierungen, die Ihre Systeme verbinden – damit Anfragen, Musterbestellungen und Übergaben an den Aussendienst ohne Handarbeit laufen",
      "Login-Bereiche, in denen Fachpersonen auf freigegebene Unterlagen zugreifen",
      "Rechner, Produktfinder und Software für Ihre Kundschaft in der Tiermedizin und Ihren Aussendienst",
      "KI-Assistenten, die ausschliesslich auf Basis Ihrer freigegebenen Informationen antworten",
    ],
    cta: "Sprechen Sie mit uns über Ihr Projekt",
    partner: true,
  },
  {
    id: "software-teams",
    tab: "Veterinärsoftware",
    title: "Klinische Expertise, UX und Entwicklung für Veterinärsoftware.",
    intro: "Was in der Demo überzeugt, scheitert oft im hektischen Praxisalltag, wo kaum Zeit für Einarbeitung bleibt. Gemeinsam mit Ihrem Team prüfen, gestalten und entwickeln wir Software, die auch dort funktioniert.",
    items: [
      "Ein tierärztlicher Blick auf Ihr Produkt: wo es nicht zu den Praxisabläufen passt, wo das Team hängen bleibt und was sich ändern sollte",
      "Überarbeitete Oberflächen und Abläufe, die vielbeschäftigte Teams ohne lange Einarbeitung nutzen können",
      "Onboarding-Abläufe und Hilfetexte, mit denen neue Praxen Ihr Produkt schneller einsetzen können",
      "Frontend-Entwicklung mit React, Vue und TypeScript direkt in Ihrer bestehenden Codebasis",
    ],
    cta: "Über Ihr Produkt sprechen",
    note: "Noch kein eigenes Entwicklungsteam? Dann konzipieren und entwickeln wir Ihr Produkt gemeinsam mit Ihnen.",
  },
];

const vetPricingContent: PricingSectionContent = {
  title: "You’ll know the price before we start.",
  titleAccent: "",
  webDesignTab: "Veterinary websites",
  otherServicesTab: "Other services",
  simpleWebsiteOffer: {
    priceLabel: "Websites",
    planKey: "starter",
    description: "Software, automation and other custom work are priced individually. After a short discovery call, you’ll receive a clear scope and fixed price before we begin.",
    cta: "Discuss your project",
  },
};

const vetPricingContentDe: PricingSectionContent = {
  title: "Sie kennen den Preis, bevor wir starten.",
  titleAccent: "",
  webDesignTab: "Veterinär-Websites",
  otherServicesTab: "Weitere Leistungen",
  simpleWebsiteOffer: {
    priceLabel: "Websites",
    planKey: "starter",
    description: "Software, Automatisierungen und weitere individuelle Leistungen kalkulieren wir passend zu Ihrem Projekt. Nach einem kurzen Kennenlerngespräch erhalten Sie einen klar definierten Leistungsumfang und einen Festpreis – bevor die Arbeit beginnt.",
    cta: "Projekt besprechen",
  },
};

const SectionHeading = ({ label, title, dark = false, className = "mb-10 md:mb-16" }: { label: string; title: string; dark?: boolean; className?: string }) => (
  <ScrollReveal className={className}>
    <div className="mx-auto max-w-3xl text-center">
      <span className={`eyebrow-pill mb-4 ${dark ? "eyebrow-pill-dark" : "eyebrow-pill-light"}`}>{label}</span>
      <h2 className={`font-body text-3xl leading-tight md:text-4xl ${dark ? "text-off-white" : "text-main-teal"}`}>{title}</h2>
    </div>
  </ScrollReveal>
);

const Vet = () => {
  const { t, i18n } = useTranslation();
  const isGerman = i18n.language.startsWith("de");
  const localePath = useLocalePath();
  const fontsLoaded = useFontsLoaded();
  const [animateHero, setAnimateHero] = useState(false);
  const [activeAudience, setActiveAudience] = useState<AudienceId>("practices");

  useEffect(() => {
    if (fontsLoaded) requestAnimationFrame(() => setAnimateHero(true));
  }, [fontsLoaded]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = isGerman
      ? "Veterinär-Websites, Software & Automatisierungen | Moniré"
      : "Veterinary Websites, Software & Automations | Moniré";
    return () => { document.title = previousTitle; };
  }, [isGerman]);

  useEffect(() => {
    const selectFromHash = () => {
      const hash = window.location.hash.slice(1) as AudienceId;
      if (audiences.some((audience) => audience.id === hash)) setActiveAudience(hash);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  const localizedAudiences = isGerman ? audiencesDe : audiences;
  const localizedTeamMembers = isGerman ? teamMembersDe : teamMembers;
  const canonicalUrl = `${SITE_URL}${isGerman ? "/de/vet" : "/vet"}`;
  const homeUrl = `${SITE_URL}${isGerman ? "/de" : "/"}`;
  const pageTitle = isGerman
    ? "Veterinär-Websites, Software & Automatisierungen | Moniré"
    : "Veterinary Websites, Software & Automations | Moniré";
  const pageDescription = isGerman
    ? "Ein Zürcher Studio unter der Leitung einer Tierärztin und Softwareentwicklerin. Websites, Workflow-Automatisierungen und Produkt-UX für Tierarztpraxen, Tiergesundheitsunternehmen und Veterinärsoftware-Teams."
    : "A Zürich studio led by a veterinarian-engineer. Websites, workflow automations and product UX for vet practices, animal-health companies and vet software teams.";
  const socialImage = `${SITE_URL}/${isGerman ? "vet-og-image-de.jpg" : "vet-og-image-en.jpg"}`;
  const vetSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Moniré",
        alternateName: "Monire",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "de-CH"],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDescription,
        primaryImageOfPage: { "@type": "ImageObject", url: socialImage },
        inLanguage: isGerman ? "de-CH" : "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${canonicalUrl}#service` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isGerman ? "Startseite" : "Home", item: homeUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: isGerman ? "Veterinärmedizin & Tiergesundheit" : "Veterinary & Animal Health",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: "Moniré",
        alternateName: "Monire",
        url: SITE_URL,
        email: "hello@monire.ch",
        address: { "@type": "PostalAddress", addressLocality: "Zürich", addressCountry: "CH" },
        areaServed: "Worldwide",
        founder: [{ "@id": `${SITE_URL}/#nikky-pyra` }, { "@id": `${SITE_URL}/#monika-rzepka` }],
        sameAs: ["https://www.instagram.com/hello.monire", "https://www.linkedin.com/company/monire"],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: isGerman
          ? "Websites, Software und Automatisierungen für die Tiermedizin"
          : "Websites, software and automations for veterinary and animal health",
        description: pageDescription,
        image: socialImage,
        url: canonicalUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
        audience: [
          { "@type": "Audience", name: isGerman ? "Tierarztpraxen" : "Veterinary practices" },
          { "@type": "Audience", name: isGerman ? "Tiergesundheitsunternehmen" : "Animal health companies" },
          { "@type": "Audience", name: isGerman ? "Veterinärsoftware-Anbieter" : "Veterinary software companies" },
        ],
        serviceType: isGerman
          ? ["Praxiswebsites", "Individuelle Software", "Workflow-Automatisierung", "UX für Veterinärsoftware"]
          : ["Veterinary websites", "Custom software", "Workflow automation", "Veterinary software UX"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#nikky-pyra`,
        name: "Dr. Nikky Pyra",
        jobTitle: isGerman ? "Tierärztin und Softwareentwicklerin" : "Veterinarian and Software Engineer",
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#monika-rzepka`,
        name: "Monika Rzepka",
        jobTitle: isGerman ? "Softwareentwicklerin" : "Software Engineer",
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
  const heroWords = (isGerman
    ? "Veterinärmedizin ist komplex genug. Ihre Website und Ihre Software sollten die Arbeit erleichtern."
    : "Veterinary work is complicated enough. Your website and software should make it easier.").split(" ");
  const vetNavLinks = [
    { label: isGerman ? "Leistungen" : "Services", href: "#services" },
    { label: isGerman ? "Projekte" : "Portfolio", href: "#vet-work" },
    { label: isGerman ? "Über uns" : "About", href: "#about" },
    { label: isGerman ? "Preise" : "Pricing", href: "#pricing" },
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

  const handleAudienceKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % localizedAudiences.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + localizedAudiences.length) % localizedAudiences.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = localizedAudiences.length - 1;
    else return;

    event.preventDefault();
    const nextAudience = localizedAudiences[nextIndex];
    setActiveAudience(nextAudience.id);
    document.getElementById(nextAudience.id)?.focus();
  };

  return (
    <>
      <JsonLd data={vetSchema} />
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-off-white px-5 py-3 font-semibold text-main-teal shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold">
        {isGerman ? "Zum Inhalt springen" : "Skip to main content"}
      </a>
      <Navbar pageLinks={vetNavLinks} contactHref="#contact" />
      <main id="main-content" className="bg-off-white">
        <section id="top" className="hero-bg relative flex min-h-screen items-center px-6 pb-32 pt-36 text-off-white md:pb-36 md:pt-36 xl:pt-48">
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mb-6 flex items-center justify-center lg:justify-start`} style={{ transitionDelay: "180ms" }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-off-white/90 sm:text-xs">{isGerman ? "Für Tierarztpraxen, Tiergesundheit & Veterinärsoftware" : "For vet clinics, animal health companies & vet software teams"}</p>
              </div>
              <h1 className="hero-title mb-6 text-[38px] sm:text-[48px] md:mb-7 lg:text-[54px]">
                {heroWords.map((word, index) => (
                  <span key={`${word}-${index}`} className={`hero-word ${animateHero ? "visible" : ""} inline-block pb-2`} style={{ transitionDelay: `${60 * index}ms`, backgroundImage: `url(${goldFill})`, backgroundSize: "100% auto", backgroundPosition: "center", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                    {index === heroWords.length - 1 ? <em className="font-serif italic">{word}</em> : word}{index < heroWords.length - 1 ? "\u00a0" : ""}
                  </span>
                ))}
              </h1>
              <p className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mx-auto mb-8 max-w-2xl text-base leading-[1.55] text-off-white/90 md:text-lg lg:mx-0`} style={{ transitionDelay: "320ms" }}>
                {isGerman ? <>Moniré wurde von <span className="text-gold-text">Dr. Nikky Pyra</span>, Tierärztin und Softwareentwicklerin, mitgegründet. Wir entwickeln Websites, individuelle Software und Automatisierungen mit einem praxisnahen Verständnis dafür, wie veterinärmedizinische Teams arbeiten.</> : <>Co-founded by <span className="text-gold-text">Dr. Nikky Pyra</span>, veterinarian and software engineer, Moniré builds websites, custom software and automations based on firsthand knowledge of how veterinary teams work.</>}
              </p>
              <div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start`} style={{ transitionDelay: "400ms" }}>
                <BrandButton type="button" variant="hero" showStar className="text-base" onClick={() => scrollTo("contact")}>{t("hero.cta")}</BrandButton>
                <BrandButton type="button" variant="secondary" className="text-base" onClick={() => scrollTo("vet-work")}>{isGerman ? "Projekte ansehen" : "See our work"}</BrandButton>
              </div>
            </div>
            <div
              className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-off-white/15 shadow-2xl`}
              style={{ transitionDelay: "480ms", transitionDuration: "1200ms" }}
            >
              <picture>
                <source media="(min-width: 1024px)" srcSet={vetEditorialAnimalsDesktop} />
                <img src={vetEditorialAnimals} alt={t("vetPage.images.heroAlt")} width="1440" height="687" fetchPriority="high" decoding="async" className="aspect-video h-auto w-full object-cover object-center lg:aspect-[5/4]" />
              </picture>
            </div>
          </div>
          <div className="wave-mask absolute -bottom-1.5 left-0 right-0" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-10 w-full md:h-auto"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
        </section>

        <section id="services" className="relative scroll-mt-28 overflow-hidden bg-off-white px-6 pb-20 pt-12 md:pb-28 md:pt-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading label={isGerman ? "Unsere Leistungen" : "How we can help"} title={isGerman ? "Unterstützung für alle Bereiche der Tiermedizin." : "Support for every part of the veterinary sector."} className="mb-8 md:mb-10" />
            <ScrollReveal>
              <div className="overflow-hidden rounded-3xl border border-main-teal/15 bg-neutral-card shadow-xl lg:grid lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative hidden lg:block lg:h-auto">
                <img src={vetServicesConsultation} alt={t("vetPage.images.servicesAlt")} width="900" height="1350" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
              </div>
              <div className="flex flex-col p-5 sm:p-7 md:p-9 lg:p-11">
                <div className="grid gap-1 rounded-3xl border border-main-teal/20 p-1.5 sm:grid-cols-3 sm:rounded-full" role="tablist" aria-label={isGerman ? "Zielgruppe auswählen" : "Choose your sector"}>
                  {localizedAudiences.map((item, index) => (
                    <button id={item.id} key={item.id} type="button" role="tab" tabIndex={activeAudience === item.id ? 0 : -1} aria-selected={activeAudience === item.id} aria-controls={`panel-${item.id}`} onKeyDown={(event) => handleAudienceKeyDown(event, index)} onClick={() => { setActiveAudience(item.id); trackEvent("vet_tile_click", { audience: item.id }); }} className={`min-h-12 scroll-mt-28 rounded-full border px-3 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-teal focus-visible:ring-offset-2 ${activeAudience === item.id ? "border-gold/60 bg-main-teal text-off-white" : "border-transparent text-main-teal/70 hover:bg-main-teal/[0.05] hover:text-main-teal"}`}>
                      {item.tab}
                    </button>
                  ))}
                </div>
                <div className="grid flex-1">
                  {localizedAudiences.map((panel) => {
                    const isActive = activeAudience === panel.id;
                    return (
                      <div
                        key={panel.id}
                        id={`panel-${panel.id}`}
                        role="tabpanel"
                        aria-labelledby={panel.id}
                        aria-hidden={!isActive}
                        className={`col-start-1 row-start-1 flex flex-col pt-9 md:pt-11 ${isActive ? "visible" : "invisible pointer-events-none"}`}
                      >
                        <h3 className="max-w-2xl font-display text-[30px] font-medium leading-[1.12] text-main-teal sm:text-3xl lg:text-4xl">{panel.title}</h3>
                        <p className="mt-4 max-w-2xl leading-relaxed text-main-teal/85 md:text-lg">{panel.intro}</p>
                        <ul className="mt-5 grid gap-3.5 border-t border-main-teal/10 pt-5">
                          {panel.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-main-teal/85">
                              <span className="mt-0.5 shrink-0 text-sm text-main-teal" aria-hidden="true">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {panel.partner && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">{isGerman ? "Sie brauchen Unterstützung bei der kommerziellen Strategie oder der wissenschaftlichen Kommunikation? Dafür arbeiten wir mit " : "Need commercial strategy or scientific messaging? We partner with "}<a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1} className="font-semibold text-main-teal underline decoration-gold decoration-1 underline-offset-4 transition-colors duration-200 hover:no-underline focus-visible:no-underline focus-visible:outline-none">Linley Collaborative</a>{isGerman ? " zusammen, einer auf Tiergesundheit spezialisierten Beratung." : ", an animal health consultancy."}</p>}
                        {panel.note && <p className="mt-5 text-sm leading-relaxed text-main-teal/75">{panel.note}</p>}
                        <div className="pt-7"><BrandButton type="button" variant="primary" showStar className="text-sm !bg-main-teal hover:!bg-soft-teal" tabIndex={isActive ? 0 : -1} data-track="vet-cta" data-audience={panel.id} onClick={() => contactFor(panel.id)}>{panel.cta}</BrandButton></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="vet-work" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
          <div className="wave-mask absolute -top-px left-0 right-0 z-[5] rotate-180" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
          <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading dark label={isGerman ? "Ausgewählte Projekte" : "Selected work"} title={isGerman ? "Von Praxis-Websites bis zu klinischer Software." : "From clinic websites to clinical software."} />
            <div className="grid gap-6 lg:grid-cols-2">
              <ScrollReveal>
                <Link to={localePath("/case-studies/snip-squad")} className="group block overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card transition-all duration-200 hover:-translate-y-1 hover:border-main-teal/35 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-main-teal focus-visible:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-teal focus-visible:ring-offset-2">
                <div className="h-[240px] overflow-y-auto bg-white sm:h-[320px] md:h-[460px]" aria-hidden="true">
                  <img src={snipSquad} alt="" className="block h-auto w-full" />
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/80">{isGerman ? "Praxiswebsite" : "Veterinary website"}</p>
                  <h3 className="mt-3 font-display text-2xl text-main-teal sm:text-3xl">Snip Squad</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">{isGerman ? "Eine moderne, einladende Website für eine gemeinnützige Tierarztpraxis, die bezahlbare tierärztliche Versorgung dort anbietet, wo sie besonders gebraucht wird." : "A modern, approachable website for a nonprofit veterinary clinic providing affordable care in underserved communities."}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 group-hover:no-underline group-focus-visible:no-underline">{isGerman ? "Case Study lesen" : "Read the case study"} <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></span>
                </div>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <Link to={localePath("/case-studies/labsift")} className="group block overflow-hidden rounded-2xl border border-neutral-border bg-neutral-card transition-all duration-200 hover:-translate-y-1 hover:border-main-teal/35 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-main-teal focus-visible:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-teal focus-visible:ring-offset-2">
                <div className="h-[240px] overflow-y-auto bg-white sm:h-[320px] md:h-[460px]" aria-hidden="true">
                  <img src={labsift} alt="" className="block h-auto w-full" />
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <p className="text-xs uppercase tracking-widest text-main-teal/80">{isGerman ? "Veterinärsoftware" : "Veterinary software"}</p>
                  <h3 className="mt-3 font-display text-2xl text-main-teal sm:text-3xl">LabSift</h3>
                  <p className="mt-3 leading-relaxed text-main-teal/75">{isGerman ? "Eine Browser-App, die PDF-Laborberichte in kopierfertige Werte umwandelt – vollständig lokal auf dem Gerät. App und Website haben wir gestaltet und entwickelt." : "A browser-based app that turns PDF lab reports into copy-ready results, processed entirely on the user’s device. We designed and built the app and its website."}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 group-hover:no-underline group-focus-visible:no-underline">{isGerman ? "Case Study lesen" : "Read the case study"} <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></span>
                </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="about" className="relative scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading label={isGerman ? "Über Moniré" : "About Moniré"} title={isGerman ? "Wo klinische Erfahrung auf Softwareentwicklung trifft." : "Clinical experience, translated into software."} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {localizedTeamMembers.map((person, index) => (
                <ScrollReveal key={person.name} delay={index * 150}>
                  <article className="grid overflow-hidden rounded-xl border border-neutral-border bg-neutral-card sm:grid-cols-[180px_1fr] sm:items-start">
                  <div className="p-5 sm:contents">
                    <div className="flex items-center gap-5 sm:hidden">
                      <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-lg border border-main-teal/10">
                        <img src={person.image} alt={t("vetPage.images.portraitAlt", { name: person.name })} className="h-full w-full object-cover" />
                        <a
                          href={person.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("vetPage.images.linkedinLabel", { name: person.name })}
                          className="absolute bottom-2.5 right-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-text/60 bg-[#0a3440] transition-all duration-200 hover:border-gold-text focus-visible:border-gold-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-focus focus-visible:ring-offset-2 focus-visible:ring-offset-main-teal"
                        >
                          <img src={linkedinIcon} alt="" aria-hidden="true" className="h-4 w-4" style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)" }} />
                        </a>
                      </div>
                      <div>
                        <h3 className="font-body text-2xl font-medium text-main-teal">{person.name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-main-teal/80">{person.role}</p>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-main-teal/85">{person.languages}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-main-teal/80 sm:hidden">{person.bio}</p>
                  </div>

                  <div className="relative m-5 mr-0 hidden aspect-[4/5] overflow-hidden rounded-lg sm:block">
                    <img src={person.image} alt={t("vetPage.images.portraitAlt", { name: person.name })} className="absolute inset-0 h-full w-full object-cover" />
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("vetPage.images.linkedinLabel", { name: person.name })}
                      className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-text/60 bg-[#0a3440] transition-all duration-200 hover:border-gold-text focus-visible:border-gold-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-focus focus-visible:ring-offset-2 focus-visible:ring-offset-main-teal"
                    >
                      <img src={linkedinIcon} alt="" aria-hidden="true" className="h-4 w-4" style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)" }} />
                    </a>
                  </div>
                  <div className="hidden p-7 sm:block">
                    <h3 className="font-body text-3xl font-medium text-main-teal">{person.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-main-teal/80">{person.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-main-teal/80">{person.bio}</p>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-main-teal/85">{person.languages}</p>
                  </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-8 text-center" delay={200}>
              <Link to={isGerman ? "/de/#about" : "/#about"} className="group inline-flex items-center gap-2 rounded-sm text-main-teal underline decoration-gold underline-offset-4 transition-colors duration-200 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-teal focus-visible:ring-offset-4">{isGerman ? "Unsere Gründungsgeschichte" : "Read about our founder journey"} <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></Link>
            </ScrollReveal>
          </div>
        </section>

        <div className="dark-teal-surface relative overflow-hidden">
          <PricingSection compact content={isGerman ? vetPricingContentDe : vetPricingContent} onContactClick={() => scrollTo("contact")} />
          <div className="wave-mask absolute -bottom-px left-0 right-0" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" /></svg>
          </div>
        </div>

        <section id="contact" className="scroll-mt-28 bg-off-white px-6 py-14 md:py-20">
          <ScrollReveal className="mx-auto max-w-5xl">
            <div className="dark-teal-surface rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.55fr)] lg:gap-10">
              <div className="order-2 rounded-xl border border-off-white/[0.07] bg-off-white/[0.025] p-5 md:p-6 lg:order-2">
                <ContactForm variant="page" formName="vet-contact" formLocation="vet_page" mode="vet" />
              </div>

              <div className="order-1 text-center lg:order-1 lg:text-left">
                <span className="eyebrow-pill eyebrow-pill-dark mb-4">{isGerman ? "Kontakt" : "Contact"}</span>
                <h2 className="mx-auto max-w-xs font-display text-3xl leading-tight text-off-white md:text-4xl lg:mx-0">{isGerman ? "Lassen Sie uns Ihr Projekt gemeinsam angehen." : "Let’s work together."}</h2>

                <div className="mt-9 hidden space-y-8 lg:block">
                <div>
                  <h3 className="mb-4 text-sm uppercase tracking-widest text-gold-text">{t("common.getInTouch")}</h3>
                  <a
                    href="mailto:hello@monire.ch"
                    className="group flex items-center gap-3 rounded-sm text-base text-off-white transition-colors hover:text-gold-hover focus-visible:text-gold-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-focus focus-visible:ring-offset-4 focus-visible:ring-offset-main-teal"
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
                      <p className="mt-1 text-sm text-off-white/75">{t("footer.locationService")}</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer hideWave />
    </>
  );
};

export default Vet;
