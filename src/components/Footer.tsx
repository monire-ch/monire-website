import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/monire_logo.png';
import SocialMediaIcon from '@/components/SocialMediaIcon';

const Footer = ({ hideWave = false }: { hideWave?: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.ourWork'), href: '#portfolio' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contactUs'), href: '/contact' },
    { label: t('footer.privacyPolicy'), href: '/privacy' },
  ];

  const socialLinks = [
    { platform: 'instagram' as const, href: 'https://www.instagram.com/hello.monire' },
    { platform: 'linkedin' as const, href: 'https://www.linkedin.com/company/monire' },
    { platform: 'x' as const, href: 'https://x.com/hellomonire' },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 items-start">
          {/* Brand column */}
          <div>
            <Link to="/#">
              <img src={logo} alt="Moniré" className="h-6 lg:h-7 mb-4" />
            </Link>
            <p className="text-off-white text-base font-body max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((socialLink) => (
                <SocialMediaIcon key={socialLink.platform} href={socialLink.href} platform={socialLink.platform} size="footer" />
              ))}
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <p className="text-gold-text text-[1rem] tracking-widest uppercase font-body mb-6">{t('footer.quickLinks')}</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} className="text-off-white text-base font-body hover:text-gold-text transition-colors text-left">
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (window.location.pathname !== '/') {
                          e.preventDefault();
                          navigate('/' + item.href);
                        }
                      }}
                      className="text-off-white text-base font-body hover:text-gold-text transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
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

        <div className="border-t border-off-white/10 pt-6 text-center">
          <p className="text-off-white/70 text-[1rem] font-body">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
