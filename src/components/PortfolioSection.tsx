import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import ScrollReveal from './ScrollReveal';
import snipSquad from '@/assets/snip-squad_full.png';
import systemically from '@/assets/systemically_full.png';
import towarowa from '@/assets/towarowa_full.png';

const projectImages = [snipSquad, systemically, towarowa];

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = t('portfolio.categories', { returnObjects: true }) as string[];
  const projects = t('portfolio.projects', { returnObjects: true }) as Array<{
    title: string; category: string; desc: string; link: string;
  }>;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    align: 'center',
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollToProject = useCallback((categoryName: string) => {
    if (!emblaApi) return;
    const idx = projects.findIndex((p) => p.category === categoryName);
    if (idx !== -1) emblaApi.scrollTo(idx);
  }, [emblaApi, projects]);

  const currentProject = projects[selectedIndex];

  return (
    <section id="portfolio" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('portfolio.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('portfolio.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start">
            {/* Category sidebar */}
            <div className="flex md:flex-col gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = currentProject?.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => scrollToProject(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-body transition-all duration-200 border text-left whitespace-nowrap ${
                      isActive
                        ? 'bg-main-teal text-off-white border-main-teal'
                        : 'border-neutral-border text-main-teal/60 hover:border-main-teal hover:text-main-teal'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Carousel */}
            <div>
              <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex">
                  {projects.map((project, i) => (
                    <div
                      key={project.title}
                      className="min-w-0 shrink-0 grow-0 basis-full px-2"
                    >
                      <Link to={project.link} className="block group">
                        <div className="relative overflow-hidden rounded-xl border border-neutral-border bg-neutral-card">
                          <img
                            src={projectImages[i]}
                            alt={project.title}
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </div>
                      </Link>
                      <div className="mt-4">
                        <h3 className="font-body text-lg text-main-teal">{project.title}</h3>
                        <p className="text-sm text-main-teal/60 font-body mt-1 leading-relaxed">{project.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={scrollPrev}
                  className="w-10 h-10 rounded-full border border-neutral-border bg-neutral-card flex items-center justify-center text-main-teal hover:bg-main-teal hover:text-off-white transition-all duration-200"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Dots */}
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 self-center ${
                      i === selectedIndex ? 'bg-main-teal scale-110' : 'bg-neutral-border'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}

                <button
                  onClick={scrollNext}
                  className="w-10 h-10 rounded-full border border-neutral-border bg-neutral-card flex items-center justify-center text-main-teal hover:bg-main-teal hover:text-off-white transition-all duration-200"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
