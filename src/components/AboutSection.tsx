import ScrollReveal from './ScrollReveal';
import monika from '@/assets/monika.jpg';
import nicole from '@/assets/nicole.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">About Us</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">2 Founders, 1 Vision</h2>
        </ScrollReveal>

        <div className="space-y-12 mb-20">
          {[
            {
              title: 'Our Story',
              text: 'We met through our shared passion for creating meaningful digital experiences. After years of working in web design and automation independently, we joined forces to offer a complete solution for small businesses looking to grow online. Our complementary skills allow us to handle everything from stunning web design to powerful workflow automation.',
            },
            {
              title: 'Why Choose A Duo?',
              text: 'When you work with us, you get the attention and care of a boutique agency with the expertise of seasoned professionals. No layers of management, no outsourcing — just two dedicated founders who are invested in your success. We believe the best results come from close collaboration and genuine partnership.',
            },
            {
              title: 'Giving Back',
              text: 'For every paid project, we build a free or heavily discounted website for a charity, nonprofit, or community initiative. We believe in using our skills to make a positive impact beyond business.',
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <h3 className="font-serif text-xl md:text-2xl text-deep-ink">{item.title}</h3>
                <p className="text-deep-ink/70 font-body leading-relaxed">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Team */}
        <ScrollReveal>
          <h3 className="font-serif text-2xl text-deep-ink mb-8">The Faces Behind The Work</h3>
          <div className="flex flex-wrap gap-8 justify-start">
            {[
              { name: 'Monika Mähli', role: 'Co-Founder & Web Designer', img: monika },
              { name: 'Nikky Pyra', role: 'Co-Founder & Automation Specialist', img: nicole },
            ].map((person) => (
              <div key={person.name} className="flex flex-col items-center w-44">
                <div className="w-36 h-36 rounded-lg overflow-hidden mb-3 border border-neutral-border">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-display text-sm text-deep-ink font-medium">{person.name}</p>
                <p className="text-xs text-deep-ink/60 font-body text-center">{person.role}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
