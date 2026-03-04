import ScrollReveal from './ScrollReveal';
import n8nPreview from '@/assets/n8n_preview.webp';

const ServicesSection = () => {
  const services = [
    {
      badge: 'Design',
      title: 'Web Design',
      desc: 'We design and build responsive, SEO-optimized websites tailored to your business goals. From branding to launch, we handle everything so you can focus on running your business. Includes a custom CMS, SSL, hosting support, and 5 hours of monthly maintenance.',
      visual: null,
    },
    {
      badge: 'Automation',
      title: 'Workflow Automation',
      desc: 'We build smart automations using tools like n8n, Make, and Zapier to save you hours of manual work each week. From lead capture to invoicing, we connect your tools and streamline your processes so your business runs smoothly in the background.',
      visual: n8nPreview,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">Services</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">
            Practical Solutions That Move<br />
            <span className="italic">Your Business Forward</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div className="dark-teal-surface rounded-xl overflow-hidden">
                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                  {s.visual && (
                    <div className="md:w-1/3 flex-shrink-0">
                      <img src={s.visual} alt={s.title} className="rounded-lg w-full" />
                    </div>
                  )}
                  <div className={s.visual ? 'md:w-2/3' : 'w-full'}>
                    <span className="text-gold-text text-xs tracking-widest uppercase font-body mb-2 block">{s.badge}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-off-white mb-3">{s.title}</h3>
                    <p className="text-off-white/70 font-body leading-relaxed text-[15px]">{s.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
