import { Button } from "@/components/ui/button";
import { Clipboard, Play, Trash2 } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeResultOutputProps {
  output: ResponseExecuteResult;
  handleClickReset: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  handleClickCopy: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  handleClickRun: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

export default function CodeResultOutput({
  output,
  handleClickReset,
  handleClickCopy,
  handleClickRun,
}: CodeResultOutputProps) {
  return (
    <div className="relative h-full">
      <nav
        aria-label="실행 결과 동작"
        className="flex w-full justify-between gap-0 overflow-x-hidden"
      >
        <div className="absolute z-10 flex flex-wrap gap-1 ml-3 top-2 text-xs">
          <span className="text-sm font-medium leading-snug text-emerald-600 dark:text-emerald-400">
            실행 시간 : &nbsp;
            {output.processTime}
            ms
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-sm font-medium leading-snug text-emerald-600 dark:text-emerald-400">
            메모리 사용량 : &nbsp;
            {output.memory}
            MB
          </span>
        </div>

        <TooltipProvider delayDuration={300}>
          <div className="absolute right-3 z-10 flex gap-1 bg-background">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="다시 실행"
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={handleClickRun}
                >
                  <Play
                    className="size-5 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>실행</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="출력 복사"
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={handleClickCopy}
                >
                  <Clipboard
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>복사</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="출력 지우기"
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={handleClickReset}
                >
                  <Trash2
                    className="size-5 text-destructive"
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>지우기</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </nav>
      <div
        data-content={output.result}
        className="absolute inset-0 top-10 h-[calc(100%-40px)] overflow-auto bg-background px-3 pb-6 pt-2 font-mono leading-normal text-foreground"
      >
        {output.result ? (
          <>
            <div
              className={`whitespace-pre ${
                output.code === "9000"
                  ? "text-yellow-500" // 시간 초과
                  : output.code === "9001"
                    ? "text-red-500" // 런타임 에러
                    : output.code === "9002"
                      ? "text-red-500" // 컴파일 에러
                      : output.code === "9999"
                        ? "text-red-600" // 예외 오류
                        : "text-foreground" // 정상 출력
              }`}
            >
              {output.result}
            </div>
            {output.detail && (
              <div className="mt-2 whitespace-pre-wrap text-muted-foreground">
                {output.detail}
              </div>
            )}
          </>
        ) : (
          <div className="text-muted-foreground">실행 결과가 출력됩니다</div>
        )}
      </div>
    </div>
  );
}
