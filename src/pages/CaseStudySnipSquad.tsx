import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import snipSquad from '@/assets/snip-squad_full-hq.png';

const CaseStudySnipSquad = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/#portfolio" className="inline-flex items-center gap-2 text-main-teal/60 hover:text-main-teal font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('caseStudy.back')}
          </Link>

          <span className="eyebrow-pill eyebrow-pill-light mb-4">Veterinary</span>
          <h1 className="font-display text-4xl md:text-5xl text-main-teal mb-8">Snip Squad</h1>

          <div className="rounded-xl overflow-hidden border border-neutral-border mb-10">
            <img src={snipSquad} alt="Snip Squad" className="w-full h-auto" />
          </div>

          <p className="font-body text-main-teal/70 text-lg leading-relaxed">
            A vibrant veterinary clinic website designed to be warm, approachable, and easy to navigate for pet owners. The project focused on creating a friendly digital presence that reflects the care and professionalism of the clinic.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CaseStudySnipSquad;
