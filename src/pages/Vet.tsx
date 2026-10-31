import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, Code2, Globe2, HeartPulse } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandButton from "@/components/BrandButton";
import { getFormAttributionFields, trackEvent } from "@/lib/analytics";
import snipSquad from "@/assets/portfolio/snip-squad_full.webp";
import labsift from "@/assets/portfolio/labsift-og-image.webp";
import nikky from "@/assets/nicole.jpg";
import monika from "@/assets/monika.jpg";
import vetEditorialAnimals from "@/assets/vet-editorial-animals.png";
import goldFill from "@/assets/gold-fill.webp";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";

type Offer = { title: string; description: string; items: string[] };
type Audience = {
  id: string; label: string; title: string; intro: string; offers: Offer[];
  cta: string; value: string; example?: { title: string; meta: string; text: string; quote?: string; href: string; image: string; alt: string };
};

const audiences: Audience[] = [
  {
    id: "practices", label: "For veterinary practices", title: "Give your team fewer things to chase.",
    intro: "When the phone keeps ringing with the same questions, forms have to be copied by hand and useful information lives in someone's head, the whole team loses time. We build clear practice websites and small automations that take some of that work off your plate—without replacing the software you already use.",
    offers: [
      { title: "A website clients can actually use", description: "Make it easy for people to find the right service, prepare for a visit and know when to call.", items: ["Services and team pages", "New-client information and booking links", "German and English"] },
      { title: "Less copying and chasing", description: "Take repetitive follow-ups and routing off the reception desk.", items: ["Enquiry and intake routing", "Review and follow-up requests", "Reminders outside your practice software"] },
      { title: "One place for the team", description: "Keep the information your team needs somewhere everyone can find it.", items: ["Protocol and SOP hub", "New-staff onboarding", "CE tracking"] },
    ],
    example: { title: "Snip Squad — website for a nonprofit veterinary clinic", meta: "Norfolk, Virginia · Webflow, Figma", text: "A warm, approachable site for a clinic providing affordable pet care in underserved communities. It explains the mission, helps pet owners find services quickly, and supports donations. The team updates it themselves through an easy CMS.", quote: '“Can’t recommend them enough!” — Dr. Alex Phan, Snip Squad', href: "/case-studies/snip-squad", image: snipSquad, alt: "Snip Squad veterinary clinic website" },
    cta: "Talk to us about your practice", value: "practices",
  },
  {
    id: "animal-health", label: "For animal-health companies", title: "Help busy vets get to the point quickly.",
    intro: "A vet looking at your product between appointments does not have time to dig through vague claims or a complicated website. We turn your approved content into clear product pages, launch sites and useful tools. We can work with your marketing team or agency, or bring in Linley Collaborative when you also need commercial strategy and scientific messaging.",
    offers: [
      { title: "Launch and product sites", description: "Give vets the information they need without making them hunt for it.", items: ["Launch microsites", "Product pages", "Education and webinar pages"] },
      { title: "Professional areas", description: "Keep veterinary information useful, organised and available to the right audience.", items: ["Password-protected professional areas", "Product information for vets", "Built to support your review process"] },
      { title: "Useful tools and follow-up", description: "Build the practical tools around a launch and connect enquiries to your existing process.", items: ["Calculators and guides for field reps", "Lead capture into your CRM", "Follow-up and registration flows"] },
    ],
    cta: "Plan your next launch with us", value: "animal-health",
  },
  {
    id: "software-teams", label: "For veterinary software teams", title: "Build software that fits into a real clinic day.",
    intro: "A workflow can make perfect sense in a demo and fall apart at a busy reception desk. We help you test product decisions against the way clinics actually work, then design and build the interface with your team.",
    offers: [
      { title: "Understand the clinic workflow", description: "Find out where a feature helps, where it gets in the way and what staff will need from it.", items: ["Interviews with clinic staff", "User flows and prototypes", "Usability reviews"] },
      { title: "Design and build the interface", description: "Work with experienced frontend engineers who can take an idea through to working code.", items: ["React, TypeScript, Vue/Nuxt", "Design systems and components", "Accessibility and performance"] },
      { title: "Support the product around the edges", description: "Make onboarding, help content and your marketing site as clear as the product itself.", items: ["Product marketing sites", "Onboarding and lead automations", "Docs and help pages"] },
    ],
    example: { title: "LabSift — turning lab reports into copy-ready results", meta: "Our own product · React, TypeScript, client-side OCR and PDF parsing", text: "A browser tool for vets and physicians that pulls selected lab values from PDF reports into a consistent, copy-ready list. Each value links back to its spot in the original report for one-click checking. Everything runs in the browser, so reports never reach a server.", href: "/case-studies/labsift", image: labsift, alt: "LabSift lab report results interface" },
    cta: "Talk to us about your product", value: "software-teams",
  },
];

