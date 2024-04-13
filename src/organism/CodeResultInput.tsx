/* eslint-disable no-param-reassign */
import { ClipboardDocumentListIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/outline';
import TooltipIconButton from '../atom/TooptipIconButton';

interface CodeResultInputProps {
  inputTextAreaRef: React.RefObject<HTMLTextAreaElement>
}

export default function CodeResultInput({ inputTextAreaRef } : CodeResultInputProps) {
  return (
    <div className="relative h-full">
      <nav className="flex justify-end w-full gap-1 overflow-x-hidden">
        <div className="absolute z-10 flex overflow-x-hidden bg-gray-900 right-6">
          <TooltipIconButton
            className="w-8 h-8"
            content="실행"
          >
            <PlayIcon className="w-6 h-6 text-green-500" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={async () => {
              const copiedValue = await navigator.clipboard.readText();
              if (inputTextAreaRef.current) {
                inputTextAreaRef.current.value = copiedValue;
              }
            }}
            className="w-8 h-8"
            content="붙여넣기"
          >
            <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={() => {
              if (inputTextAreaRef.current) {
                inputTextAreaRef.current.value = '';
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
        placeholder="테스트 입력"
        className="h-[calc(100%-24px)] focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
