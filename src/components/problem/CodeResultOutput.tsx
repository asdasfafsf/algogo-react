import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  CircleAlert,
  Clipboard,
  Loader2,
  Play,
  Trash2,
} from "lucide-react";
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
  isPending: boolean;
  copyPending?: boolean;
}

export default function CodeResultOutput({
  output,
  handleClickReset,
  handleClickCopy,
  handleClickRun,
  isPending,
  copyPending = false,
}: CodeResultOutputProps) {
  const hasResult = Boolean(output.code);
  const isFailure = hasResult && output.code !== "0000";
  const hasMetrics = output.processTime > 0 || output.memory > 0;

  return (
    <div className="relative h-full">
      <nav
        aria-label="실행 결과 동작"
        className="flex w-full justify-between gap-0 overflow-x-hidden"
      >
        <div
          aria-live="polite"
          className="absolute left-3 top-2 z-10 flex min-w-0 items-center gap-2 text-xs"
        >
          {isPending ? (
            <Badge variant="secondary" role="status" className="gap-1.5">
              <Loader2 className="size-3 animate-spin" aria-hidden="true" />
              실행 중
            </Badge>
          ) : hasResult ? (
            <Badge
              variant={isFailure ? "destructive" : "secondary"}
              className="gap-1.5"
            >
              {isFailure ? (
                <CircleAlert className="size-3" aria-hidden="true" />
              ) : (
                <CheckCircle2
                  className="size-3 text-emerald-600"
                  aria-hidden="true"
                />
              )}
              {isFailure ? "실패" : "완료"}
            </Badge>
          ) : null}
          {!isPending && hasResult && hasMetrics && (
            <span className="truncate text-muted-foreground">
              {output.processTime}ms · {output.memory}MB
            </span>
          )}
        </div>

        <TooltipProvider delayDuration={300}>
          <div className="absolute right-3 z-10 flex gap-1 bg-background">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="다시 실행"
                  aria-busy={isPending}
                  disabled={isPending}
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
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
                  aria-busy={copyPending}
                  disabled={isPending || copyPending}
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
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
                  disabled={isPending}
                  className="size-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
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
        {isPending ? (
          <div
            role="status"
            className="flex h-full min-h-24 flex-col items-center justify-center gap-2 text-center"
          >
            <Loader2
              className="size-5 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">코드를 실행하고 있습니다</p>
            <p className="text-xs text-muted-foreground">
              완료되면 이곳에서 결과를 확인할 수 있습니다.
            </p>
          </div>
        ) : output.result || output.detail ? (
          <>
            <div
              className={`whitespace-pre ${
                output.code === "9000"
                  ? "text-yellow-500" // 시간 초과
                  : output.code === "9001"
                    ? "text-red-500" // 런타임 에러
                    : output.code === "9002"
                      ? "text-red-500" // 컴파일 에러
                      : output.code !== "0000"
                        ? "text-destructive"
                        : "text-foreground"
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
