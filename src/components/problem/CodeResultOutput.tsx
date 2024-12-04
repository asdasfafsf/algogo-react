/* eslint-disable no-param-reassign */
import {
  ClipboardIcon, TrashIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { Typography } from '@components/common/index';
import { TooltipIconButton } from '@components/Button/index';

interface CodeResultOutputProps {
  outputTextAreaRef:React.RefObject<HTMLTextAreaElement>
  output: ResponseExecuteResult;
  handleClickReset: (e:React.MouseEvent<HTMLElement>) => void | Promise<void>;
  handleClickCopy: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

export default function CodeResultOutput(
  {
    outputTextAreaRef, output, handleClickReset, handleClickCopy,
  }: CodeResultOutputProps,
) {
  return (
    <div className="relative h-full">
      <nav className="flex justify-between w-full gap-1 overflow-x-hidden">
        <div className="absolute z-10 flex ml-2 top-1">
          <Typography variant="h6" className="text-green-500">
            실행 시간 : &nbsp;
            {output.processTime}
            ms
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Typography variant="h6" className="text-green-500">
            메모리 사용량 : &nbsp;
            {output.memory}
            MB
          </Typography>
        </div>
        <div className="absolute z-10 flex overflow-x-hidden bg-gray-900 right-6">
          <TooltipIconButton
            onClick={handleClickCopy}
            className="w-8 h-8"
            content="복사"
          >
            <ClipboardIcon className="w-6 h-6 text-white" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={handleClickReset}
            className="w-8 h-8"
            content="지우기"
          >
            <TrashIcon className="w-6 h-6 text-red-500" />
          </TooltipIconButton>
        </div>
      </nav>
      <textarea
        readOnly
        ref={outputTextAreaRef}
        value={output.result}
        placeholder="실행 결과가 출력됩니다"
        className="h-[calc(100%-24px)] top-6 focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
