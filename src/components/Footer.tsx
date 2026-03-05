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
            <img src={logo} alt="Moniré" className="h-6 mb-4" />
            <p className="text-off-white/50 text-sm font-body max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/hello.monire" target="_blank" rel="noopener noreferrer" className="text-off-white/50 hover:text-gold-text transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/monire" target="_blank" rel="noopener noreferrer" className="text-off-white/50 hover:text-gold-text transition-colors">
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-3">{t('footer.navigation')}</p>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-off-white/60 text-sm font-body hover:text-gold-text transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-3">{t('footer.contact')}</p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@monire.ch" className="text-off-white/60 text-sm font-body hover:text-gold-text transition-colors">
                    hello@monire.ch
                  </a>
                </li>
                <li>
                  <span className="text-off-white/60 text-sm font-body">Zürich, Switzerland</span>
                </li>
                <li>
                  <span className="text-off-white/60 text-sm font-body">Serving clients worldwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white/10 pt-6 text-center">
          <p className="text-off-white/40 text-xs font-body">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
