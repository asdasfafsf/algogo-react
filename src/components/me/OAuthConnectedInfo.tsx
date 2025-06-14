import { Typography } from '@components/common';
import useConnectedInfo from '@hook/me/useConnectedInfo';
import OAuthCard from './OAuthCard';

export default function OAuthConnectedInfo() {
  const { me, handleDisconnect, handleConnect } = useConnectedInfo();

  // OAuth 플랫폼 정보
  const oauthPlatforms = [
    {
      provider: 'google' as OAuthProvider,
      name: 'Google',
      icon: 'google-mark.png',
      description: '구글 계정으로 간편하게 로그인하세요',
      isConnected: !!me?.oauthList.find((elem) => elem.provider === 'google'),
    },
    {
      provider: 'kakao' as OAuthProvider,
      name: 'Kakao',
      icon: 'kakao-mark.jpg',
      description: '카카오 계정으로 간편하게 로그인하세요',
      isConnected: !!me?.oauthList.find((elem) => elem.provider === 'kakao'),
    },
  ];

  return (
    <div className="transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
      <div className="p-8">
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2 text-gray-900">
            계정 연동 관리
          </Typography>
          <Typography variant="medium" weight="regular" className="text-gray-600">
            외부 플랫폼과 연동하여 더 많은 기능을 이용하세요
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {oauthPlatforms.map((platform) => (
            <OAuthCard
              key={platform.provider}
              provider={platform.provider}
              name={platform.name}
              icon={platform.icon}
              description={platform.description}
              isConnected={platform.isConnected}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
