import { Typography, Tooltip } from '@components/common';
import { Button } from '@components/Button';
import { LinkIcon } from '@heroicons/react/24/outline';

interface ExternalSiteCardProps {
  siteKey: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  isConnected: boolean;
  connectedId?: string;
  isComingSoon?: boolean;
  siteUrl: string;
  onDisconnect: (siteKey: string) => void;
}

export default function ExternalSiteCard({
  siteKey,
  name,
  description,
  color,
  icon,
  isConnected,
  connectedId,
  isComingSoon = false,
  siteUrl,
  onDisconnect,
}: ExternalSiteCardProps) {
  return (
    <div className={`p-6 transition-all duration-300 bg-white border border-gray-200 rounded-2xl relative ${
      isComingSoon ? 'opacity-75 cursor-not-allowed' : 'hover:border-gray-300 hover:shadow-md'
    }`}
    >
      {/* 우측 상단 링크 아이콘 */}
      <div className="absolute top-4 right-4">
        <Tooltip content={isComingSoon ? '서비스 준비중' : `${name} 사이트로 이동`} placement="top">
          <button
            type="button"
            onClick={() => {
              if (!isComingSoon) {
                window.open(siteUrl, '_blank');
              }
            }}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              isComingSoon
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            disabled={isComingSoon}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl shadow-sm ${
          isComingSoon ? 'opacity-60' : ''
        }`}
        >
          {icon}
        </div>
        <div className="flex-1 pr-8">
          <div className="flex items-center gap-2">
            <Typography variant="h6" weight="semibold" className="text-gray-900">
              {name}
            </Typography>
            {isComingSoon && (
              <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 border border-orange-200 rounded-full">
                준비중
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${
              isComingSoon ? 'bg-orange-400' : isConnected ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
            />
            <Typography
              variant="small"
              weight="regular"
              className={`${
                isComingSoon ? 'text-orange-600' : isConnected ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              {isComingSoon ? '서비스 준비중' : isConnected ? `연동됨 (${connectedId})` : '연동 안됨'}
            </Typography>
          </div>
        </div>
      </div>

      <Typography variant="small" weight="regular" className="mb-6 leading-relaxed text-gray-600">
        {description}
      </Typography>

      {isComingSoon ? (
        <Button
          variant="outlined"
          color="gray"
          size="small"
          className="w-full cursor-not-allowed opacity-60"
          disabled
        >
          준비중
        </Button>
      ) : isConnected ? (
        <Button
          variant="outlined"
          color="red"
          size="small"
          className="w-full"
          onClick={() => onDisconnect(siteKey)}
        >
          연동 해제
        </Button>
      ) : (
        <Button
          variant="filled"
          color="blue"
          size="small"
          className="w-full shadow-sm"
          onClick={() => {
            // TODO: 확장 프로그램을 통한 연동 처리
          }}
        >
          연동하기
        </Button>
      )}
    </div>
  );
}
