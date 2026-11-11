import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/monire_logo.png';
import ContactModal from './ContactModal';
import BrandButton from './BrandButton';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';
import { stripLocalePrefix } from '@/lib/localeRouting';
import { useLocalePath } from '@/hooks/useLocalePath';

type NavbarProps = {
  pageLinks?: Array<{ label: string; href: string }>;
  contactHref?: string;
};

const Navbar = ({ pageLinks, contactHref }: NavbarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const localePath = useLocalePath();
  const basePathname = stripLocalePrefix(location.pathname);
  const isHome = basePathname === '/';
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(isHome ? '#' : '');

  const usesLocalAnchors = Boolean(pageLinks);
  const getHref = (href: string) => (href.startsWith("#") ? (isHome || usesLocalAnchors ? href : localePath(`/${href}`)) : localePath(href));
  const logoHref = isHome ? '#' : localePath('/');
  const isPathLinkActive = (href: string) =>
    !href.startsWith('#') &&
    (basePathname === href || basePathname.startsWith(`${href}/`));
  const isLinkActive = (href: string) =>
    ((isHome || usesLocalAnchors) && activeLink === href) || (!isHome && !usesLocalAnchors && isPathLinkActive(href));
  const openContactModal = (source: string) => {
    trackEvent('contact_click', { location: 'navbar', label: source, page_path: location.pathname });
    if (contactHref) {
      window.history.pushState(null, '', contactHref);
      document.querySelector(contactHref)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setContactOpen(true);
  };

  const defaultNavLinks = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.ourWork'), href: '#portfolio' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.pricing'), href: '#pricing' },
  ];
  const navLinks = pageLinks ?? defaultNavLinks;
  useEffect(() => {
    if (!isHome && !usesLocalAnchors) {
      setActiveLink('');
      return;
    }

    const hash = location.hash || '#';
    setActiveLink(hash);
  }, [isHome, usesLocalAnchors, location.hash]);

  useEffect(() => {
    if (!isHome && !usesLocalAnchors) return;
    const sectionLinks = navLinks.filter((link) => link.href.startsWith('#') && link.href !== '#');
    const activationLine = 120;

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

      const activeSectionHash =
        sectionLinks.find((link) => {
          const section = document.querySelector(link.href) as HTMLElement | null;
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom > activationLine;
        })?.href ?? '#';

      setActiveLink(activeSectionHash);
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
  }, [isHome, usesLocalAnchors, navLinks]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden lg:flex justify-center px-8 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-3 xl:px-8 py-1.5 rounded-full border border-off-white/[0.07]"
          style={{
            background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            height: '4.4rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
          }}
        >
          <a href={logoHref} className="flex-shrink-0">
            <img src={logo} alt={t('common.logoAlt')} className="h-6 xl:h-7 mb-0.5" />
          </a>

          <div className="flex items-center gap-1.5 xl:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => {
                  setActiveLink(link.href);
                  if (link.href === '#pricing') {
                    trackEvent('pricing_nav_click', { location: 'navbar', page_path: location.pathname });
                  }
                  if (isHome && link.href === '#') {
                    e.preventDefault();
                    window.history.pushState(null, '', localePath('/#'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`relative px-3.5 xl:px-4 py-1.5 rounded-full text-[14px] xl:text-[15px] font-body tracking-wide transition-all duration-200 ${
                  isLinkActive(link.href)
                    ? 'text-off-white'
                    : 'text-off-white/80 hover:text-gold-hover'
                }`}
                style={
                  isLinkActive(link.href)
                    ? { boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.15)' }
                    : {}
                }
              >
                {link.label}
              </a>
            ))}
            {!usesLocalAnchors && <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-full px-3.5 xl:px-4 py-1.5 text-[14px] xl:text-[15px] font-body tracking-wide text-off-white/80 transition-all duration-200 hover:text-gold-hover"
              >
                {t('nav.industries')}
                <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-off-white/10 bg-[#082f3af7] p-2 shadow-2xl backdrop-blur-xl">
                  <a
                    href="/vet"
                    className="block rounded-xl px-4 py-3 text-sm text-off-white/85 transition-colors hover:bg-off-white/[0.07] hover:text-gold-hover focus:bg-off-white/[0.07] focus:text-gold-hover focus:outline-none"
                  >
                    {t('nav.veterinaryIndustry')}
                  </a>
                </div>
              </div>
            </div>}
          </div>

          <div className="flex items-center gap-2 xl:gap-3">
            <LanguageSwitcher />
            {/* CTA */}
            <BrandButton
              onClick={() => openContactModal('nav')}
              variant="primary"
              showStar
              className="flex-shrink-0 ml-1 !px-4 xl:!px-5 !py-2 text-[12px] xl:text-[13px] font-semibold tracking-widest"
            >
              {t('nav.contactUs')}
            </BrandButton>
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
        <a href={logoHref}>
          <img src={logo} alt={t('common.logoAlt')} className="h-6 mb-1" />
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(true)}
            className="text-gold-text transition-colors hover:text-gold-hover"
            aria-label={t('nav.openMenu')}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
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
              <img src={logo} alt={t('common.logoAlt')} className="h-6 mb-0.5" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-off-white/70 hover:text-off-white transition-colors"
                aria-label={t('nav.closeMenu')}
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
                      onClick={() => {
                        if (link.href === '#pricing') {
                          trackEvent('pricing_nav_click', { location: 'mobile_nav', page_path: location.pathname });
                        }
                        setActiveLink(link.href);
                        setMobileOpen(false);
                      }}
                      aria-current={isLinkActive(link.href) ? 'page' : undefined}
                      className="group block py-5 border-b border-off-white/[0.07] transition-colors duration-200"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className={`text-lg font-body tracking-wide transition-colors duration-200 ${
                        isLinkActive(link.href)
                          ? 'text-gold-text'
                          : 'text-off-white group-hover:text-gold-hover'
                      }`}>
                        {link.label}
                      </span>
                    </a>
                  ))}
                  {!usesLocalAnchors && <div className="border-b border-off-white/[0.07] py-5">
                    <p className="text-lg font-body tracking-wide text-off-white">{t('nav.industries')}</p>
                    <a
                      href="/vet"
                      onClick={() => setMobileOpen(false)}
                      className="mt-3 block border-l border-gold-text/40 py-1 pl-4 text-base font-body text-off-white/75 transition-colors hover:text-gold-hover"
                    >
                      {t('nav.veterinaryIndustry')}
                    </a>
                  </div>}
                </nav>

                <div className="px-6 pb-10 pt-4 mt-auto">
                  <button
                    onClick={() => {
                      openContactModal('nav');
                      setMobileOpen(false);
                    }}
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

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} source="nav" />
    </>
  );
};

export default Navbar;
