import { ClipboardDocumentListIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Tooltip } from '@components/common';

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
        <div className="absolute z-10 flex gap-2 bg-gray-900 right-6">
          <Tooltip
            content="실행"
          >
            <div className="cursor-pointer" onClick={handleClickRun}>
              <PlayIcon
                className="w-6 h-6 text-green-500"
              />
            </div>
          </Tooltip>
          <Tooltip
            content="붙여넣기"
          >
            <div className="cursor-pointer" onClick={handleClickPaste}>
              <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
            </div>
          </Tooltip>
          <Tooltip

            content="지우기"
          >
            <div
              onClick={() => {
                if (inputTextAreaRef.current) {
                  inputTextAreaRef.current.value = '';
                  const event = new Event('input', { bubbles: true });
                  inputTextAreaRef.current.dispatchEvent(event);
                }
              }}
              className="cursor-pointer"
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </div>
          </Tooltip>
        </div>
      </nav>
      <textarea
        ref={inputTextAreaRef}
        value={input}
        onChange={(e) => handleChangeInput(e, e.target.value)}
        placeholder="테스트 입력"
        className="h-[calc(100%-64px)] font-mono focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
