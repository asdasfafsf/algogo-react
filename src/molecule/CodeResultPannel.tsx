import { useRef, useState } from 'react';
import { ClipboardDocumentListIcon, TrashIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  Button, Card, Chip, Typography,
} from '@material-tailwind/react';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TooltipIconButton from '../atom/TooptipIconButton';
import TabBody from '../atom/TabBody';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);

  const TABLE_ROWS = [
    {
      name: 'John Michael',
      job: 'Manager',
      date: '23/04/18',
    },
    {
      name: 'Alexa Liras',
      job: 'Developer',
      date: '23/04/18',
    },
    {
      name: 'Laurent Perrier',
      job: 'Executive',
      date: '19/09/17',
    },
    {
      name: 'Michael Levi',
      job: 'Developer',
      date: '24/12/08',
    },
    {
      name: 'Richard Gran',
      job: 'Manager',
      date: '04/10/21',
    },
  ];

  return (
    <div
      style={{
        height: `calc(100vh - ${codeEditorHeight + 48 + 48 + 10}px)`,
      }}
      className="h-full overflow-y-hidden"
    >
      <TabHeader className="h-10 min-w-[360px] overflow-hidden">
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={() => { setSelectedIndex(0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={() => { setSelectedIndex(1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={() => { setSelectedIndex(2); }} />
      </TabHeader>
      <TabBody
        style={{
          height: `calc(100vh - ${codeEditorHeight + 48 + 48 + 40 + 10}px)`,
        }}
      >
        <TabPanel isSelected={selectedIndex === 0}>
          <div className="h-full relative">
            <nav className="flex w-full justify-end gap-1 overflow-x-hidden">
              <div className="absolute flex right-6 z-10 overflow-x-hidden bg-gray-900">
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
              className="h-full focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
            />
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <div className="h-full relative">
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
              className="h-full focus:outline-none resize-none rounded-md p-2 z-0 w-full relative text-white border-gray-900 border-none bg-gray-900"
            />
          </div>
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <div className="w-full h-full bg-gray-900">
            <div className="w-full py-2">
              <div className="flex items-center justify-end gap-1">
                <Button color="blue">테스트 케이스 추가</Button>
                <Button color="blue">실행</Button>
              </div>
            </div>
            <Card className="h-full w-full overflow-scroll bg-gray-900">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {['입력', '출력', '예상 결과', '일치 여부'].map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-black p-4"
                      >
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((elem, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = `bg-gray-900 p-4 ${isLast ? '' : 'border-b'}`;

                    return (
                      <tr key={typeof elem === 'string' ? elem : JSON.stringify(elem)}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            1 2 3 4
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            1 2 3 4
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            1 2 3 4
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="green"
                            className="font-normal"
                          >
                            일치
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </TabPanel>
      </TabBody>
    </div>
  );
}
