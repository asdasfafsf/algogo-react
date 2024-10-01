/* eslint-disable no-param-reassign */
import {
  ClipboardIcon, TrashIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import TooltipIconButton from '../atom/TooltipIconButton';

interface CodeResultOutputProps {
  outputTextAreaRef:React.RefObject<HTMLTextAreaElement>
  output: string;
  handleChangeOutput: (e: React.ChangeEvent<HTMLElement>, output: string) => void | Promise<void>;
  handleClickReset: (e:React.MouseEvent<HTMLElement>) => void | Promise<void>;
  handleClickCopy: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

export default function CodeResultOutput(
  {
    outputTextAreaRef, output, handleChangeOutput, handleClickReset, handleClickCopy,
  }: CodeResultOutputProps,
) {
  return (
    <div className="relative h-full">
      <nav className="flex justify-end w-full gap-1 overflow-x-hidden">
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
        value={output}
        onChange={(e) => handleChangeOutput(e, e.target.value)}
        placeholder="실행 결과가 출력됩니다"
        className="h-[calc(100%-24px)] focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
