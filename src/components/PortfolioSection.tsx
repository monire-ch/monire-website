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
  const [activeNavItemId, setActiveNavItemId] = useState(portfolioNavItems[0].id);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const activeGroup = portfolioNavGroups.find((group) => group.items.some((item) => item.id === activeNavItemId)) ?? portfolioNavGroups[0];

  useEffect(() => {
    const row = chipRowRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && chip) {
      row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.offsetWidth / 2, behavior: 'smooth' });
    }
  }, [activeNavItemId]);

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
    const navItems = window.matchMedia('(max-width: 767px)').matches ? activeGroup.items : portfolioNavItems;
    const currentNavIndex = navItems.findIndex((item) => item.id === activeNavItemId);
    const nextNavIndex = (currentNavIndex + direction + navItems.length) % navItems.length;
    const nextNavItem = navItems[nextNavIndex];

    scrollToProject(nextNavItem.targetLink, nextNavItem.id);
  }, [activeNavItemId, activeGroup, scrollToProject]);

  const scrollPrev = useCallback(() => scrollToNavItem(-1), [scrollToNavItem]);
  const scrollNext = useCallback(() => scrollToNavItem(1), [scrollToNavItem]);

  const isCommunityMembershipView = activeNavItemId === 'ai-community-membership';

  return (
    <section id="portfolio" className="pt-20 md:pt-28 pb-16 md:pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-6 md:mb-12">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('portfolio.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('portfolio.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] gap-x-6 gap-y-4 items-stretch">
            <div className="min-w-0 md:hidden">
              <div className="flex rounded-full border border-neutral-border p-1">
                {portfolioNavGroups.map((group, index) => (
                  <button
                    key={group.titleKey}
                    type="button"
                    aria-pressed={activeGroup === group}
                    onClick={() => scrollToProject(group.items[0].targetLink, group.items[0].id)}
                    className={`min-h-11 flex-1 rounded-full px-3 text-sm font-medium transition-colors ${activeGroup === group ? 'bg-main-teal text-off-white' : 'text-main-teal hover:bg-main-teal/5'}`}
                  >
                    {t(index === 0 ? 'portfolio.mobileWebsites' : 'portfolio.mobileAutomations')}
                  </button>
                ))}
              </div>
              <div ref={chipRowRef} className="relative mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {activeGroup.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={activeNavItemId === item.id}
                    onClick={() => scrollToProject(item.targetLink, item.id)}
                    className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm transition-colors ${activeNavItemId === item.id ? 'border-main-teal bg-main-teal text-off-white' : 'border-neutral-border text-main-teal hover:border-main-teal/40'}`}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>
            {/* Category sidebar — dark teal card like reference */}
            <div className="hidden rounded-2xl p-5 md:block" style={{ background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)' }}>
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
            <div className="relative min-w-0 md:min-h-[440px]">
              <div className="overflow-hidden rounded-2xl md:absolute md:inset-0" ref={emblaRef}>
                <div className="flex md:h-full">
                  {projects.map((project) => (
                    <div
                      key={project.title}
                      className="min-w-0 shrink-0 grow-0 basis-full md:h-full"
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
                        className="block group md:h-full"
                      >
                        {projectOutcomeCardKeyByLink[project.link] || (project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView) ? (
                          <div className="hero-bg relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-main-teal/15 p-6 transition-transform duration-500 group-hover:scale-[1.01] md:h-full md:min-h-0 md:p-12">
                            <span className="relative font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-text">
                              {project.link === '/case-studies/portco-hr-collective' && isCommunityMembershipView
                                ? t('portfolio.outcomeCards.communityMembership.category')
                                : project.category}
                            </span>
                            <div className="relative max-w-xl">
                              <h3 className="mb-4 break-words font-display text-3xl leading-tight text-off-white [overflow-wrap:anywhere] sm:text-4xl md:mb-5 lg:text-5xl">
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
                          <div className={`relative overflow-hidden rounded-2xl border border-neutral-border h-[380px] md:h-full ${project.link === '/case-studies/labsift' ? 'bg-white' : containedPreviewLinks.has(project.link) ? 'bg-[#00191f]' : 'bg-neutral-card'}`}>
                            <img
                              src={projectImagesByLink[project.link]}
                              alt={`${project.title} website preview`}
                              className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${containedPreviewLinks.has(project.link) ? 'object-contain object-center' : 'object-cover object-top'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

              {/* Arrow buttons */}
              <div className="flex items-center justify-end gap-3 md:col-start-2">
                <span className="mr-auto text-sm tabular-nums text-main-teal/70 md:hidden" aria-live="polite" aria-atomic="true">
                  {activeGroup.items.findIndex((item) => item.id === activeNavItemId) + 1} / {activeGroup.items.length}
                </span>
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
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
