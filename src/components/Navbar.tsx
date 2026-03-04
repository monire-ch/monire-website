import { useState } from 'react';
import logo from '@/assets/monire_logo.png';
import ContactModal from './ContactModal';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <a href="#" className="flex items-center">
          <img src={logo} alt="Moniré" className="h-6 md:h-7" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-off-white/80 hover:text-gold-text transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => setContactOpen(true)} className="btn-outline-gold text-sm py-2 px-5">
            Contact Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-off-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 dark-teal-surface p-6 flex flex-col gap-4 md:hidden">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-off-white/80 hover:text-gold-text transition-colors font-body"
              >
                {l.label}
              </a>
            ))}
            <button onClick={() => { setContactOpen(true); setMenuOpen(false); }} className="btn-outline-gold text-sm py-2 px-5 mt-2">
              Contact Us
            </button>
          </div>
        )}
      </nav>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
