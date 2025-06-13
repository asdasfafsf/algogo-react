import { Card } from '@components/Card';

export interface TrainingCardProps {
  title: string;
  description: string;
  iconUrl: string;
  color: 'blue' | 'purple' | 'gray';
  status: 'active' | 'coming-soon';
  onClick?: () => void;
}

const colorConfig = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    border: 'hover:border-blue-500/50',
    textHover: 'group-hover:text-blue-400',
    overlay: 'from-blue-500/10',
    accent: 'from-blue-500 to-blue-600',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    border: 'hover:border-purple-500/50',
    textHover: 'group-hover:text-purple-400',
    overlay: 'from-purple-500/10',
    accent: 'from-purple-500 to-purple-600',
  },
  gray: {
    gradient: 'from-gray-600 to-gray-700',
    border: '',
    textHover: 'text-gray-400',
    overlay: 'from-gray-500/5',
    accent: 'from-gray-500 to-gray-600',
  },
};

export function TrainingCard({
  title,
  description,
  iconUrl,
  color,
  status,
  onClick,
}: TrainingCardProps) {
  const config = colorConfig[color];
  const isActive = status === 'active';

  return (
    <Card
      className={`
        relative p-6 text-white transition-all duration-300 
        bg-gradient-to-br from-gray-900 to-black border border-gray-800
        ${isActive ? `cursor-pointer hover:from-gray-800 hover:to-gray-900 hover:scale-105 group ${config.border}` : 'cursor-not-allowed'}
      `}
      onClick={isActive ? onClick : undefined}
    >
      <div className={`flex items-center gap-4 ${!isActive ? 'opacity-60' : ''}`}>
        {/* 왼쪽 아이콘 */}
        <div className={`
          flex items-center justify-center w-16 h-16 flex-shrink-0
          bg-gradient-to-br ${config.gradient} rounded-xl
          ${isActive ? 'transition-all duration-300 group-hover:scale-110' : ''}
        `}
        >
          <img
            src={iconUrl}
            alt={title}
            className={`w-8 h-8 object-contain filter brightness-0 invert ${!isActive ? 'opacity-60' : ''}`}
          />
        </div>

        {/* 오른쪽 텍스트 정보 */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold transition-colors mb-1 ${isActive ? config.textHover : 'text-gray-400'}`}>
            {title}
          </h3>
          <p className={`text-sm ${isActive ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'}`}>
            {description}
          </p>
          <div className={`h-0.5 bg-gradient-to-r ${config.accent} rounded-full mt-3 transition-all duration-300 ${
            isActive ? 'w-8 group-hover:w-16' : 'w-8'
          }`}
          />
        </div>
      </div>

      {/* 호버 오버레이 */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-br ${config.overlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`} />
      )}

      {/* 준비중 배지 */}
      {status === 'coming-soon' && (
        <div className="absolute flex items-center gap-1 px-3 py-1.5 text-xs bg-gradient-to-r from-gray-600 to-gray-700 rounded-full top-4 right-4">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          준비중
        </div>
      )}

      {/* 비활성 오버레이 */}
      {status === 'coming-soon' && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-500/5 to-transparent" />
      )}
    </Card>
  );
}
