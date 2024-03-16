import { useRef, useState } from 'react';
import { ClipboardDocumentListIcon, TrashIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TooltipIconButton from '../atom/TooptipIconButton';
import TabBody from '../atom/TabBody';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      style={{
        gridTemplateRows: '40px auto',
      }}
      className="grid"
    >
      <TabHeader className="min-w-[360px] overflow-hidden">
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={() => { setSelectedIndex(0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={() => { setSelectedIndex(1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={() => { setSelectedIndex(2); }} />
      </TabHeader>
      <TabBody className="w-full">
        <TabPanel isSelected={selectedIndex === 0}>
          <div className="-top-6 relative h-[calc(100%-20px)]">
            <nav className="flex w-full justify-end gap-1 overflow-x-hidden">
              <div className="flex right-5 relative z-10 overflow-x-hidden bg-gray-900">
                <TooltipIconButton
                  className="h-8 w-8"
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
                  className="h-8 w-8"
                  content="붙여넣기"
                >
                  <ClipboardDocumentListIcon className="text-white w-6 h-6" />
                </TooltipIconButton>
                <TooltipIconButton
                  onClick={() => {
                    if (inputTextAreaRef.current) {
                      inputTextAreaRef.current.value = '';
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
              ref={inputTextAreaRef}
              placeholder="테스트 입력"
              className="-top-5 focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white min-h-full border-gray-900 border-none bg-gray-900"
            />
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <div className="-top-6 relative h-[calc(100%-20px)]">
            <nav className="flex w-full justify-end gap-1 overflow-x-hidden">
              <div className="flex right-5 relative z-10 overflow-x-hidden bg-gray-900">
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
              className="-top-5 focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white min-h-full border-gray-900 border-none bg-gray-900"
            />
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <div className="max-w-md mx-auto mt-5 relative">
            안녕
          </div>
        </TabPanel>
      </TabBody>
    </div>
  );
}
