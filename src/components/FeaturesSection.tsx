import ScrollReveal from './ScrollReveal';

const features = [
  { title: '10+ Years of Excellence', desc: 'A decade of experience creating websites that deliver results for businesses of all sizes.' },
  { title: 'AI, Google & Speed Optimized', desc: 'Every website is built with cutting-edge optimization for AI search, Google rankings, and blazing-fast load times.' },
  { title: '5 Hours of Maintenance', desc: 'Included monthly maintenance hours to keep your site secure, updated, and performing at its best.' },
  { title: 'Direct Collaboration', desc: 'No middlemen. Work directly with the founders who design and build your website.' },
  { title: '24/7 Time Savings', desc: 'Automation solutions that work around the clock, saving you countless hours of manual work.' },
  { title: 'Easy Updates', desc: 'Manage your content effortlessly with user-friendly CMS solutions built into every project.' },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">What We Offer</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">
            Everything your business needs.{' '}
            <span className="italic text-main-teal">Website & more.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="bg-neutral-card border border-neutral-border rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-lg text-deep-ink mb-2">{f.title}</h3>
                <p className="text-[15px] text-deep-ink/70 font-body leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
