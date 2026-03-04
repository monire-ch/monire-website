import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import snipSquad from '@/assets/snip-squad_full.png';
import systemically from '@/assets/systemically_full.png';
import towarowa from '@/assets/towarowa_full.png';

const projectImages = [snipSquad, systemically, towarowa];
const projectTags = [
  ['React', 'Tailwind', 'CMS'],
  ['Next.js', 'Framer Motion'],
  ['Design', 'Photography'],
];

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [catFilter, setCatFilter] = useState(0); // index into categories

  const categories = t('portfolio.categories', { returnObjects: true }) as string[];
  const projects = t('portfolio.projects', { returnObjects: true }) as Array<{
    title: string; category: string; desc: string;
  }>;

  const filtered = catFilter === 0
    ? projects.map((p, i) => ({ ...p, img: projectImages[i], tags: projectTags[i], origIdx: i }))
    : projects
        .map((p, i) => ({ ...p, img: projectImages[i], tags: projectTags[i], origIdx: i }))
        .filter((p) => p.category === categories[catFilter]);

  const current = filtered[active] || filtered[0];

  return (
    <section id="portfolio" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">{t('portfolio.eyebrow')}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">{t('portfolio.title')}</h2>
        </ScrollReveal>

        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => { setCatFilter(idx); setActive(0); }}
              className={`px-4 py-1.5 rounded-full text-xs font-body transition-all duration-200 border ${
                catFilter === idx
                  ? 'bg-main-teal text-off-white border-main-teal'
                  : 'border-neutral-border text-deep-ink/60 hover:border-main-teal hover:text-main-teal'
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {filtered.length > 0 && current && (
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {current.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-main-teal/10 text-main-teal font-body">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-xl text-deep-ink">{current.title}</h3>
                <p className="text-[15px] text-deep-ink/60 font-body leading-relaxed">{current.desc}</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-neutral-border bg-neutral-card">
                <div className="relative">
                  {filtered.map((project, i) => (
                    <div
                      key={project.title}
                      className="portfolio-card"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? 'translateX(0) scale(1)' : i < active ? 'translateX(-4%) scale(0.985)' : 'translateX(4%) scale(0.985)',
                        filter: i === active ? 'none' : 'saturate(0.7)',
                        position: i === active ? 'relative' : 'absolute',
                        top: 0, left: 0, right: 0,
                      }}
                    >
                      <img src={project.img} alt={project.title} className="w-full h-auto rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === active ? 'bg-main-teal scale-110' : 'bg-neutral-border'
                    }`}
                  />
                ))}
              </div>
            )}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
