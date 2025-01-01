import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'small' | 'medium';
type Weight = 'bold' | 'light' | 'semibold' | 'regular' | 'semilight' | 'extralight' | 'ultralight';
type Color = 'black' | 'white' | 'gray' | 'red' | 'blue' | 'green';

export interface HeadingProps {
  children: React.ReactNode;
  variant: Variant;
  weight?: Weight;
  color?: Color;
  className?: string;
  scale?: number;
}

const headingClasses: Record<Variant, Record<Weight, string>> = {
  h1: {
    bold: 'font-bold leading-tight text-5xl',
    light: 'font-light leading-tight text-5xl',
    semibold: 'font-semibold leading-tight text-5xl',
    regular: 'font-medium leading-tight text-5xl',
    semilight: 'font-normal leading-tight text-5xl',
    extralight: 'font-extralight leading-tight text-5xl',
    ultralight: 'font-thin leading-tight text-5xl',
  },
  h2: {
    bold: 'font-bold leading-tight text-4xl',
    light: 'font-light leading-tight text-4xl',
    semibold: 'font-semibold leading-tight text-4xl',
    regular: 'font-medium leading-tight text-4xl',
    semilight: 'font-normal leading-tight text-4xl',
    extralight: 'font-extralight leading-tight text-4xl',
    ultralight: 'font-thin leading-tight text-4xl',
  },
  h3: {
    bold: 'font-bold leading-snug text-3xl',
    light: 'font-light leading-snug text-3xl',
    semibold: 'font-semibold leading-snug text-3xl',
    regular: 'font-medium leading-snug text-3xl',
    semilight: 'font-normal leading-snug text-3xl',
    extralight: 'font-extralight leading-snug text-3xl',
    ultralight: 'font-thin leading-snug text-3xl',
  },
  h4: {
    bold: 'font-bold leading-snug text-2xl',
    light: 'font-light leading-snug text-2xl',
    semibold: 'font-semibold leading-snug text-2xl',
    regular: 'font-medium leading-snug text-2xl',
    semilight: 'font-normal leading-snug text-2xl',
    extralight: 'font-extralight leading-snug text-2xl',
    ultralight: 'font-thin leading-snug text-2xl',
  },
  h5: {
    bold: 'font-bold leading-snug text-xl',
    light: 'font-light leading-snug text-xl',
    semibold: 'font-semibold leading-snug text-xl',
    regular: 'font-medium leading-snug text-xl',
    semilight: 'font-normal leading-snug text-xl',
    extralight: 'font-extralight leading-snug text-xl',
    ultralight: 'font-thin leading-snug text-xl',
  },
  h6: {
    bold: 'font-bold leading-snug text-lg',
    light: 'font-light leading-snug text-lg',
    semibold: 'font-semibold leading-snug text-lg',
    regular: 'font-medium leading-snug text-lg',
    semilight: 'font-normal leading-snug text-lg',
    extralight: 'font-extralight leading-snug text-lg',
    ultralight: 'font-thin leading-snug text-lg',
  },
  paragraph: {
    bold: 'font-bold leading-relaxed text-base',
    light: 'font-light leading-relaxed text-base',
    semibold: 'font-semibold leading-relaxed text-base',
    regular: 'font-medium leading-relaxed text-base',
    semilight: 'font-normal leading-relaxed text-base',
    extralight: 'font-extralight leading-relaxed text-base',
    ultralight: 'font-thin leading-relaxed text-base',
  },
  medium: {
    bold: 'font-bold leading-snug text-sm',
    light: 'font-light leading-snug text-sm',
    semibold: 'font-semibold leading-snug text-sm',
    regular: 'font-medium leading-snug text-sm',
    semilight: 'font-normal leading-snug text-sm',
    extralight: 'font-extralight leading-snug text-sm',
    ultralight: 'font-thin leading-snug text-sm',
  },
  small: {
    bold: 'font-bold leading-snug text-xs',
    light: 'font-light leading-snug text-xs',
    semibold: 'font-semibold leading-snug text-xs',
    regular: 'font-medium leading-snug text-xs',
    semilight: 'font-normal leading-snug text-xs',
    extralight: 'font-extralight leading-snug text-xs',
    ultralight: 'font-thin leading-snug text-xs',
  },
};

const colorClasses: Record<Color, string> = {
  black: 'text-black',
  white: 'text-white',
  gray: 'text-gray-500',
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
};

export default function Typography({
  children,
  variant,
  weight = 'bold',
  color = 'black',
  className = '',
  scale = 1, // 기본값 추가
}: HeadingProps) {
  const Tag = (variant === 'paragraph' || variant === 'small' || variant === 'medium')
    ? 'p'
    : variant as keyof JSX.IntrinsicElements;

  const classes = `${headingClasses[variant][weight]} ${colorClasses[color]} ${className}`;
  const style = { transform: `scale(${scale})` };

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
}
