import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const tabs = ['Web Design', 'Automation'];

const pricingData: Record<string, Array<{ name: string; price: string; features: string[]; featured?: boolean }>> = {
  'Web Design': [
    {
      name: 'Starter',
      price: "~ CHF3'500",
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO setup',
        'Contact form',
        'CMS integration',
        '2 revision rounds',
      ],
    },
    {
      name: 'Advanced',
      price: "~ CHF6'000",
      featured: true,
      features: [
        'Up to 10 pages',
        'Custom animations',
        'Advanced SEO',
        'Blog setup',
        'Analytics integration',
        'CMS with training',
        '3 revision rounds',
        '5h monthly maintenance',
      ],
    },
    {
      name: 'Premium',
      price: "~ CHF9'000",
      features: [
        'Unlimited pages',
        'E-commerce ready',
        'Full branding package',
        'Priority support',
        'Advanced integrations',
        'Quarterly reviews',
      ],
    },
  ],
  Automation: [
    {
      name: 'Starter',
      price: "~ CHF1'500",
      features: [
        'Up to 3 automations',
        'Basic integrations',
        'Email notifications',
        'Setup & testing',
      ],
    },
    {
      name: 'Advanced',
      price: "~ CHF3'000",
      featured: true,
      features: [
        'Up to 8 automations',
        'Complex workflows',
        'CRM integration',
        'Custom dashboards',
        'Training session',
        'Monthly optimization',
      ],
    },
    {
      name: 'Premium',
      price: "~ CHF5'000",
      features: [
        'Unlimited automations',
        'AI-powered workflows',
        'Full system audit',
        'Dedicated support',
        'Quarterly reviews',
      ],
    },
  ],
};

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('Web Design');

  return (
    <section id="pricing" className="dark-teal-surface py-20 md:py-28 px-6 relative">
      {/* Wave top */}
      <div className="absolute -top-px left-0 right-0 wave-mask-dark rotate-180">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-text text-sm tracking-widest uppercase font-body mb-3">Pricing</p>
          <h2 className="font-serif text-3xl md:text-4xl text-off-white">
            Two Services, One Goal: <em className="italic text-gold-text">Helping<br />Your Business Grow.</em>
          </h2>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal className="flex justify-center mb-10">
          <div className="inline-flex bg-deep-ink/40 rounded-lg p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-body transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-main-teal text-off-white'
                    : 'text-off-white/60 hover:text-off-white/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingData[activeTab].map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`rounded-xl p-7 h-full flex flex-col ${
                  plan.featured
                    ? 'featured-teal-card border border-gold/30'
                    : 'dark-surface-card border border-off-white/10'
                }`}
              >
                <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-1">{plan.name}</p>
                <p className="font-serif text-2xl text-off-white mb-5">{plan.price}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-off-white/70 text-[14px] font-body flex items-start gap-2">
                      <span className="text-gold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={plan.featured ? 'btn-gold text-sm w-full' : 'btn-outline-gold text-sm w-full'}>
                  Get Started
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-14">
          <h3 className="font-serif text-xl text-off-white mb-2">Need Something More Specific?</h3>
          <p className="text-off-white/60 text-[15px] font-body max-w-lg mx-auto">
            Every business is unique. If our packages don't quite fit, we'll create a custom solution tailored to your specific needs and budget.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;
