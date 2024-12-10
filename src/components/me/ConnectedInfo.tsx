import { Card } from '@components/Card/index';
import { Line, Typography } from '@components/common/index';
import { Button } from '@components/Button/index';
import useConnectedInfo from '@hook/me/useConnectedInfo';

export default function ConnectedInfo() {
  const { me } = useConnectedInfo();
  return (
    <Card>
      {[{ imageSrc: 'github-mark.png', name: 'Github', isConnected: me?.oauthList.find((elem) => elem.provider === 'google') },
        { imageSrc: 'google-mark.png', name: 'Google', isConnected: me?.oauthList.find((elem) => elem.provider === 'github') },
        { imageSrc: 'kakao-mark.jpg', name: '카카오톡', isConnected: me?.oauthList.find((elem) => elem.provider === 'kakao') }]
        .map(({ imageSrc, name, isConnected }) => (
          <>
            <div key={name} className="flex items-end justify-between p-4 my-4">
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
                  ? <Button color="gray">연동해제</Button>
                  : <Button color="blue">연동</Button>}

              </div>
            </div>
            <Line key={name} />
          </>
        ))}
    </Card>
  );
}
