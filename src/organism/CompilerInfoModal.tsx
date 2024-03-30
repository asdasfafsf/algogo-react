/* eslint-disable react/no-array-index-key */
import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import Line from '../atom/Line';
import useModal from '../plugins/modal/useModal';

export default function CompilerInfoModal() {
  const modal = useModal();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          modal.top()?.resolve(false);
          break;
        default:
          break;
      }
    };

    if (!modal.top()) {
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  return (
    <TranslucentOverlay className="py-16 items-start">
      <div
        className="min-h-64 h-auto rounded-md bg-white w-[600px] p-8"
      >
        <div className="flex">
          <Typography variant="h6">
            컴파일러 정보
          </Typography>
          <div className="w-[calc(100%-90px)]" />
        </div>
        <Line className="my-2 bg-white" />

        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">C++</Typography>
            <Typography variant="small">
              컴파일: g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ
            </Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: g++ (GCC) 11.1.0</Typography>
          </CardBody>
        </Card>

        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">C++</Typography>
            <Typography variant="small">
              컴파일: g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ
            </Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: g++ (GCC) 11.1.0</Typography>
          </CardBody>
        </Card>

        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">C++</Typography>
            <Typography variant="small">
              컴파일: g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ
            </Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: g++ (GCC) 11.1.0</Typography>
          </CardBody>
        </Card>
        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">C++</Typography>
            <Typography variant="small">
              컴파일: g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ
            </Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: g++ (GCC) 11.1.0</Typography>
          </CardBody>
        </Card>

        <div className="flex justify-center mt-4">
          <Button
            onClick={() => {
              modal.top()?.resolve(false);
            }}
            color="blue-gray"
            className="bg-gray-600"
          >
            닫기
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
