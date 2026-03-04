import { FC } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

import { useScrollReveal } from '@/hooks/useScrollReveal';

const ScrollReveal: FC<ScrollRevealProps> = ({ children, className = '', delay = 0 }) => {
  const { ref, revealed } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${revealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
