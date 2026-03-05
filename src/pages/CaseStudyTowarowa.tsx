import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import towarowa from '@/assets/towarowa_full.png';

const CaseStudyTowarowa = () => {
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

          <span className="eyebrow-pill eyebrow-pill-light mb-4">Real Estate</span>
          <h1 className="font-display text-4xl md:text-5xl text-main-teal mb-8">Towarowa 41</h1>

          <div className="rounded-xl overflow-hidden border border-neutral-border mb-10">
            <img src={towarowa} alt="Towarowa 41" className="w-full h-auto" />
          </div>

          <p className="font-body text-main-teal/70 text-lg leading-relaxed">
            An elegant luxury apartment listing with editorial photography and refined typography. The design captures the sophistication and exclusivity of the property while providing a seamless browsing experience.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CaseStudyTowarowa;
