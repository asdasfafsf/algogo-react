import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import Line from '../atom/Line';
import useModal from '../plugins/modal/useModal';

export default function CompilerInfoModal() {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    modal.top()?.resolve(false);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  return (
    <TranslucentOverlay className={`py-16 items-start ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div
        className={`min-h-64 h-auto rounded-md bg-white w-[600px] p-8 transition-transform transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
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
            <Typography variant="h6">Java</Typography>
            <Typography variant="small">
              컴파일: g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ
            </Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: aws coretto JDK 17</Typography>
          </CardBody>
        </Card>

        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">Node.js</Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: nodejs 22</Typography>
          </CardBody>
        </Card>

        <Card className="my-2">
          <CardBody>
            <Typography variant="h6">Python</Typography>
            <Typography variant="small">실행: ./Main </Typography>
            <Typography variant="small">버전: Python 3.6</Typography>
          </CardBody>
        </Card>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleClose}
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
