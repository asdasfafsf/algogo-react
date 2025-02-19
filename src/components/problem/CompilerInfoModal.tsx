import { useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { Typography, TranslucentOverlay, Line } from '@components/common/index';
import { Button } from '@components/Button/index';
import { Card } from '@components/Card';

interface CompilerInfo {
  language: string;
  version: string;
  compile?: string;
  execute: string;
  badge: {
    bg: string;
    text: string;
  };
}

const compilerData: CompilerInfo[] = [
  {
    language: 'C++',
    version: 'GCC 11.1.0',
    compile: 'g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ',
    execute: './Main',
    badge: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
    },
  },
  {
    language: 'Java',
    version: 'aws coretto JDK 17',
    compile: 'javac --release 17 -J-Xms128m -J-Xmx256m -J-Xss512k -encoding UTF-8 Main.java',
    execute: './Main',
    badge: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
    },
  },
  {
    language: 'Node.js',
    version: 'nodejs 22',
    execute: './Main',
    badge: {
      bg: 'bg-green-100',
      text: 'text-green-800',
    },
  },
  {
    language: 'Python',
    version: 'Python 3.6',
    execute: './Main',
    badge: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
    },
  },
];

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
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <TranslucentOverlay
      className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-h-[80vh] w-[700px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200 flex flex-col">
        {/* Header */}
        <div className="pb-0">
          <div className="px-8 pt-8">
            <Typography variant="h4" weight="bold" className="mb-4">
              컴파일러 정보
            </Typography>
          </div>
          <Line className="bg-gray-200 " />
        </div>
        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 p-8 pt-0 overflow-y-auto">
          {compilerData.map((compiler, index) => (
            <Card
              key={index}
              className="p-6 transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <Typography variant="h5" weight="semibold">
                  {compiler.language}
                </Typography>
                <span className={`px-2 py-1 ${compiler.badge.bg} ${compiler.badge.text} text-xs rounded-full`}>
                  {compiler.version}
                </span>
              </div>
              <div className="space-y-3">
                {compiler.compile && (
                  <div className="space-y-2">
                    <Typography variant="paragraph" weight="semibold" className="text-gray-700">
                      컴파일 명령어
                    </Typography>
                    <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                      <Typography
                        variant="medium"
                        weight="semilight"
                        className="font-mono text-sm"
                      >
                        {compiler.compile}
                      </Typography>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Typography variant="paragraph" weight="semibold" className="text-gray-700">
                    실행 명령어
                  </Typography>
                  <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                    <Typography
                      variant="medium"
                      weight="semilight"
                      className="font-mono text-sm"
                    >
                      {compiler.execute}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* Footer */}
        <div className="p-8">
          <div className="flex justify-center">
            <Button onClick={handleClose}>닫기</Button>
          </div>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
