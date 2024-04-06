/* eslint-disable no-param-reassign */
import {
  ClipboardIcon, TrashIcon,
} from '@heroicons/react/24/outline';
import TooltipIconButton from '../atom/TooptipIconButton';

interface CodeResultOutputProps {
  outputTextAreaRef: React.RefObject<HTMLTextAreaElement>
}

export default function CodeResultOutput({ outputTextAreaRef } : CodeResultOutputProps) {
  return (
    <div
      className="h-full relative"
    >
      <nav className="flex w-full justify-end gap-1 overflow-x-hidden">
        <div className="absolute flex right-6 z-10 overflow-x-hidden bg-gray-900">
          <TooltipIconButton
            onClick={async () => {
              if (outputTextAreaRef.current) {
                await navigator.clipboard.writeText(outputTextAreaRef.current.value);
              }
            }}
            className="h-8 w-8"
            content="복사"
          >

            <ClipboardIcon className="text-white w-6 h-6" />
          </TooltipIconButton>
          <TooltipIconButton
            onClick={() => {
              if (outputTextAreaRef.current) {
                outputTextAreaRef.current.value = '';
              }
            }}
            className="h-8 w-8"
            content="지우기"
          >
            <TrashIcon className="text-red-500 w-6 h-6" />
          </TooltipIconButton>
        </div>
      </nav>
      <textarea
        readOnly
        ref={outputTextAreaRef}
        placeholder="실행 결과가 출력됩니다"
        className="h-[calc(100%-24px)] focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
      />
    </div>
  );
}
