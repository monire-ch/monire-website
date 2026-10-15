import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useEmblaCarousel from 'embla-carousel-react';
import ScrollReveal from './ScrollReveal';
import snipSquad from '@/assets/portfolio/snip-squad_full.webp';
import portcoPreview from '@/assets/portfolio/portco_full.webp';
import systemically from '@/assets/portfolio/systemically_full.webp';
import towarowa from '@/assets/portfolio/towarowa_full.webp';
import n8nPreview from '@/assets/portfolio/n8n.webp';
import labsiftPreview from '@/assets/portfolio/labsift-og-image.webp';
import horizonCollective from '@/assets/portfolio/horizon_full.webp';
import { trackEvent } from '@/lib/analytics';
import { useLocalePath } from '@/hooks/useLocalePath';

const projectImagesByLink: Record<string, string> = {
  '/case-studies/horizon-collective': horizonCollective,
  '/case-studies/snip-squad': snipSquad,
  '/case-studies/portco-hr-collective': portcoPreview,
  '/case-studies/systemically': systemically,
  '/case-studies/towarowa': towarowa,
  '/case-studies/expense-receipt-automation': n8nPreview,
  '/case-studies/labsift': labsiftPreview,
};

const projectOutcomeCardKeyByLink: Record<string, string> = {
  '/case-studies/expense-receipt-automation': 'expenseReceipts',
  '/case-studies/invoicing-application': 'invoicing',
  '/case-studies/gdpr-consent-application': 'gdprConsent',
};

const portfolioNavGroups = [
  {
    titleKey: 'portfolio.navGroups.webDesignDevelopment.title',
    items: [
      { id: 'web-veterinary', labelKey: 'portfolio.navGroups.webDesignDevelopment.veterinary', targetLink: '/case-studies/snip-squad' },
      { id: 'web-community-platform', labelKey: 'portfolio.navGroups.webDesignDevelopment.communityPlatform', targetLink: '/case-studies/portco-hr-collective' },
      { id: 'web-future-of-work', labelKey: 'portfolio.navGroups.webDesignDevelopment.futureOfWork', targetLink: '/case-studies/horizon-collective' },
      { id: 'web-consulting', labelKey: 'portfolio.navGroups.webDesignDevelopment.consulting', targetLink: '/case-studies/systemically' },
      { id: 'web-real-estate', labelKey: 'portfolio.navGroups.webDesignDevelopment.realEstate', targetLink: '/case-studies/towarowa' },
    ],
  },
  {
    titleKey: 'portfolio.navGroups.aiAutomation.title',
    items: [
      { id: 'ai-expense-receipts', labelKey: 'portfolio.navGroups.aiAutomation.expenseReceipts', targetLink: '/case-studies/expense-receipt-automation' },
      { id: 'automations-labsift', labelKey: 'portfolio.navGroups.aiAutomation.labsift', targetLink: '/case-studies/labsift' },
      { id: 'apps-invoicing', labelKey: 'portfolio.navGroups.aiAutomation.invoicing', targetLink: '/case-studies/invoicing-application' },
      { id: 'apps-gdpr-consent', labelKey: 'portfolio.navGroups.aiAutomation.gdprConsent', targetLink: '/case-studies/gdpr-consent-application' },
      { id: 'ai-community-membership', labelKey: 'portfolio.navGroups.aiAutomation.communityMembership', targetLink: '/case-studies/portco-hr-collective' },
    ],
  },
];

const portfolioNavItems = portfolioNavGroups.flatMap((group) => group.items);

const containedPreviewLinks = new Set([
  '/case-studies/labsift',
]);

