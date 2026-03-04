import logo from '@/assets/monire_logo.png';

const Footer = () => {
  return (
    <footer className="dark-teal-surface relative pt-16 pb-8 px-6">
      <div className="absolute -top-px left-0 right-0 wave-mask-dark rotate-180">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <img src={logo} alt="Moniré" className="h-6 mb-4" />
            <p className="text-off-white/50 text-sm font-body max-w-xs">
              Websites built to attract clients and grow with your business.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-3">Navigation</p>
              <ul className="space-y-2">
                {['About', 'Services', 'Pricing', 'Our Work', 'FAQ'].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/\s+/g, '')}`} className="text-off-white/60 text-sm font-body hover:text-gold-text transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-3">Connect</p>
              <ul className="space-y-2">
                {['LinkedIn', 'Instagram', 'Email'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-off-white/60 text-sm font-body hover:text-gold-text transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white/10 pt-6 text-center">
          <p className="text-off-white/40 text-xs font-body">© 2025 Moniré. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
