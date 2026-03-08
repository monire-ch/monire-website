import { useTranslation } from 'react-i18next';
import { Instagram } from 'lucide-react';
import logo from '@/assets/monire_logo.png';
import linkedinIcon from '@/assets/linkedin.svg';

const Footer = ({ hideWave = false }: { hideWave?: boolean }) => {
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.ourWork'), href: '#portfolio' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contactUs'), href: '#contact' },
    { label: t('footer.privacyPolicy'), href: '/privacy' },
  ];

  return (
    <footer className="dark-teal-surface relative pt-16 pb-8 px-6">
      {!hideWave && (
        <div className="absolute -top-px left-0 right-0 wave-mask-dark rotate-180">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
            <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
          </svg>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <img src={logo} alt="Moniré" className="h-7 md:h-9 mb-4 -ml-2 md:ml-0 md:-translate-x-[2.4rem]" />
            <p className="text-off-white text-base font-body max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/hello.monire"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-[2.4rem] h-[2.4rem] rounded-full border border-gold-text/40 text-gold-text transition-all duration-200 hover:border-gold-text/70 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/monire"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-[2.4rem] h-[2.4rem] rounded-full border border-gold-text/40 transition-all duration-200 hover:border-gold-text/70 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
              >
                <img src={linkedinIcon} alt="" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)' }} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-24">
            <div>
              <p className="text-gold-text text-[1rem] tracking-widest uppercase font-body mb-6">{t('footer.quickLinks')}</p>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-off-white text-base font-body hover:text-gold-text transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold-text text-[1rem] tracking-widest uppercase font-body mb-6">{t('footer.contact')}</p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@monire.ch" className="text-gold-text text-base font-body hover:text-gold-hover transition-colors">
                    hello@monire.ch
                  </a>
                </li>
                <li>
                  <span className="text-off-white text-base font-body">Zürich, Switzerland</span>
                </li>
                <li>
                  <span className="text-off-white text-base font-body">Serving clients worldwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white/10 pt-6 text-center">
          <p className="text-off-white text-[1rem] font-body">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
