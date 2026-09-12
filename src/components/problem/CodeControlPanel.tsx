import { Button } from "@/components/ui/button";
import {
  FileText,
  FlaskConical,
  Play,
  RotateCcw,
  Send,
  Settings,
} from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CodeTemplateDropdown from "./CodeTemplateDropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ToolbarAction = () => void | Promise<unknown>;

interface CodeControlPanelProps {
  isPending: boolean;
  onReset: ToolbarAction;
  onExecute: ToolbarAction;
  onTest: ToolbarAction;
  onSubmit: ToolbarAction;
  onOpenCompilerInfo: ToolbarAction;
  onOpenSettings: ToolbarAction;
}

export default function CodeControlPanel({
  isPending,
  onReset,
  onExecute,
  onTest,
  onSubmit,
  onOpenCompilerInfo,
  onOpenSettings,
}: CodeControlPanelProps) {
  return (
    <div className="h-11 w-full shrink-0 overflow-x-auto border-b border-border bg-background">
      <div className="flex h-full w-full min-w-max items-center gap-2 px-3">
        <div className="flex items-center gap-2">
          <LanguageDropdown />
          <CodeTemplateDropdown />
        </div>
        <div aria-hidden="true" className="min-w-3 flex-1" />
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={isPending}
                onClick={onReset}
                className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed"
              >
                <RotateCcw aria-hidden="true" />
                초기화
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              작성 중인 코드를 초기화합니다
            </TooltipContent>
          </Tooltip>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={onExecute}
                  className="h-8 cursor-pointer px-3 text-xs disabled:cursor-not-allowed"
                >
                  <Play aria-hidden="true" />
                  실행
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                현재 코드를 실행합니다
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={onTest}
                  className="h-8 cursor-pointer px-3 text-xs disabled:cursor-not-allowed"
                >
                  <FlaskConical aria-hidden="true" />
                  테스트
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                테스트 케이스로 코드를 실행합니다
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  disabled={isPending}
                  onClick={onSubmit}
                  className="h-8 cursor-pointer px-3 text-xs disabled:cursor-not-allowed"
                >
                  <Send aria-hidden="true" />
                  제출
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                현재 코드를 제출합니다
              </TooltipContent>
            </Tooltip>
          </div>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                  aria-label="컴파일러 정보"
                  onClick={onOpenCompilerInfo}
                >
                  <FileText aria-hidden="true" className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">컴파일러 정보</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                  aria-label="화면 설정"
                  onClick={onOpenSettings}
                >
                  <Settings aria-hidden="true" className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">화면 설정</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
