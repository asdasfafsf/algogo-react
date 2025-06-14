import { Typography } from '@components/common';
import { Button } from '@components/Button';

interface OAuthCardProps {
  provider: OAuthProvider;
  name: string;
  icon: string;
  description: string;
  isConnected: boolean;
  onConnect: (e: React.MouseEvent, provider: OAuthProvider) => void;
  onDisconnect: (e: React.MouseEvent, provider: OAuthProvider) => void;
}

export default function OAuthCard({
  provider,
  name,
  icon,
  description,
  isConnected,
  onConnect,
  onDisconnect,
}: OAuthCardProps) {
  return (
    <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
          <img
            src={icon}
            alt={name}
            className="object-contain w-8 h-8"
          />
        </div>
        <div className="flex-1">
          <Typography variant="h6" weight="semibold" className="text-gray-900">
            {name}
          </Typography>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
            />
            <Typography
              variant="small"
              weight="regular"
              className={`${
                isConnected ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              {isConnected ? '연동됨' : '연동 안됨'}
            </Typography>
          </div>
        </div>
      </div>

      <Typography variant="small" weight="regular" className="mb-4 leading-relaxed text-gray-600">
        {description}
      </Typography>

      {isConnected ? (
        <Button
          variant="outlined"
          color="red"
          size="small"
          className="w-full"
          onClick={(e) => onDisconnect(e, provider)}
        >
          연동 해제
        </Button>
      ) : (
        <Button
          variant="filled"
          color="blue"
          size="small"
          className="w-full shadow-sm"
          onClick={(e) => onConnect(e, provider)}
        >
          연동하기
        </Button>
      )}
    </div>
  );
}
