import { memo } from 'react';
import StatCard from './StatCard';

const StatsCards = memo(() => {
  const stats = [
    {
      icon: (
        <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '해결한 문제',
      value: 0,
      color: 'blue' as const,
      subtitle: '',
    },
    {
      icon: (
        <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '연속 활동',
      value: '0일',
      subtitle: '',
      color: 'emerald' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          color={stat.color}
        />
      ))}
    </div>
  );
});

export default StatsCards;
