import React from 'react';

// src/components/Heading.tsx
type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'small' | 'medium';
type Weight = 'bold' | 'light' | 'semibold';

export interface HeadingProps {
  children: React.ReactNode;
  variant: Variant;
  weight?: Weight;
  className?: string;
}

const headingClasses: Record<Variant, Record<Weight, string>> = {
  h1: {
    bold: 'font-bold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    light: 'font-light leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    semibold: 'font-semibold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
  },
  h2: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
  },
  h3: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
  },
  h4: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
  },
  h5: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
  },
  h6: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
  },
  paragraph: {
    bold: 'font-bold leading-relaxed tracking-normal text-slate-800 text-base',
    light: 'font-light leading-relaxed tracking-normal text-slate-800 text-base',
    semibold: 'font-semibold leading-relaxed tracking-normal text-slate-800 text-base',
  },
  medium: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 text-sm',
    light: 'font-light leading-snug tracking-normal text-slate-800 text-sm',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 text-sm',
  },

  small: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 text-xs',
    light: 'font-light leading-snug tracking-normal text-slate-800 text-xs',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 text-xs',
  },

};

export default function Typography({
  children,
  variant,
  weight = 'bold',
  className = '',
}: HeadingProps) {
  const Tag = variant as keyof JSX.IntrinsicElements;
  const classes = headingClasses[variant][weight] || headingClasses.h1.bold;

  return (
    <Tag className={`${className} ${classes}`}>
      {children}
    </Tag>
  );
}
