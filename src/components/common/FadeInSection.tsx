import { ReactNode } from 'react';
import useIntersectionObserver from '@hook/useIntersectionObserver';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

export function FadeInSection({ children, className = '' }: FadeInSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`
        opacity-0 translate-y-10 transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
