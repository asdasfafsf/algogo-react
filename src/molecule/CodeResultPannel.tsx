import { useRef, useState } from 'react';
import {
  IconButton, Tooltip,
} from '@material-tailwind/react';
import { ClipboardDocumentListIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TabBody from '../atom/TabBody';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      style={{
        gridTemplateRows: '40px auto',
      }}
      className="grid"
    >
      <TabHeader>
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={() => { setSelectedIndex(0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={() => { setSelectedIndex(1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={() => { setSelectedIndex(2); }} />
      </TabHeader>
      <TabBody className="w-full">
        <TabPanel isSelected={selectedIndex === 0}>
          <div className="-top-8 relative h-full">
            <nav className="relative flex w-full justify-end gap-1">
              <Tooltip content="실행">
                <IconButton className="h-8 w-8">
                  <PlayIcon className="w-6 h-6 text-green-500" />
                </IconButton>
              </Tooltip>
              <Tooltip content="붙여넣기">
                <IconButton
                  onClick={async () => {
                    const pastedValue = await navigator.clipboard.readText();

                    if (textAreaRef.current) {
                      textAreaRef.current.value = pastedValue;
                    }
                  }}
                  className="h-8 w-8"
                >
                  <ClipboardDocumentListIcon className="text-white w-6 h-6" />
                </IconButton>
              </Tooltip>
              <Tooltip content="지우기">
                <IconButton
                  onClick={() => {
                    if (textAreaRef.current) {
                      textAreaRef.current.value = '';
                    }
                  }}
                  className="h-8 w-8"
                >
                  <TrashIcon className="text-red-500 w-6 h-6" />
                </IconButton>
              </Tooltip>

            </nav>
            <textarea
              ref={textAreaRef}
              placeholder="테스트 입력"
              className="focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white min-h-full border-gray-900 border-none bg-gray-900"
            />
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <div>
            2번!!
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <div>
            3번!!
          </div>
        </TabPanel>
      </TabBody>
    </div>
  );
}
