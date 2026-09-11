import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@/components/ui/button";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@/components/ui/modal-surface";

interface CompilerInfo {
  language: string;
  version: string;
  compile?: string;
  execute: string;
}

const compilerData: CompilerInfo[] = [
  {
    language: "C++",
    version: "GCC 11.1.0",
    compile:
      "g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ",
    execute: "./Main",
  },
  {
    language: "Java",
    version: "aws coretto JDK 17",
    compile:
      "javac --release 17 -J-Xms128m -J-Xmx256m -J-Xss512k -encoding UTF-8 Main.java",
    execute: "./Main",
  },
  {
    language: "Node.js",
    version: "nodejs 22",
    execute: "./Main",
  },
  {
    language: "Python",
    version: "Python 3.6",
    execute: "./Main",
  },
];

export default function CompilerInfoModal({
  resolve,
}: ModalComponentProps<boolean>) {
  const handleClose = () => resolve(false);

  return (
    <ModalSurface
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      size="lg"
      title="컴파일러 정보"
      description="언어별 컴파일 및 실행 환경입니다."
    >
      <ModalBody>
        <ul className="divide-y divide-border">
          {compilerData.map((compiler) => (
            <li key={compiler.language} className="py-5 first:pt-0 last:pb-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold">{compiler.language}</h3>
                <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                  {compiler.version}
                </span>
              </div>
              <div className="space-y-3">
                {compiler.compile && (
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-medium text-foreground">
                      컴파일 명령어
                    </h4>
                    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-xs sm:text-sm">
                      <code>{compiler.compile}</code>
                    </pre>
                  </div>
                )}
                <div className="space-y-1.5">
                  <h4 className="text-sm font-medium text-foreground">
                    실행 명령어
                  </h4>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-xs sm:text-sm">
                    <code>{compiler.execute}</code>
                  </pre>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>확인</Button>
      </ModalFooter>
    </ModalSurface>
  );
}
