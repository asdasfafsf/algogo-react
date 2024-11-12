import React from 'react';

// src/components/Heading.tsx
type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'small' | 'medium';
type Weight = 'bold' | 'light' | 'semibold' | 'regular' | 'semilight' | 'extralight' | 'ultralight';

export interface HeadingProps {
  children: React.ReactNode;
  variant: Variant;
  weight?: Weight;
  className?: string;
}

const headingClasses: Record<Variant, Record<Weight, string>> = {
  h1: {
    bold: 'font-bold leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    light: 'font-light leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    semibold: 'font-semibold leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    regular: 'font-medium leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    semilight: 'font-normal leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    extralight: 'font-extralight leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
    ultralight: 'leading-snug tracking-tight text-slate-800 mx-auto my-6  text-2xl',
  },
  h2: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6  text-2xl',
  },
  h3: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6  text-xl ',
  },
  h4: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6  text-lg ',
  },
  h5: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6  text-base ',
  },
  h6: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6  text-sm ',
  },
  paragraph: {
    bold: 'font-bold leading-relaxed tracking-normal text-slate-800 text-base',
    light: 'font-light leading-relaxed tracking-normal text-slate-800 text-base',
    semibold: 'font-semibold leading-relaxed tracking-normal text-slate-800 text-base',
    regular: 'font-medium leading-relaxed tracking-normal text-slate-800 text-base',
    semilight: 'font-normal leading-relaxed tracking-normal text-slate-800 text-base',
    extralight: 'font-extralight leading-relaxed tracking-normal text-slate-800 text-base',
    ultralight: 'leading-relaxed tracking-normal text-slate-800 text-base',
  },
  medium: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 text-sm',
    light: 'font-light leading-snug tracking-normal text-slate-800 text-sm',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 text-sm',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 text-sm',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 text-sm',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 text-sm',
    ultralight: 'leading-snug tracking-normal text-slate-800 text-sm',
  },
  small: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 text-xs',
    light: 'font-light leading-snug tracking-normal text-slate-800 text-xs',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 text-xs',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 text-xs',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 text-xs',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 text-xs',
    ultralight: 'leading-snug tracking-normal text-slate-800 text-xs',
  },
};

export default function Typography({
  children,
  variant,
  weight = 'bold',
  className = '',
}: HeadingProps) {
  const Tag = (variant === 'paragraph' || variant === 'small' || variant === 'medium') ? 'p' : variant as keyof JSX.IntrinsicElements;
  const classes = headingClasses[variant][weight] || headingClasses.h1.bold;

  return (
    <Tag className={`${className} ${classes}`}>
      {children}
    </Tag>
  );
}
