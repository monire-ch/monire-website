import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/monire_logo.png';
import ContactModal from './ContactModal';

const languages = [
  { code: 'en', label: 'English', display: 'EN' },
  { code: 'de', label: 'Deutsch', display: 'DE' },
  { code: 'pl', label: 'Polski', display: 'PL' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#');

  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.ourWork'), href: '#portfolio' },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 100) setActiveLink('#');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-8 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-5 py-1.5 rounded-full border border-off-white/[0.07]"
          style={{
            background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            height: '4.4rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
          }}
        >
          <a href={getHref('#')} className="flex-shrink-0 pl-2">
            <img src={logo} alt="Moniré" className="h-7" />
          </a>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getHref(link.href)}
                onClick={() => setActiveLink(link.href)}
                className={`relative px-4 py-1.5 rounded-full text-[15px] font-body tracking-wide transition-all duration-200 ${
                  activeLink === link.href
                    ? 'text-off-white'
                    : 'text-off-white/80 hover:text-gold-hover'
                }`}
                style={activeLink === link.href ? { boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.15)' } : {}}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-off-white/70 font-body transition-colors duration-200 hover:text-off-white/90"
                style={{ background: 'rgba(248,245,241,0.06)' }}
              >
                <Globe size={13} strokeWidth={1.5} />
                <span>{currentLang.display}</span>
                <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div
                    className="absolute top-full right-0 mt-2 rounded-xl py-1.5 min-w-[130px] z-50 border border-off-white/[0.07]"
                    style={{
                      background: 'linear-gradient(145deg, rgba(8,47,58,0.95) 0%, rgba(5,34,44,0.98) 100%)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`w-full text-left px-4 py-2 text-[13px] font-body transition-colors duration-150 ${
                          i18n.language === lang.code
                            ? 'text-gold-text'
                            : 'text-off-white/70 hover:text-off-white hover:bg-off-white/[0.05]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => setContactOpen(true)}
              className="btn-gold flex-shrink-0 ml-1 !px-5 !py-2 text-[13px] font-semibold uppercase tracking-widest"
            >
              {t('nav.contactUs')}
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Top Bar ─── */}
      <header className="fixed top-3 left-3 right-3 z-50 md:hidden flex items-center justify-between px-3 py-3 rounded-full border border-off-white/[0.07]"
        style={{
          background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
        }}
      >
        <a href={getHref('#')}>
          <img src={logo} alt="Moniré" className="h-9" />
        </a>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gold transition-colors hover:text-gold-hover"
          aria-label="Open menu"
        >
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </header>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div
            className="absolute inset-0 animate-fade-in"
            style={{ background: 'rgba(1,27,34,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className="absolute inset-0 flex flex-col animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, rgba(1,20,28,0.98) 0%, rgba(8,47,58,0.96) 60%, rgba(15,75,90,0.92) 100%)',
            }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <img src={logo} alt="Moniré" className="h-7" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-off-white/70 hover:text-off-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col px-6 pt-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={() => { setActiveLink(link.href); setMobileOpen(false); }}
                  className="group block py-5 border-b border-off-white/[0.07] transition-colors duration-200"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="text-off-white text-lg font-body tracking-wide group-hover:text-gold-hover transition-colors duration-200">
                    {link.label}
                  </span>
                </a>
              ))}

              <div className="py-5 border-b border-off-white/[0.07]">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-off-white/50" strokeWidth={1.5} />
                  <div className="flex gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`text-sm font-body transition-colors duration-200 ${
                          i18n.language === lang.code ? 'text-gold-text' : 'text-off-white/50 hover:text-off-white/80'
                        }`}
                      >
                        {lang.display}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="px-6 pb-10 pt-4">
              <button
                onClick={() => { setContactOpen(true); setMobileOpen(false); }}
                className="w-full py-3.5 rounded-full text-sm font-body font-semibold uppercase tracking-widest text-off-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #0F4B5A 0%, #136175 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.3)',
                }}
              >
                {t('nav.contactUs')}
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
