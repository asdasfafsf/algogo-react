import { Card } from '@components/Card/index';
import { Line, Typography } from '@components/common/index';
import { Button } from '@components/Button/index';
import useConnectedInfo from '@hook/me/useConnectedInfo';

export default function ConnectedInfo() {
  const { me, handleDisconnect, handleConnect } = useConnectedInfo();
  return (
    <Card>
      {[{
        provider: 'github' as OAuthProvider,
        imageSrc: 'github-mark.png',
        name: 'Github',
        isConnected: me?.oauthList.find((elem) => elem.provider === 'github'),
      },
      {
        provider: 'google' as OAuthProvider,
        imageSrc: 'google-mark.png',
        name: 'Google',
        isConnected: me?.oauthList.find((elem) => elem.provider === 'google'),
      },
      {
        provider: 'kakao' as OAuthProvider,
        imageSrc: 'kakao-mark.jpg',
        name: '카카오톡',
        isConnected: me?.oauthList.find((elem) => elem.provider === 'kakao'),
      }]
        .map(({
          provider, imageSrc, name, isConnected,
        }) => (
          <>
            <div key={provider} className="flex items-end justify-between p-4 my-4">
              <div className="w-20">
                <img
                  className="w-20 h-20 mb-4"
                  alt={name}
                  src={imageSrc}
                />
                <Typography
                  variant="h6"
                  weight="regular"
                  className="w-20 text-center"
                >
                  {name}
                </Typography>
              </div>
              <div>
                {isConnected
                  ? (
                    <Button
                      onClick={() => handleDisconnect()}
                      color="gray"
                    >
                      연동해제
                    </Button>
                  )
                  : (
                    <Button
                      onClick={(_) => handleConnect(_, provider)}
                      color="blue"
                    >
                      연동
                    </Button>
                  )}

              </div>
            </div>
            <Line key={name} />
          </>
        ))}
    </Card>
  );
}