const PortfolioSection = () => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const carouselSectionRef = useRef<HTMLDivElement>(null);
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

  const scrollToProject = useCallback((projectLink: string, navItemId: string, revealOnMobile = false) => {
    if (!emblaApi) return;
    setActiveNavItemId(navItemId);
    const idx = projects.findIndex((p) => p.link === projectLink);
    if (idx !== -1) emblaApi.scrollTo(idx);

    if (revealOnMobile && window.matchMedia('(max-width: 767px)').matches) {
      window.requestAnimationFrame(() => {
        carouselSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
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
  const isCommunityMembershipView = activeNavItemId === 'ai-community-membership';

  return (
    <section id="portfolio" className="pt-20 md:pt-28 pb-20 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-6 md:mb-12">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('portfolio.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('portfolio.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] gap-6 items-start">
            {/* Category sidebar — dark teal card like reference */}
            <div className="hidden rounded-2xl p-4 md:block md:p-5" style={{ background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)' }}>
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
                          onClick={() => scrollToProject(item.targetLink, item.id, true)}
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
            <div ref={carouselSectionRef} className="min-w-0 scroll-mt-24">
              <div className="mb-4 md:hidden">
                <label htmlFor="portfolio-project-select" className="mb-2 block font-body text-sm font-medium text-main-teal">
                  {t('portfolio.selectProject')}
                </label>
                <div className="relative">
                  <select
                    id="portfolio-project-select"
                    value={activeNavItemId}
                    onChange={(event) => {
                      const item = portfolioNavItems.find((navItem) => navItem.id === event.target.value);
                      if (item) scrollToProject(item.targetLink, item.id);
                    }}
                    className="h-12 w-full appearance-none rounded-xl border border-main-teal/20 bg-off-white px-4 pr-12 font-body text-base font-medium text-main-teal shadow-sm outline-none transition-colors focus:border-main-teal focus:ring-2 focus:ring-main-teal/15"
                  >
                    {portfolioNavGroups.map((group) => (
                      <optgroup key={group.titleKey} label={t(group.titleKey)}>
                        {group.items.map((item) => (
                          <option key={item.id} value={item.id}>{t(item.labelKey)}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-main-teal" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
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
                        {projectOutcomeCardKeyByLink[project.link] || (project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView) ? (
                          <div className="hero-bg relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-xl border border-main-teal/15 p-6 transition-transform duration-500 group-hover:scale-[1.01] md:h-[440px] md:min-h-0 md:p-12">
                            <span className="relative font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-text">
                              {project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView
                                ? t('portfolio.outcomeCards.communityMembership.category')
                                : project.category}
                            </span>
                            <div className="relative max-w-xl">
                              <h3 className="mb-4 font-display text-3xl leading-tight text-off-white sm:text-4xl md:mb-5 md:text-5xl">
                                {project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView
                                  ? t('portfolio.outcomeCards.communityMembership.title')
                                  : project.title}
                              </h3>
                              {project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView ? (
                                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-text/85">
                                  {t('portfolio.outcomeCards.communityMembership.client')}
                                </p>
                              ) : null}
                              <p className="max-w-lg font-body text-base leading-relaxed text-off-white/80 md:text-lg">
                                {project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView
                                  ? t('portfolio.outcomeCards.communityMembership.desc')
                                  : project.desc}
                              </p>
                            </div>
                            <div className="relative mt-6 flex flex-wrap items-center gap-2 md:mt-0">
                              {(t(
                                `portfolio.outcomeCards.${
                                  project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView
                                    ? 'communityMembership'
                                    : projectOutcomeCardKeyByLink[project.link]
                                }.highlights`,
                                { returnObjects: true }
                              ) as string[]).map((highlight) => (
                                <span key={highlight} className="rounded-full border border-gold/30 bg-off-white/[0.06] px-3 py-1.5 font-body text-xs text-gold-text">
                                  {highlight}
                                </span>
                              ))}
                              <span className="mt-2 w-full font-body text-sm text-off-white/70 transition-transform duration-300 group-hover:translate-x-1 sm:ml-auto sm:mt-0 sm:w-auto">
                                {t('portfolio.viewCaseStudy')} →
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className={`relative overflow-hidden rounded-xl border border-neutral-border h-[380px] md:h-[440px] ${project.link === '/case-studies/labsift' ? 'bg-white' : containedPreviewLinks.has(project.link) ? 'bg-[#00191f]' : 'bg-neutral-card'}`}>
                            <img
                              src={projectImagesByLink[project.link]}
                              alt={`${project.title} website preview`}
                              className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${containedPreviewLinks.has(project.link) ? 'object-contain object-center' : 'object-cover object-top'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow buttons */}
              <div className="mt-6 flex items-center gap-3">
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
