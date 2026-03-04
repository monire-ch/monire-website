import { useState, useEffect } from 'react';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/monire_logo.png';
import ContactModal from './ContactModal';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
];

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'FR', label: 'Français' },
];

const Navbar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [activeLink, setActiveLink] = useState('');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-6 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border border-off-white/[0.07]"
          style={{
            background: 'linear-gradient(135deg, rgba(8,47,58,0.88) 0%, rgba(5,34,44,0.92) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            height: '4.2rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(248,245,241,0.04)',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex-shrink-0 pl-3 pr-4">
            <img src={logo} alt="Moniré" className="h-5" />
          </a>

          {/* Separator */}
          <div className="w-px h-5 bg-off-white/10 flex-shrink-0" />

          {/* Nav links */}
          <div className="flex items-center gap-0.5 px-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-body tracking-wide transition-all duration-200
                  ${activeLink === link.href
                    ? 'bg-focus-teal/40 text-off-white'
                    : 'text-off-white/80 hover:text-gold-hover'
                  }
                `}
                style={{
                  ...(activeLink === link.href
                    ? { boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.15)' }
                    : {}),
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-off-white/10 flex-shrink-0" />

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-off-white/70 font-body transition-colors duration-200 hover:text-off-white/90"
              style={{ background: 'rgba(248,245,241,0.06)' }}
            >
              <Globe size={13} strokeWidth={1.5} />
              <span>{activeLang}</span>
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
                      onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-[13px] font-body transition-colors duration-150 ${
                        activeLang === lang.code
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
            className="flex-shrink-0 ml-1 px-5 py-2 rounded-full text-[12px] font-body font-semibold uppercase tracking-widest transition-all duration-200 text-off-white"
            style={{
              background: 'linear-gradient(135deg, #0F4B5A 0%, #136175 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.3), 0 2px 8px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(207,169,71,0.55), 0 2px 12px rgba(207,169,71,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(207,169,71,0.3), 0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            Contact Us
          </button>
        </nav>
      </header>

      {/* ─── Mobile Top Bar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 py-4">
        <a href="#">
          <img src={logo} alt="Moniré" className="h-5" />
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-fade-in"
            style={{ background: 'rgba(1,27,34,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu panel */}
          <div
            className="absolute inset-0 flex flex-col animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, rgba(1,20,28,0.98) 0%, rgba(8,47,58,0.96) 60%, rgba(15,75,90,0.92) 100%)',
            }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-5">
              <img src={logo} alt="Moniré" className="h-5" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-off-white/70 hover:text-off-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 flex flex-col px-6 pt-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.href); setMobileOpen(false); }}
                  className="group block py-5 border-b border-off-white/[0.07] transition-colors duration-200"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="text-off-white text-lg font-body tracking-wide group-hover:text-gold-hover transition-colors duration-200">
                    {link.label}
                  </span>
                </a>
              ))}

              {/* Language in mobile */}
              <div className="py-5 border-b border-off-white/[0.07]">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-off-white/50" strokeWidth={1.5} />
                  <div className="flex gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setActiveLang(lang.code)}
                        className={`text-sm font-body transition-colors duration-200 ${
                          activeLang === lang.code ? 'text-gold-text' : 'text-off-white/50 hover:text-off-white/80'
                        }`}
                      >
                        {lang.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-10 pt-4">
              <button
                onClick={() => { setContactOpen(true); setMobileOpen(false); }}
                className="w-full py-3.5 rounded-full text-sm font-body font-semibold uppercase tracking-widest text-off-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #0F4B5A 0%, #136175 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(207,169,71,0.3)',
                }}
              >
                Contact Us
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
