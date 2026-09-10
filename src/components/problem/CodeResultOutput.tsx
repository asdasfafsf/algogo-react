import { Button } from "@/components/ui/button";
import {
  ClipboardIcon,
  TrashIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Typography, Tooltip } from "@components/common/index";

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
      <nav className="flex justify-between w-full gap-0 overflow-x-hidden">
        <div className="absolute z-10 flex flex-wrap gap-1 ml-3 top-2 text-xs">
          <Typography
            weight="regular"
            variant="medium"
            className="text-green-500"
          >
            실행 시간 : &nbsp;
            {output.processTime}
            ms
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Typography
            weight="regular"
            variant="medium"
            className="text-green-500"
          >
            메모리 사용량 : &nbsp;
            {output.memory}
            MB
          </Typography>
        </div>

        <div className="absolute z-10 flex gap-1 bg-gray-900 right-3">
          <Tooltip content="실행">
            <Button
              variant="ghost"
              size="icon"
              aria-label="다시 실행"
              className="size-8"
              onClick={handleClickRun}
            >
              <PlayIcon className="w-6 h-6 text-green-500" />
            </Button>
          </Tooltip>
          <Tooltip content="복사">
            <Button
              variant="ghost"
              size="icon"
              aria-label="출력 복사"
              className="size-8"
              onClick={handleClickCopy}
            >
              <ClipboardIcon className="w-6 h-6 text-white" />
            </Button>
          </Tooltip>
          <Tooltip content="지우기">
            <Button
              variant="ghost"
              size="icon"
              aria-label="출력 지우기"
              className="size-8"
              onClick={handleClickReset}
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </Button>
          </Tooltip>
        </div>
      </nav>
      <div
        data-content={output.result}
        className="absolute inset-0 top-10 h-[calc(100%-40px)] overflow-auto px-2 pt-2 pb-6 text-white bg-gray-900 font-mono leading-normal"
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
                        : "text-white" // 정상 출력
              }`}
            >
              {output.result}
            </div>
            {output.detail && (
              <div className="mt-2 whitespace-pre-wrap text-gray-400">
                {output.detail}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">실행 결과가 출력됩니다</div>
        )}
      </div>
    </div>
  );
}
