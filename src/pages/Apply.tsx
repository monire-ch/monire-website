import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ContactModal from '@/components/ContactModal';

const steps = [
  {
    step: 'Step 1',
    title: 'Nominate an organization',
    desc: 'Share who they are, what they do, and why support is needed now.',
  },
  {
    step: 'Step 2',
    title: 'We review for impact fit',
    desc: 'We assess alignment, timing, and where design or development can help most.',
  },
  {
    step: 'Step 3',
    title: 'One initiative is selected',
    desc: 'The selected initiative receives complimentary project support from Moniré.',
  },
];

const Apply = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(rgb(5 40 50) 50%, rgb(3 38 48) 100%)' }}>
      <div className="about-orb about-orb-2" style={{ bottom: '200px', left: '-100px' }} />
      <Navbar />

      <section className="pt-32 pb-32 md:pt-40 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-6">
            <Link to="/#about" className="text-sm text-off-white/50 hover:text-off-white/80 font-body transition-colors">
              ← Back
            </Link>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <span className="eyebrow-pill eyebrow-pill-dark mb-3">Giving Back</span>
            <h1 className="font-body text-3xl md:text-5xl text-off-white mb-6">
              Complimentary Project Support
            </h1>
            <p className="text-base md:text-lg text-off-white/70 font-body leading-relaxed max-w-2xl">
              Every year, we support one non-profit or meaningful initiative with a complimentary design or development project. Know an organization that could benefit?
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <p className="text-sm text-gold-text font-body mb-2">
              Our 2026 recipient has been selected. Applications reopen at year-end.
            </p>
            <a href="https://snipsquad.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-text hover:text-off-white font-body transition-colors underline underline-offset-4">
              2026 Recipient →
            </a>
          </ScrollReveal>

          <ScrollReveal className="mb-8">
            <h2 className="font-body text-2xl md:text-3xl text-off-white mb-8">How It Works</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {steps.map((s, i) => {
              const isDark = i % 2 === 1;
              return (
                <ScrollReveal key={s.step} delay={i * 150}>
                  <div
                    className={`rounded-lg p-6 h-full ${
                      isDark
                        ? 'border border-white/10 text-off-white'
                        : 'border border-white/10'
                    }`}
                    style={{
                      background: isDark
                        ? 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)'
                        : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <span className="text-xs uppercase tracking-widest text-gold-text font-body mb-3 block">
                      {s.step}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl mb-2 text-off-white">{s.title}</h3>
                    <p className="text-base font-body leading-relaxed text-off-white/70">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="flex items-center gap-4">
              <button onClick={() => setContactOpen(true)} className="btn-outline-gold text-sm">
                Apply now
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="relative" style={{ background: '#f8f5f1' }}>
        <div className="absolute left-0 right-0 -top-[179px] z-10">
          <svg viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
            <path fill="#f8f5f1" d="M0,72 C190,150 405,153 720,102 C1018,54 1240,48 1440,111 L1440,180 L0,180 Z" />
          </svg>
        </div>
        <Footer hideWave />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Apply;