const SectionHeading = ({ label, title, intro, dark = false }: { label?: string; title: string; intro?: string; dark?: boolean }) => <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
<span className={`eyebrow-pill mb-4 ${dark ? "eyebrow-pill-dark" : "eyebrow-pill-light"}`}>{label ?? "Moniré for Animal Health"}</span>
<h2 className={`font-body text-3xl md:text-4xl leading-tight mb-5 ${dark ? "text-off-white" : "text-main-teal"}`}>{title}</h2>{intro && <p className={`font-body text-lg leading-relaxed ${dark ? "text-off-white/80" : "text-main-teal/80"}`}>{intro}</p>}</div>;

const VetForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initial = ["practices", "animal-health", "software-teams"].includes(params.get("for") ?? "") ? params.get("for")! : "";
  const [audience, setAudience] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  useEffect(() => { const handler = (event: Event) => setAudience((event as CustomEvent<string>).detail); window.addEventListener("vet-audience", handler); return () => window.removeEventListener("vet-audience", handler); }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus("sending");
    trackEvent("form_submit_attempt", { form_location: "vet_page", audience, page_path: location.pathname });
    const data = new FormData(event.currentTarget);
    try { const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as never).toString() }); if (!response.ok) throw new Error(); setStatus("sent"); trackEvent("form_submit_success", { form_location: "vet_page", audience, page_path: location.pathname }); }
    catch { setStatus("error"); trackEvent("form_submit_error", { form_location: "vet_page", audience, page_path: location.pathname }); }
  };
  if (status === "sent") return <div className="rounded-2xl border border-gold/30 bg-off-white/10 p-10 text-center">
<Check className="mx-auto mb-4 text-gold-text" size={36}/>
<h3 className="font-display text-3xl text-off-white">Thank you.</h3>
<p className="mt-2 text-off-white/70">We’ll be in touch.</p>
</div>;
  const input = "w-full rounded-xl border border-off-white/20 bg-off-white/10 px-4 py-3.5 font-body text-off-white placeholder:text-off-white/40 focus:border-gold focus:outline-none";
  return <form name="vet-contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} className="space-y-5" data-track="vet-form">
