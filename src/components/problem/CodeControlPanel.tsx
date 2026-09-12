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
    <div className="@container/editor-toolbar w-full shrink-0">
      <div
        role="toolbar"
        aria-label="코드 실행 도구"
        className="grid h-19 w-full min-w-0 grid-cols-1 grid-rows-2 items-center gap-1 overflow-hidden border-b border-border bg-background px-2 py-1 @[30rem]/editor-toolbar:h-11 @[30rem]/editor-toolbar:grid-cols-[minmax(0,1fr)_auto] @[30rem]/editor-toolbar:grid-rows-1 @[30rem]/editor-toolbar:gap-2 @[30rem]/editor-toolbar:px-3 @[30rem]/editor-toolbar:py-0"
      >
        <div className="flex min-w-0 items-center gap-2">
          <LanguageDropdown />
          <CodeTemplateDropdown />
        </div>
        <TooltipProvider delayDuration={150}>
          <div className="flex min-w-0 items-center justify-center @[30rem]/editor-toolbar:justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isPending}
                  onClick={onReset}
                  aria-label="코드 초기화"
                  className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed"
                >
                  <RotateCcw aria-hidden="true" />
                  <span className="sr-only @[48rem]/editor-toolbar:not-sr-only">
                    초기화
                  </span>
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
                    aria-label="코드 실행"
                    className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed @[48rem]/editor-toolbar:px-3"
                  >
                    <Play aria-hidden="true" />
                    <span className="sr-only @[48rem]/editor-toolbar:not-sr-only">
                      실행
                    </span>
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
                    aria-label="테스트 실행"
                    className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed @[48rem]/editor-toolbar:px-3"
                  >
                    <FlaskConical aria-hidden="true" />
                    <span className="sr-only @[48rem]/editor-toolbar:not-sr-only">
                      테스트
                    </span>
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
                    aria-label="코드 제출"
                    className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed @[48rem]/editor-toolbar:px-3"
                  >
                    <Send aria-hidden="true" />
                    <span className="sr-only @[48rem]/editor-toolbar:not-sr-only">
                      제출
                    </span>
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
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
