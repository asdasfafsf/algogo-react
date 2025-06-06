type Color =
  | 'blue'
  | 'red'
  | 'green'
  | 'amber'
  | 'pink'
  | 'indigo'
  | 'purple'
  | 'teal'
  | 'cyan'
  | 'slate'
  | 'gray'; // 'gray' 추가

type Variant = 'filled' | 'gradient' | 'outlined' | 'ghost';

export interface ChipProps {
  value: string;
  color?: Color;
  variant?: Variant;
  className?: string;
}

const variantColorClasses: Record<Variant, Record<Color, string>> = {
  filled: {
    blue: 'bg-blue-600 text-white border border-transparent',
    red: 'bg-red-600 text-white border border-transparent',
    green: 'bg-green-600 text-white border border-transparent',
    amber: 'bg-amber-600 text-white border border-transparent',
    pink: 'bg-pink-600 text-white border border-transparent',
    indigo: 'bg-indigo-600 text-white border border-transparent',
    purple: 'bg-purple-600 text-white border border-transparent',
    teal: 'bg-teal-600 text-white border border-transparent',
    cyan: 'bg-cyan-600 text-white border border-transparent',
    slate: 'bg-slate-800 text-white border border-transparent',
    gray: 'bg-gray-700 text-black border border-transparent', // 'gray' 한 단계 더 진하게 변경
  },
  gradient: {
    blue: 'bg-gradient-to-tr from-blue-600 to-blue-500 text-white border border-transparent',
    red: 'bg-gradient-to-tr from-red-600 to-red-500 text-white border border-transparent',
    green: 'bg-gradient-to-tr from-green-600 to-green-500 text-white border border-transparent',
    amber: 'bg-gradient-to-tr from-amber-600 to-amber-500 text-white border border-transparent',
    pink: 'bg-gradient-to-tr from-pink-600 to-pink-500 text-white border border-transparent',
    indigo: 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white border border-transparent',
    purple: 'bg-gradient-to-tr from-purple-600 to-purple-500 text-white border border-transparent',
    teal: 'bg-gradient-to-tr from-teal-600 to-teal-500 text-white border border-transparent',
    cyan: 'bg-gradient-to-tr from-cyan-600 to-cyan-500 text-white border border-transparent',
    slate: 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white border border-transparent',
    gray: 'bg-gradient-to-tr from-gray-600 to-gray-500 text-black border border-transparent', // 'gray' 한 단계 더 진하게 변경
  },
  outlined: {
    blue: 'border border-blue-600 bg-transparent text-blue-600',
    red: 'border border-red-600 bg-transparent text-red-600',
    green: 'border border-green-600 bg-transparent text-green-600',
    amber: 'border border-amber-600 bg-transparent text-amber-600',
    pink: 'border border-pink-600 bg-transparent text-pink-600',
    indigo: 'border border-indigo-600 bg-transparent text-indigo-600',
    purple: 'border border-purple-600 bg-transparent text-purple-600',
    teal: 'border border-teal-600 bg-transparent text-teal-600',
    cyan: 'border border-cyan-600 bg-transparent text-cyan-600',
    slate: 'border border-slate-300 bg-transparent text-slate-600',
    gray: 'border border-gray-700 bg-transparent text-black', // 'gray' 한 단계 더 진하게 변경
  },
  ghost: {
    blue: 'bg-blue-100 border border-transparent text-blue-600',
    red: 'bg-red-100 border border-transparent text-red-600',
    green: 'bg-green-100 border border-transparent text-green-600',
    amber: 'bg-amber-100 border border-transparent text-amber-600',
    pink: 'bg-pink-100 border border-transparent text-pink-600',
    indigo: 'bg-indigo-100 border border-transparent text-indigo-600',
    purple: 'bg-purple-100 border border-transparent text-purple-600',
    teal: 'bg-teal-100 border border-transparent text-teal-600',
    cyan: 'bg-cyan-100 border border-transparent text-cyan-600',
    slate: 'bg-slate-100 border border-transparent text-slate-600',
    gray: 'bg-gray-200 border border-transparent text-black', // 'gray' 한 단계 더 진하게 변경
  },
};

export default function Chip({
  value,
  color = 'blue',
  variant = 'filled',
  className = '',
}: ChipProps) {
  const variantClasses = variantColorClasses[variant][color] || variantColorClasses.filled.blue;

  return (
    <div
      className={`animate-fadeIn font-bold text-xs rounded-md py-1 px-2.5 transition-all shadow-sm ${variantClasses} inline-flex items-center justify-center ${className}`}
    >
      <div>{value}</div>
    </div>
  );
}
