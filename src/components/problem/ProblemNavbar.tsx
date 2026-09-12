import useProblemUpdate from "@hook/problem/useProblemUpdate";
import { FileText, RefreshCw, Settings } from "lucide-react";
import useModal from "@plugins/modal/useModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeEditorSettingsModal from "./CodeEditorSettingsModal";
import CompilerInfoModal from "./CompilerInfoModal";
import ThemeToggle from "@components/ThemeToggle";
import type { Problem } from "@/type/Problem.type";

interface ProblemNavbarProps {
  problem?: Problem;
}
export default function ProblemNavbar({ problem }: ProblemNavbarProps) {
  const modal = useModal();
  const handleClickUpdate = useProblemUpdate(problem);

  return (
    <nav
      aria-label="문제 작업공간 도구"
      className="flex shrink-0 items-center [&_button]:transition-none"
    >
      <TooltipProvider delayDuration={150}>
        <div className="flex h-full items-center justify-end gap-0.5">
          <div className="[&_button]:size-8 [&_button]:rounded-md">
            <ThemeToggle />
          </div>
          <span
            aria-hidden="true"
            className="mx-1 hidden h-5 w-px shrink-0 bg-border sm:block"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="문제 새로고침"
                disabled={!problem}
                onClick={handleClickUpdate}
                className="size-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <RefreshCw aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              문제 새로고침
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="컴파일러 정보"
                className="size-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  modal.push("CompilerInfo", CompilerInfoModal, {});
                }}
              >
                <FileText aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              컴파일러 정보
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="화면 설정"
                className="size-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  modal.push(
                    "CODE_EDITOR_SETTINGS",
                    CodeEditorSettingsModal,
                    {},
                  );
                }}
              >
                <Settings aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              화면 설정
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </nav>
  );
}
