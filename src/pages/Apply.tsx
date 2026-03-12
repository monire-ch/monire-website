import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ContactModal from '@/components/ContactModal';
import StarIcon from '@/components/StarIcon';

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
      <div className="about-orb about-orb-2" style={{ bottom: '120px', left: '-40px', width: '320px', height: '320px', background: 'rgba(120, 200, 255, 0.25)' }} />
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
              <button onClick={() => setContactOpen(true)} className="btn-outline-gold text-sm inline-flex items-center gap-2">
                Apply now
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="border-t border-off-white/10 mx-6" />
      <Footer hideWave />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Apply;
