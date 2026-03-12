import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Moniré",
    alternateName: "Monire",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/monire_logo.png`,
    email: "hello@monire.ch",
    description:
      "Digital studio offering web design, web development, and AI automations in Zurich and across Switzerland.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zürich",
      addressCountry: "CH",
    },
    areaServed: [
      { "@type": "City", name: "Zürich" },
      { "@type": "Country", name: "Switzerland" },
    ],
    sameAs: [
      "https://www.instagram.com/hello.monire",
      "https://www.linkedin.com/company/monire",
    ],
    serviceType: ["Web Design", "Web Development", "AI Automations"],
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection onCtaClick={() => setContactOpen(true)} />
        <FeaturesSection />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <FAQSection />
        <CTASection />
        <Footer hideWave />
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>
      <JsonLd data={businessSchema} />
    </>
  );
};

export default Index;
