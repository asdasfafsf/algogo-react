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
    bold: 'font-bold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    light: 'font-light leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    semibold: 'font-semibold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    regular: 'font-medium leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    semilight: 'font-normal leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    extralight: 'font-extralight leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
    ultralight: 'leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl',
  },
  h2: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl',
  },
  h3: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-xl max-w-lg',
  },
  h4: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-lg max-w-md',
  },
  h5: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-base max-w-sm',
  },
  h6: {
    bold: 'font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    light: 'font-light leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    semibold: 'font-semibold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    regular: 'font-medium leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    semilight: 'font-normal leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    extralight: 'font-extralight leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
    ultralight: 'leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-sm max-w-xs',
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
//   const Tag = variant as keyof JSX.IntrinsicElements;
  const classes = headingClasses[variant][weight] || headingClasses.h1.bold;

  return (
    <div className={`${className} ${classes} animate-fadeIn`}>
      {children}
    </div>
  );
}
