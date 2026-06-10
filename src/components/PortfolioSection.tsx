import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useEmblaCarousel from 'embla-carousel-react';
import ScrollReveal from './ScrollReveal';
import snipSquad from '@/assets/portfolio/snip-squad_full.webp';
import systemically from '@/assets/portfolio/systemically_full.webp';
import towarowa from '@/assets/portfolio/towarowa_full.webp';
import n8nPreview from '@/assets/portfolio/n8n.webp';
import { trackEvent } from '@/lib/analytics';

const projectImages = [snipSquad, systemically, towarowa, n8nPreview];

const portfolioNavGroups = [
  {
    title: 'Web design & development',
    items: [
      { label: 'Veterinary', targetCategory: 'Veterinary' },
      { label: 'Community Platform', targetCategory: 'Community platform' },
      { label: 'Consulting', targetCategory: 'Consulting' },
      { label: 'Real estate', targetCategory: 'Real Estate' },
    ],
  },
  {
    title: 'AI automation',
    items: [
      { label: 'Expense receipts', targetCategory: 'AI automation' },
      { label: 'Community membership', targetCategory: 'Community platform' },
    ],
  },
];

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const projects = t('portfolio.projects', { returnObjects: true }) as Array<{
    title: string; category: string; desc: string; link: string;
  }>;

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    align: 'center',
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
    const idx = projects.findIndex((p) => p.category.toLowerCase() === categoryName.toLowerCase());
    if (idx !== -1) emblaApi.scrollTo(idx);
  }, [emblaApi, projects]);

  const currentProject = projects[selectedIndex];

  return (
    <section id="portfolio" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('portfolio.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('portfolio.title')}</h2>
          <p className="text-base md:text-lg font-body leading-relaxed text-main-teal/80 max-w-3xl mx-auto mt-4">
            Selected web design, web development, and AI automation projects created for brands that value clarity,
            performance, and thoughtful execution.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
            {/* Category sidebar — dark teal card like reference */}
            <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)' }}>
              {portfolioNavGroups.map((group, groupIndex) => (
                <div key={group.title}>
                  {groupIndex > 0 && <div className="my-5 h-px bg-off-white/15" />}
                  <p className="px-4 pb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-text">
                    {group.title}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1 md:mt-3 md:grid-cols-1">
                    {group.items.map((item) => {
                      const isActive = currentProject?.category.toLowerCase() === item.targetCategory.toLowerCase();
                      return (
                        <button
                          key={`${group.title}-${item.label}`}
                          onClick={() => scrollToProject(item.targetCategory)}
                          className={`w-fit justify-self-center self-center px-3 py-2 text-center font-body text-sm transition-all duration-200 md:w-full md:justify-self-stretch md:self-auto md:px-4 md:py-3 md:text-left ${
                            isActive
                              ? 'rounded-full border border-gold/40 bg-off-white/10 text-gold-text'
                              : 'rounded-lg border border-transparent text-off-white/75 hover:text-gold-text'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
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
                      <Link
                        to={project.link}
                        onClick={() =>
                          trackEvent('case_study_click', {
                            location: 'portfolio',
                            case_study: project.link.replace('/case-studies/', ''),
                            destination: project.link,
                            page_path: window.location.pathname,
                          })
                        }
                        className="block group"
                      >
                        <div className={`relative overflow-hidden rounded-xl border border-neutral-border h-[380px] md:h-[440px] ${i === 3 ? 'bg-[#0a0a0a]' : 'bg-neutral-card'}`}>
                          <img
                            src={projectImages[i]}
                            alt={`${project.title} website preview`}
                            className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${i === 3 ? 'object-contain object-center' : 'object-cover object-top'}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="disabled:cursor-not-allowed"
                  aria-label="Previous project"
                >
                  <svg width="44" height="44" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="44" cy="44" r="44" fill={canScrollPrev ? '#004A5B' : '#8EA3AA'} />
                    <path d="M49 31L37 43L49 55" stroke="#F4F8FA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="disabled:cursor-not-allowed"
                  aria-label="Next project"
                >
                  <svg width="44" height="44" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="44" cy="44" r="44" fill={canScrollNext ? '#004A5B' : '#8EA3AA'} />
                    <path d="M39 31L51 43L39 55" stroke="#F4F8FA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
