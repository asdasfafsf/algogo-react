import { Typography } from '@components/common';
import { memo } from 'react';

type ColorVariant = 'blue' | 'emerald' | 'purple' | 'orange' | 'gray';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color?: ColorVariant;
}

const colorMap = {
  blue: {
    bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    subtitleColor: 'text-blue-600',
  },
  emerald: {
    bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    subtitleColor: 'text-emerald-600',
  },
  purple: {
    bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    subtitleColor: 'text-purple-600',
  },
  orange: {
    bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    subtitleColor: 'text-orange-600',
  },
  gray: {
    bgColor: 'bg-gradient-to-br from-gray-500 to-gray-600',
    subtitleColor: 'text-gray-600',
  },
};

const StatCard = memo(({
  icon,
  title,
  value,
  subtitle,
  color = 'gray',
}: StatCardProps) => {
  const { bgColor, subtitleColor } = colorMap[color];

  return (
    <div className="p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center justify-center transition-all duration-300 shadow-sm w-14 h-14 ${bgColor} rounded-2xl group-hover:shadow-md`}>
          {icon}
        </div>
        <div className="text-right">
          <Typography variant="small" weight="regular" className="mb-1 text-gray-500">
            {title}
          </Typography>
          <Typography variant="h2" weight="bold" className="text-gray-900">
            {value}
          </Typography>
          <Typography variant="small" weight="regular" className={subtitleColor}>
            {subtitle}
          </Typography>
        </div>
      </div>
    </div>
  );
});

export default StatCard;
