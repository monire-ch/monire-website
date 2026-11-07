import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ScrollReveal from './ScrollReveal';
import StarIcon from './StarIcon';
import { useLocalePath } from '@/hooks/useLocalePath';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  link: string;
};

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const testimonials = t('homeTestimonials.items', { returnObjects: true }) as Testimonial[];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const stopAutoRotation = useCallback(() => setHasInteracted(true), []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('pointerDown', stopAutoRotation);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', stopAutoRotation);
    };
  }, [emblaApi, onSelect, stopAutoRotation]);

  useEffect(() => {
    if (!emblaApi || isPaused || hasInteracted || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => emblaApi.scrollNext(), 9000);
    return () => window.clearInterval(interval);
  }, [emblaApi, hasInteracted, isPaused]);

  const navigate = (index: number) => {
    setHasInteracted(true);
    emblaApi?.scrollTo(index);
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      className="dark-teal-surface relative overflow-hidden px-6 py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="wave-mask absolute -top-px left-0 right-0 rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
      <ScrollReveal>
        <div className="relative z-10 mx-auto grid max-w-6xl gap-5 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] md:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-3 text-gold" aria-hidden="true">
              <StarIcon size={14} />
              <span className="block h-px w-8 bg-gold/70" />
            </div>
            <h2 id="testimonials-title" className="max-w-xs font-display text-4xl leading-tight text-off-white md:text-5xl">
              {t('homeTestimonials.title')}
            </h2>
          </div>

          <div className="min-w-0 md:border-l md:border-off-white/15 md:pl-14">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <figure key={testimonial.author} className="min-w-0 shrink-0 grow-0 basis-full text-left">
                    <blockquote className="font-tertiary text-2xl italic leading-relaxed text-off-white md:text-3xl">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-6 font-body text-sm text-off-white">
                      <span className="font-semibold text-gold-text">{testimonial.author}</span>
                      <span className="text-off-white/65">, {testimonial.role}</span>
                    </figcaption>
                    <Link
                      to={localePath(testimonial.link)}
                      className="mt-3 inline-block font-body text-xs text-gold-text underline underline-offset-4 hover:text-gold-hover hover:no-underline"
                    >
                      {t('homeTestimonials.readCaseStudy')}
                    </Link>
                  </figure>
                ))}
              </div>
            </div>

          <div className="mt-7 flex items-center justify-start gap-4">
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                emblaApi?.scrollPrev();
              }}
              className="rounded-full p-1.5 text-off-white/60 transition-colors hover:bg-off-white/5 hover:text-gold-text"
              aria-label={t('homeTestimonials.previous')}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2" aria-label={t('homeTestimonials.pagination')}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.author}
                  type="button"
                  onClick={() => navigate(index)}
                  className={`h-1.5 rounded-full transition-all ${selectedIndex === index ? 'w-6 bg-gold' : 'w-1.5 bg-off-white/20 hover:bg-off-white/45'}`}
                  aria-label={t('homeTestimonials.goTo', { number: index + 1 })}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                emblaApi?.scrollNext();
              }}
              className="rounded-full p-1.5 text-off-white/60 transition-colors hover:bg-off-white/5 hover:text-gold-text"
              aria-label={t('homeTestimonials.next')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          </div>
        </div>
      </ScrollReveal>
      <div className="wave-mask absolute -bottom-px left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-12 w-full md:h-20">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default TestimonialsSection;
