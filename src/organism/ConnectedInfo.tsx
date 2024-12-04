import { Card } from '@components/Card/index';
import { Line, Typography } from '@components/common/index';
import { Button } from '@components/Button/index';

export default function ConnectedInfo() {
  return (
    <Card>
      {[{ imageSrc: 'github-mark.png', name: 'Github', isConnected: false },
        { imageSrc: 'google-mark.png', name: 'Google', isConnected: false },
        { imageSrc: 'kakao-mark.jpg', name: '카카오톡', isConnected: false }]
        .map(({ imageSrc, name }) => (
          <>
            <div className="flex items-end justify-between my-4">
              <div className="w-20">
                <img
                  className="w-20 h-20 mb-4"
                  alt={name}
                  src={imageSrc}
                />
                <Typography
                  variant="h6"
                  className="w-20 text-center"
                >
                  {name}
                </Typography>
              </div>
              <div>
                <Button color="blue">연동하기</Button>
              </div>
            </div>
            <Line />
          </>
        ))}
    </Card>
  );
}
