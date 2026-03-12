import { useTranslation } from "react-i18next";
import { Mail, MapPin, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import linkedinIcon from "@/assets/linkedin.svg";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="dark-teal-surface min-h-screen pt-36 md:pt-44 pb-0 relative overflow-hidden">
        <div className="about-orb about-orb-2" style={{ bottom: '-60px', left: '-60px', width: '320px', height: '320px', background: 'rgba(120, 200, 255, 0.25)' }} />
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="eyebrow-pill eyebrow-pill-dark">Contact</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-off-white leading-tight mb-4">
                Let's Work Together
              </h1>
              <p className="text-off-white/60 text-lg font-body max-w-2xl mx-auto">
                Whether you have a project in mind or just want to explore possibilities, we'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 pb-24">
            {/* Left: Info */}
            <div className="hidden lg:block lg:col-span-2 space-y-10 lg:order-2">
              <ScrollReveal>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Get in Touch</h2>
                  <a
                    href="mailto:hello@monire.ch"
                    className="flex items-center gap-3 text-off-white font-body text-lg hover:text-gold-hover transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 group-hover:border-gold-text/60 transition-colors">
                      <Mail size={18} className="text-gold-text" />
                    </span>
                    hello@monire.ch
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Location</h2>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 shrink-0">
                      <MapPin size={18} className="text-gold-text" />
                    </span>
                    <div>
                      <p className="text-off-white font-body text-lg">Zürich, Switzerland</p>
                      <p className="text-off-white/50 font-body text-sm mt-1">Serving clients worldwide</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>


              <ScrollReveal delay={300}>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Follow Us</h2>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/hello.monire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 text-gold-text transition-all duration-200 hover:border-gold-text/60 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/monire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 transition-all duration-200 hover:border-gold-text/60 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
                    >
                      <img
                        src={linkedinIcon}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 lg:order-1">
              <ScrollReveal>
                <div className="dark-surface-card rounded-2xl p-8 md:p-10 border border-off-white/[0.07] overflow-visible">
                  <ContactForm variant="page" formName="contact" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>

      {/* JSON-LD Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Moniré",
            url: "https://monire.ch",
            logo: "https://monire.ch/assets/monire_logo.png",
            email: "hello@monire.ch",
            description: "Custom website development and AI-powered workflow automation in Switzerland.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zürich",
              addressCountry: "CH",
            },
            areaServed: [
              { "@type": "City", name: "Zürich" },
              { "@type": "Country", name: "Switzerland" }
            ],
            sameAs: ["https://www.instagram.com/hello.monire", "https://www.linkedin.com/company/monire"],
            serviceType: ["Web Design", "Web Development", "AI Automations", "Website Migration", "SEO & Analytics"],
          }),
        }}
      />

      <Footer hideWave />
    </>
  );
};

export default Contact;