<input type="hidden" name="form-name" value="vet-contact"/>
<input type="hidden" name="bot-field"/>{Object.entries(getFormAttributionFields()).map(([key,value]) => <input key={key} type="hidden" name={key} value={value}/>)}<div className="grid sm:grid-cols-2 gap-5">
<label className="text-sm text-off-white/70">Name*<input required name="fullName" className={`${input} mt-1.5`}/>
</label>
<label className="text-sm text-off-white/70">Email*<input required type="email" name="email" className={`${input} mt-1.5`}/>
</label>
</div>
<label className="block text-sm text-off-white/70">Organisation<input name="organisation" className={`${input} mt-1.5`}/>
</label>
<label className="block text-sm text-off-white/70">I’m contacting you about*<select required name="audience" value={audience} onChange={e => setAudience(e.target.value)} className={`${input} mt-1.5`}>
<option value="" className="text-main-teal">Choose one</option>
<option value="practices" className="text-main-teal">Practice</option>
<option value="animal-health" className="text-main-teal">Animal-health company</option>
<option value="software-teams" className="text-main-teal">Vet software or startup</option>
<option value="something-else" className="text-main-teal">Something else</option>
</select>
</label>
<label className="block text-sm text-off-white/70">What would you like help with?*<textarea required name="message" rows={5} className={`${input} mt-1.5 resize-y`}/>
</label>
<label className="flex gap-3 text-sm text-off-white/70">
<input required type="checkbox" name="privacy" className="mt-1 accent-gold"/>I agree to the <Link to="/privacy" className="text-gold-text underline">privacy policy</Link>.</label>{status === "error" && <p role="alert" className="text-red-200">Something went wrong. Please email <a className="underline" href="mailto:hello@monire.ch">hello@monire.ch</a>.</p>}<BrandButton type="submit" disabled={status === "sending"} showStar>{status === "sending" ? "Sending…" : "Send message"}</BrandButton>
</form>;
};

