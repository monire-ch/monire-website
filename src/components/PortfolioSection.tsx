import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useEmblaCarousel from 'embla-carousel-react';
import ScrollReveal from './ScrollReveal';
import snipSquad from '@/assets/portfolio/snip-squad_full.webp';
import portcoPreview from '@/assets/portfolio/portco_full.webp';
import systemically from '@/assets/portfolio/systemically_full.webp';
import towarowa from '@/assets/portfolio/towarowa_full.webp';
import n8nPreview from '@/assets/portfolio/n8n.webp';
import { trackEvent } from '@/lib/analytics';
import { useLocalePath } from '@/hooks/useLocalePath';

const projectImagesByLink: Record<string, string> = {
  '/case-studies/snip-squad': snipSquad,
  '/case-studies/portco-hr-collective': portcoPreview,
  '/case-studies/systemically': systemically,
  '/case-studies/towarowa': towarowa,
  '/case-studies/expense-receipt-automation': n8nPreview,
};

const portfolioNavGroups = [
  {
    titleKey: 'portfolio.navGroups.webDesignDevelopment.title',
    items: [
      { id: 'web-veterinary', labelKey: 'portfolio.navGroups.webDesignDevelopment.veterinary', targetLink: '/case-studies/snip-squad' },
      { id: 'web-community-platform', labelKey: 'portfolio.navGroups.webDesignDevelopment.communityPlatform', targetLink: '/case-studies/portco-hr-collective' },
      { id: 'web-consulting', labelKey: 'portfolio.navGroups.webDesignDevelopment.consulting', targetLink: '/case-studies/systemically' },
      { id: 'web-real-estate', labelKey: 'portfolio.navGroups.webDesignDevelopment.realEstate', targetLink: '/case-studies/towarowa' },
    ],
  },
  {
    titleKey: 'portfolio.navGroups.aiAutomation.title',
    items: [
      { id: 'ai-expense-receipts', labelKey: 'portfolio.navGroups.aiAutomation.expenseReceipts', targetLink: '/case-studies/expense-receipt-automation' },
      { id: 'ai-community-membership', labelKey: 'portfolio.navGroups.aiAutomation.communityMembership', targetLink: '/case-studies/portco-hr-collective' },
    ],
  },
];

const portfolioNavItems = portfolioNavGroups.flatMap((group) => group.items);

const PortfolioSection = () => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeNavItemId, setActiveNavItemId] = useState(portfolioNavItems[0].id);

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
    const nextSelectedIndex = emblaApi.selectedScrollSnap();
    const nextProject = projects[nextSelectedIndex];

    setSelectedIndex(nextSelectedIndex);
    setActiveNavItemId((currentActiveNavItemId) => {
      const currentActiveNavItem = portfolioNavItems.find((item) => item.id === currentActiveNavItemId);

      if (currentActiveNavItem?.targetLink === nextProject?.link) {
        return currentActiveNavItemId;
      }

      return portfolioNavItems.find((item) => item.targetLink === nextProject?.link)?.id ?? currentActiveNavItemId;
    });
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi, projects]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollToProject = useCallback((projectLink: string, navItemId: string) => {
    if (!emblaApi) return;
    setActiveNavItemId(navItemId);
    const idx = projects.findIndex((p) => p.link === projectLink);
    if (idx !== -1) emblaApi.scrollTo(idx);
  }, [emblaApi, projects]);

  const scrollToNavItem = useCallback((direction: 1 | -1) => {
    const currentNavIndex = portfolioNavItems.findIndex((item) => item.id === activeNavItemId);
    const nextNavIndex = (currentNavIndex + direction + portfolioNavItems.length) % portfolioNavItems.length;
    const nextNavItem = portfolioNavItems[nextNavIndex];

    scrollToProject(nextNavItem.targetLink, nextNavItem.id);
  }, [activeNavItemId, scrollToProject]);

  const scrollPrev = useCallback(() => scrollToNavItem(-1), [scrollToNavItem]);
  const scrollNext = useCallback(() => scrollToNavItem(1), [scrollToNavItem]);

  const currentProject = projects[selectedIndex];

  return (
    <section id="portfolio" className="pt-20 md:pt-28 pb-20 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-6 md:mb-12">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('portfolio.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('portfolio.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
            {/* Category sidebar — dark teal card like reference */}
            <div className="rounded-2xl p-4 md:p-5" style={{ background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)' }}>
              {portfolioNavGroups.map((group, groupIndex) => (
                <div key={group.titleKey}>
                  {groupIndex > 0 && <div className="my-3 h-px bg-off-white/15 md:my-5" />}
                  <p className="px-2 pb-1 text-center font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-text md:px-4 md:pb-2 md:text-left">
                    {t(group.titleKey)}
                  </p>
                  <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 md:mt-3 md:grid-cols-1 md:gap-x-1">
                    {group.items.map((item) => {
                      const isActive = activeNavItemId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToProject(item.targetLink, item.id)}
                          className={`w-fit justify-self-center self-center px-2 py-1.5 text-center font-body text-sm transition-all duration-200 md:justify-self-start md:self-auto md:px-4 md:py-2.5 md:text-left ${
                            isActive
                              ? 'rounded-full border border-gold/40 bg-off-white/10 text-gold-text'
                              : 'rounded-lg border border-transparent text-off-white/75 hover:text-gold-text'
                          }`}
                        >
                          {t(item.labelKey)}
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
                  {projects.map((project) => (
                    <div
                      key={project.title}
                      className="min-w-0 shrink-0 grow-0 basis-full px-2"
                    >
                      <Link
                        to={localePath(project.link)}
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
                        <div className={`relative overflow-hidden rounded-xl border border-neutral-border h-[380px] md:h-[440px] ${project.link === '/case-studies/expense-receipt-automation' ? 'bg-[#0a0a0a]' : 'bg-neutral-card'}`}>
                          <img
                            src={projectImagesByLink[project.link]}
                            alt={`${project.title} website preview`}
                            className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${project.link === '/case-studies/expense-receipt-automation' ? 'object-contain object-center' : 'object-cover object-top'}`}
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
                  aria-label={t('portfolio.previousProject')}
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
                  aria-label={t('portfolio.nextProject')}
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
