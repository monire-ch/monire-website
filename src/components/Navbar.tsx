import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/monire_logo.png';
import ContactModal from './ContactModal';
import StarIcon from './StarIcon';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(isHome ? '#' : '');

  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.ourWork'), href: '#portfolio' },
  ];
  useEffect(() => {
    if (!isHome) {
      setActiveLink('');
      return;
    }

    const hash = location.hash || '#';
    setActiveLink(hash);
  }, [isHome, location.hash]);

  useEffect(() => {
    if (!isHome) return;
    const sectionLinks = navLinks.filter((link) => link.href.startsWith('#') && link.href !== '#');

    const updateActiveLinkFromScroll = () => {
      const currentHash = window.location.hash;

      if (window.scrollY < 100) {
        if (currentHash && currentHash !== '#') {
          setActiveLink(currentHash);
          return;
        }
        setActiveLink('#');
        return;
      }

      const probeLine = window.scrollY + 180;
      let visibleSectionHash = '#';

      for (const link of sectionLinks) {
        const section = document.querySelector(link.href) as HTMLElement | null;
        if (section && section.offsetTop <= probeLine) {
          visibleSectionHash = link.href;
        }
      }

      setActiveLink(visibleSectionHash);
    };

    const onScroll = () => {
      requestAnimationFrame(updateActiveLinkFromScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveLinkFromScroll);
    requestAnimationFrame(updateActiveLinkFromScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveLinkFromScroll);
    };
  }, [isHome, navLinks]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden lg:flex justify-center px-8 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-8 py-1.5 rounded-full border border-off-white/[0.07]"
          style={{
            background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            height: '4.4rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
          }}
        >
          <a href={getHref('#')} className="flex-shrink-0">
            <img src={logo} alt="Moniré" className="h-7 mb-0.5" />
          </a>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => {
                  setActiveLink(link.href);
                  if (isHome && link.href === '#') {
                    e.preventDefault();
                    window.history.pushState(null, '', '/#');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`relative px-4 py-1.5 rounded-full text-[15px] font-body tracking-wide transition-all duration-200 ${
                  isHome && activeLink === link.href
                    ? 'text-off-white'
                    : 'text-off-white/80 hover:text-gold-hover'
                }`}
                style={isHome && activeLink === link.href ? { boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.15)' } : {}}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <button
              onClick={() => setContactOpen(true)}
              className="btn-gold flex-shrink-0 ml-1 !px-5 !py-2 text-[13px] font-semibold tracking-widest flex items-center gap-2"
            >
              {t('nav.contactUs')}
              <StarIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile / Tablet Top Bar ─── */}
      <header className="fixed top-3 left-3 right-3 z-50 lg:hidden flex items-center justify-between px-6 py-3 rounded-full border border-off-white/[0.07]"
        style={{
          background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
        }}
      >
        <a href={getHref('#')}>
          <img src={logo} alt="Moniré" className="h-6 mb-1" />
        </a>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gold-text transition-colors hover:text-gold-hover"
          aria-label="Open menu"
        >
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </header>

      {/* ─── Mobile / Tablet Full-Screen Overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in"
            style={{ background: 'rgba(1,27,34,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className="absolute inset-0 flex flex-col animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, rgb(1 20 28) 0%, rgb(8 47 58) 60%, rgb(15 75 90) 100%)',
            }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-5">
              <img src={logo} alt="Moniré" className="h-6 mb-0.5" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-off-white/70 hover:text-off-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="min-h-full flex flex-col">
                <nav className="px-6 pt-8">
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
                </nav>

                <div className="px-6 pb-10 pt-4 mt-auto">
                  <button
                    onClick={() => { setContactOpen(true); setMobileOpen(false); }}
                    className="w-full py-3.5 rounded-full text-base font-body font-semibold uppercase tracking-widest text-off-white transition-all duration-200"
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
          </div>
        </div>
      )}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