const AudienceSection = ({ audience, tinted }: { audience: Audience; tinted: boolean }) => {
  const cta = () => {
    window.dispatchEvent(new CustomEvent("vet-audience", { detail: audience.value }));
    window.history.pushState(null, "", `?for=${audience.value}#contact`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    trackEvent("vet_cta", { audience: audience.value, location: "audience_section" });
  };
  return <section id={audience.id} className={`relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28 ${tinted ? "about-flow" : "bg-off-white"}`}>
{tinted && <><div className="about-orb about-orb-1"/><div className="about-orb about-orb-2"/></>}
<div className="relative z-10 mx-auto max-w-6xl">
<SectionHeading label={audience.label} title={audience.title} intro={audience.intro} dark={tinted}/>{audience.id === "animal-health" && <p className="-mt-9 mb-10 text-center text-off-white/70">Strategy partner: <a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="text-gold-text underline decoration-gold underline-offset-4">Linley Collaborative</a>.</p>}<div className="grid gap-6 md:grid-cols-3">{audience.offers.map(offer => <article key={offer.title} className={`rounded-xl border p-8 transition-shadow duration-300 hover:shadow-lg ${tinted ? "dark-surface-card border-white/10" : "border-neutral-border bg-neutral-card"}`}>
<h3 className={`font-display text-2xl ${tinted ? "text-off-white" : "text-main-teal"}`}>{offer.title}</h3>
<p className={`my-3 ${tinted ? "text-off-white/75" : "text-main-teal/75"}`}>{offer.description}</p>
<ul className="space-y-2">{offer.items.map(item => <li key={item} className={`flex gap-2 text-sm ${tinted ? "text-off-white/75" : "text-main-teal/80"}`}>
<Check size={16} className={`mt-0.5 shrink-0 ${tinted ? "text-gold-text" : "text-gold"}`}/>{item}</li>)}</ul>
</article>)}</div>
{audience.example && <Link to={audience.example.href} className="group my-10 grid overflow-hidden rounded-xl border border-neutral-border bg-neutral-card md:grid-cols-2">
{audience.id === "practices" ? <div className="h-[340px] overflow-y-auto bg-neutral-card md:h-[440px]" aria-label="Scrollable Snip Squad website preview">
<img src={audience.example.image} alt={audience.example.alt} className="block h-auto w-full"/>
</div> : <img src={audience.example.image} alt={audience.example.alt} className="h-full min-h-64 w-full object-cover"/>}
<div className="p-8">
<p className="text-xs uppercase tracking-widest text-main-teal/60">{audience.example.meta}</p>
<h3 className="my-3 font-display text-3xl text-main-teal">{audience.example.title}</h3>
<p className="text-main-teal/75">{audience.example.text}</p>{audience.example.quote && <p className="mt-4 font-serif text-xl text-main-teal">{audience.example.quote}</p>}<span className="mt-6 inline-flex items-center gap-2 text-main-teal underline decoration-gold underline-offset-4">Read the case study <ArrowRight size={16}/>
</span>
</div>
</Link>}<BrandButton type="button" onClick={cta} data-track="vet-cta" data-audience={audience.value} variant="primary" showStar className="text-sm">{audience.cta}</BrandButton>
</div>
</section>;
};

const Vet = () => {
  const fontsLoaded = useFontsLoaded();
  const [animateHero, setAnimateHero] = useState(false);
  useEffect(() => {
    if (fontsLoaded) requestAnimationFrame(() => setAnimateHero(true));
  }, [fontsLoaded]);
  const heroWords = "Veterinary experience meets software expertise".split(" ");
  const vetNavLinks = [
    { label: "Practices", href: "#practices" },
    { label: "Animal health", href: "#animal-health" },
    { label: "Software teams", href: "#software-teams" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];
  const tiles = [{ id: "practices", icon: HeartPulse, title: "Veterinary practices", text: "Help clients find answers and take repetitive work off your team." }, { id: "animal-health", icon: Globe2, title: "Animal-health companies", text: "Make product information clear and useful to the vets reading it." }, { id: "software-teams", icon: Code2, title: "Veterinary software teams", text: "Design clinic software with someone who has actually used it on shift." }];
  return <>
<Navbar pageLinks={vetNavLinks} contactHref="#contact"/>
<main className="bg-off-white">
<section id="top" className="hero-bg relative flex min-h-screen items-center justify-center px-6 pb-44 pt-36 text-center text-off-white md:pb-56 md:pt-48">
<div className="relative z-10 mx-auto w-full max-w-5xl px-2 xs:px-8">
<h1 className="hero-title mx-auto mb-6 max-w-4xl text-[38px] sm:text-[52px] md:mb-8 md:text-[70px]">
{heroWords.map((word, index) => <span key={`${word}-${index}`} className={`hero-word ${animateHero ? "visible" : ""} inline-block pb-2`} style={{ transitionDelay: `${60 * index}ms`, backgroundImage: `url(${goldFill})`, backgroundSize: "100% auto", backgroundPosition: "center", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{word === "meets" ? <em className="font-serif italic">{word}</em> : word}{index < heroWords.length - 1 ? "\u00a0" : ""}</span>)}
</h1>
<p className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mx-auto mb-6 max-w-2xl text-base leading-[1.5] text-off-white/90 md:text-xl`} style={{ transitionDelay: "320ms" }}>We build websites, automations and software for veterinary practices, animal-health companies and veterinary software teams. Our work combines first-hand clinical experience with senior engineering expertise.</p>
<div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} mb-8 flex items-center justify-center gap-3`} style={{ transitionDelay: "370ms" }}>
<span className="h-px w-8 bg-gold/45" aria-hidden="true"/>
<p className="text-sm text-off-white/80"><span className="text-gold-text">Dr. Nikky Pyra</span><span className="mx-2 text-off-white/35">·</span>Veterinarian &amp; software engineer</p>
<span className="h-px w-8 bg-gold/45" aria-hidden="true"/>
</div>
<div className={`hero-fade-enter ${animateHero ? "hero-fade-visible" : ""} flex flex-col items-center justify-center gap-3 sm:flex-row`} style={{ transitionDelay: "420ms" }}>
<BrandButton type="button" variant="hero" showStar className="text-base" onClick={() => { window.history.pushState(null, "", "#contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>Tell us what is slowing you down</BrandButton>
<BrandButton type="button" variant="secondary" className="text-base" onClick={() => { window.history.pushState(null, "", "#audiences"); document.getElementById("audiences")?.scrollIntoView({ behavior: "smooth" }); }}>See how we can help</BrandButton>
</div>
</div>
<div className="wave-mask absolute -bottom-1.5 left-0 right-0">
<svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-10 w-full md:h-auto"><path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z"/></svg>
</div>
</section>
<section id="audiences" className="scroll-mt-32 bg-off-white px-6 py-20 md:py-28">
<div className="mx-auto max-w-6xl">
<div className="mb-10 text-center md:mb-16"><span className="eyebrow-pill eyebrow-pill-light mb-3">How we can help</span><h2 className="font-body text-3xl text-main-teal md:text-4xl">Built for the part of veterinary work you know best.</h2></div>
<div className="grid gap-5 md:grid-cols-3">{tiles.map(({id,icon:Icon,title,text}, index) => { const dark = index === 1; return <a key={id} href={`#${id}`} onClick={() => trackEvent("vet_tile_click", { audience: id })} data-track="vet-tile" data-audience={id} className={`group rounded-lg border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${dark ? "border-white/10 text-off-white" : "border-neutral-border bg-neutral-card text-main-teal"}`} style={dark ? { background: "linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)" } : undefined}>
<Icon className={`mb-6 ${dark ? "text-gold-text" : "text-gold"}`}/><h2 className="font-display text-2xl">{title}</h2><p className={`mt-3 leading-relaxed ${dark ? "text-off-white/75" : "text-main-teal/80"}`}>{text}</p><ArrowRight className={`mt-6 transition group-hover:translate-x-1 ${dark ? "text-gold-text" : "text-main-teal"}`} size={18}/>
</a>; })}</div>
</div>
</section>
<section id="about" className="about-flow relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-28">
<div className="about-orb about-orb-1"/><div className="about-orb about-orb-2"/>
<div className="relative z-10 mx-auto max-w-6xl">
<SectionHeading dark title="Software experience, with veterinary context built in." intro="We are Nikky and Monika, two software engineers based in Zürich. Before becoming an engineer, Nikky worked as a small-animal vet for six years. That combination lets us move comfortably between a clinic conversation and the technical work needed to solve the problem."/>
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{[[nikky,"Dr. Nikky Pyra","Co-founder, Veterinarian & Software Engineer","Nikky practised small-animal medicine for six years in Canada and Germany before moving into software. She's spent six years as a frontend engineer building with React, TypeScript and Vue. She builds tools from the clinic side of the screen, including LabSift, her privacy-first tool for pulling lab values out of PDF reports."],[monika,"Monika Märki","Co-founder, Software Engineer","Bio coming soon — to be written by Monika."]].map(([image,name,role,bio]) => <article key={name} className="grid overflow-hidden rounded-xl border border-neutral-border bg-neutral-card sm:grid-cols-[180px_1fr]">
<img src={image} alt={`${name} portrait`} className="h-full min-h-64 w-full object-cover"/>
<div className="p-7">
<h3 className="font-display text-3xl text-main-teal">{name}</h3>
<p className="mt-1.5 text-sm leading-relaxed text-main-teal/65">{role}</p>
<p className="mt-4 text-sm leading-relaxed text-main-teal/80">{bio}</p>
</div>
</article>)}</div>
<div className="mt-8 rounded-2xl border border-off-white/15 bg-off-white/[0.06] p-8">
<p className="text-xs uppercase tracking-widest text-gold-text">Our partners</p>
<h3 className="mt-2 font-display text-2xl text-off-white">Linley Collaborative</h3>
<p className="mt-3 max-w-3xl text-off-white/70">When an animal-health project also needs commercial strategy or scientific messaging, we work with Linley Collaborative. They shape the strategy and content with you; we turn it into the website or tool.</p>
<p className="mt-3 text-sm italic text-off-white/50">Founder profiles and logo coming soon.</p>
<a href="https://www.linleycollaborative.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-gold-text underline decoration-gold">Visit Linley Collaborative →</a>
</div>
</div>
</section>
<figure className="relative h-[320px] overflow-hidden md:h-[480px] lg:h-[560px]">
<img src={vetEditorialAnimals} alt="A dog and cat resting in a contemporary veterinary consultation room" className="h-full w-full object-cover"/>
<div className="absolute inset-0 bg-gradient-to-r from-deep-ink/35 via-transparent to-deep-ink/10" aria-hidden="true"/>
</figure>
{audiences.map((audience,index) => <AudienceSection key={audience.id} audience={audience} tinted={index % 2 === 1}/>)}<section id="pricing" className="scroll-mt-28 dark-teal-surface px-6 py-20 md:py-28">
<div className="mx-auto max-w-6xl">
<SectionHeading title="Know what it will cost before we start." dark/>
<div className="grid gap-6 md:grid-cols-3">{[["Websites","Our website packages start at CHF 3,500."],["Automations","We first look at the task you want to improve and the software involved. Then we give you a fixed scope and price—before we build anything."],["Custom software work","For product design, frontend development and more involved tools, we agree on a fixed project price or a day rate for ongoing support."]].map(([title,text]) => <article key={title} className="dark-surface-card rounded-xl border border-white/10 p-8">
<h3 className="font-display text-3xl text-off-white">{title}</h3>
<p className="mt-3 text-off-white/75">{text}</p>{title === "Websites" && <a href="/#pricing" className="mt-5 inline-block text-gold-text underline decoration-gold">See website packages →</a>}</article>)}</div>
<p className="mt-10 text-lg text-off-white/80">You do not need to arrive with a solution. Tell us what is frustrating your team and we can work out whether software can help.</p>
<div className="mt-5"><BrandButton type="button" variant="primary" showStar className="text-sm" data-track="vet-cta" data-audience="general" onClick={() => { trackEvent("vet_cta", { audience: "general", location: "pricing" }); window.history.pushState(null, "", "#contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>Book a 20-minute call</BrandButton></div>
</div>
</section>
<section id="how-we-work" className="scroll-mt-28 bg-off-white px-6 py-20 md:py-28">
<div className="mx-auto max-w-6xl">
<SectionHeading title="Start with one problem worth fixing."/>
<div className="grid gap-8 md:grid-cols-4">{[["Tell us what is happening","You show us where time is being lost, what clients keep asking or what your product needs to do better."],["Choose a useful first step","We suggest a focused piece of work and give you a clear price and timeline. If we are not the right people, we will say so."],["See it while we build","We share working versions early, so your team can react before decisions become expensive to change."],["Use it with confidence","We launch it, explain how it works and leave your team with the documentation they need."]].map(([title,text],i) => <div key={title}>
<span className="font-serif text-5xl text-gold">0{i+1}</span>
<h3 className="mt-3 font-display text-2xl text-main-teal">{title}</h3>
<p className="mt-2 text-main-teal/75">{text}</p>
</div>)}</div>
<p className="mt-12 rounded-2xl bg-main-teal p-7 text-off-white/80">We are based in Zürich and work in English and German. Most projects can be done remotely. If you run a practice in Switzerland, we are also happy to visit—watching the work happen is often the quickest way to understand what needs fixing.</p>
</div>
</section>
<section id="contact" className="scroll-mt-28 dark-teal-surface px-6 py-20 md:py-28">
<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
<div>
<span className="eyebrow-pill eyebrow-pill-dark mb-4">Contact</span>
<h2 className="font-display text-4xl text-off-white md:text-5xl">What is making the work harder than it needs to be?</h2>
<p className="mt-5 text-lg text-off-white/70">Tell us what is happening in a few lines. You do not need to know what the technical solution is—that is the part we can help with.</p>
<a href="mailto:hello@monire.ch" className="mt-6 inline-block text-gold-text underline">hello@monire.ch</a>
<p className="mt-8 text-sm text-off-white/50">Direct booking link coming soon.</p>
</div>
<VetForm/>
</div>
</section>
</main>
<Footer hideWave pageLinks={[...vetNavLinks, { label: "Contact", href: "#contact" }]}/>
</>;
};

export default Vet;
