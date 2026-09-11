import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@/components/ui/button";
import { Card } from "@components/ui/card";

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
    language: "C++",
    version: "GCC 11.1.0",
    compile:
      "g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ",
    execute: "./Main",
    badge: {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
  },
  {
    language: "Java",
    version: "aws coretto JDK 17",
    compile:
      "javac --release 17 -J-Xms128m -J-Xmx256m -J-Xss512k -encoding UTF-8 Main.java",
    execute: "./Main",
    badge: {
      bg: "bg-orange-100",
      text: "text-orange-800",
    },
  },
  {
    language: "Node.js",
    version: "nodejs 22",
    execute: "./Main",
    badge: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
  },
  {
    language: "Python",
    version: "Python 3.6",
    execute: "./Main",
    badge: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
  },
];

export default function CompilerInfoModal({
  resolve,
}: ModalComponentProps<boolean>) {
  const handleClose = () => resolve(false);

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <div className="flex max-h-[80vh] w-full animate-in flex-col rounded-2xl bg-background text-foreground shadow-2xl fade-in duration-200">
          {/* Header */}
          <div className="pb-0">
            <DialogHeader className="border-b border-border px-8 py-6 text-left">
              <DialogTitle>컴파일러 정보</DialogTitle>
              <DialogDescription>
                언어별 컴파일 및 실행 환경입니다.
              </DialogDescription>
            </DialogHeader>
          </div>
          {/* 스크롤 가능한 콘텐츠 영역 */}
          <div className="flex-1 p-8 pt-0 overflow-y-auto">
            {compilerData.map((compiler, index) => (
              <Card
                key={index}
                className="p-6 shadow-none transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">{compiler.language}</h3>
                  <span
                    className={`px-2 py-1 ${compiler.badge.bg} ${compiler.badge.text} text-xs rounded-full`}
                  >
                    {compiler.version}
                  </span>
                </div>
                <div className="space-y-3">
                  {compiler.compile && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        컴파일 명령어
                      </h4>
                      <div className="rounded-md border border-border bg-muted/40 p-3">
                        <code className="font-mono text-sm">
                          {compiler.compile}
                        </code>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      실행 명령어
                    </h4>
                    <div className="rounded-md border border-border bg-muted/40 p-3">
                      <code className="font-mono text-sm">
                        {compiler.execute}
                      </code>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {/* Footer */}
          <div className="p-8">
            <div className="flex justify-center">
              <Button onClick={handleClose}>확인</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
