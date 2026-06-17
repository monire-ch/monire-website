import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandButton from "@/components/BrandButton";
import { useLocalePath } from "@/hooks/useLocalePath";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const localePath = useLocalePath();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="hero-bg min-h-screen pt-36 md:pt-44 pb-20 px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="rounded-2xl border border-off-white/15 bg-dark-teal-surface/70 backdrop-blur-sm p-8 md:p-12 text-center">
            <p className="font-body text-gold-text text-sm tracking-[0.14em] uppercase mb-4">{t('notFound.eyebrow')}</p>
            <h1 className="font-display text-6xl md:text-8xl text-off-white leading-none mb-6">404</h1>
            <p className="font-tertiary italic text-2xl md:text-3xl text-gold-text mb-4">
              {t('notFound.title')}
            </p>
            <p className="font-body text-off-white/85 text-base md:text-lg max-w-xl mx-auto mb-8">
              {t('notFound.bodyPrefix')} <span className="text-gold-text">{location.pathname}</span> {t('notFound.bodySuffix')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <BrandButton type="link" to="/" variant="primary" showStar>
                {t('common.backToHome')}
              </BrandButton>
              <BrandButton type="link" to="/contact" variant="secondary">
                {t('nav.contactUs')}
              </BrandButton>
            </div>

            <Link
              to={localePath('/#portfolio')}
              className="inline-block mt-7 text-sm font-body text-off-white/85 hover:text-gold-text transition-colors underline underline-offset-2"
            >
              {t('notFound.portfolio')}
            </Link>
            <div>
              <Link
                to={localePath('/insights')}
                className="inline-block mt-3 text-sm font-body text-off-white/85 hover:text-gold-text transition-colors underline underline-offset-2"
              >
                {t('notFound.insights')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default NotFound;
