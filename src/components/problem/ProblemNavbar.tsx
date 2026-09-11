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
import { Problem } from "@/type/Problem.type";

interface ProblemNavbarProps {
  problem?: Problem;
}
export default function ProblemNavbar({ problem }: ProblemNavbarProps) {
  const modal = useModal();
  const handleClickUpdate = useProblemUpdate(problem);

  return (
    <nav aria-label="문제 도구" className="flex shrink-0">
      <TooltipProvider delayDuration={300}>
        <div className="flex h-full w-full items-center justify-end gap-0 px-2 text-white">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-10 items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="문제 새로고침"
                  onClick={handleClickUpdate}
                  className="size-9 text-white hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw aria-hidden className="size-6 text-white" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-slate-500"
            >
              문제 새로고침
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-10 items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="컴파일러 정보"
                  className="size-9 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    modal.push("CompilerInfo", CompilerInfoModal, {});
                  }}
                >
                  <FileText aria-hidden className="size-6 text-white" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-slate-500"
            >
              컴파일러 정보
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-10 items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="화면 설정"
                  className="size-9 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    modal.push(
                      "CODE_EDITOR_SETTINGS",
                      CodeEditorSettingsModal,
                      {},
                    );
                  }}
                >
                  <Settings aria-hidden className="size-6 text-white" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="bg-slate-500">
              설정
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </nav>
  );
}
