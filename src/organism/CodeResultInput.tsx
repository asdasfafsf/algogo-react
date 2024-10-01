import { ClipboardDocumentListIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TooltipIconButton from '../atom/TooltipIconButton';

interface CodeResultInputProps {
  inputTextAreaRef: React.RefObject<HTMLTextAreaElement>
  input: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLElement>, input: string) => void | Promise<void>
  handleClickRun: (e:React.MouseEvent<HTMLElement>) => void | Promise<void>
  handleClickPaste: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
}

export default function CodeResultInput(
  {
    inputTextAreaRef, input, handleChangeInput, handleClickRun, handleClickPaste,
  } : CodeResultInputProps,
) {
  return (
    <div className="relative h-full">
      <nav className="flex justify-end w-full gap-1 overflow-x-hidden">
        <div className="absolute z-10 flex overflow-x-hidden bg-gray-900 right-6">
          <TooltipIconButton
            onClick={handleClickRun}
            className="w-8 h-8"
            content="실행"
          >
            <PlayIcon className="w-6 h-6 text-green-500" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={handleClickPaste}
            className="w-8 h-8"
            content="붙여넣기"
          >
            <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={() => {
              if (inputTextAreaRef.current) {
                inputTextAreaRef.current.value = '';
                const event = new Event('input', { bubbles: true });
                inputTextAreaRef.current.dispatchEvent(event);
              }
            }}
            className="w-8 h-8"
            content="지우기"
          >
            <TrashIcon className="w-6 h-6 text-red-500" />
          </TooltipIconButton>
        </div>
      </nav>
      <textarea
        ref={inputTextAreaRef}
        value={input}
        onChange={(e) => handleChangeInput(e, e.target.value)}
        placeholder="테스트 입력"
        className="h-[calc(100%-24px)] focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
