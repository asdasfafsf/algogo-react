/* eslint-disable react/no-array-index-key */
import { useRef, useState } from 'react';
import { ClipboardDocumentListIcon, TrashIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  Button, Card, Typography,
} from '@material-tailwind/react';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TooltipIconButton from '../atom/TooptipIconButton';
import TabBody from '../atom/TabBody';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';
import useModal from '../plugins/modal/useModal';
import TestCaseModal from './TestCaseModal';
import { useExecuteResultListStore } from '../zustand/ExecuteResultListStore';
import {
  CODE_CONTROL_PANEL_HEIGHT,
  EDITOR_REASIZE_AREA_HEIGHT,
  PROBLEM_HEADER_HEIGHT,
  PROBLEM_TOP_HEADER_HEIGHT,
} from '../constant/Size';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const modal = useModal();
  const executeResultList = useExecuteResultListStore((state) => state.executeResultList);

  return (
    <div
      style={{
        height: `calc(100vh - ${codeEditorHeight
          + PROBLEM_HEADER_HEIGHT
          + CODE_CONTROL_PANEL_HEIGHT
          + EDITOR_REASIZE_AREA_HEIGHT}px)`,
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
          height: `calc(100vh - ${codeEditorHeight
            + PROBLEM_HEADER_HEIGHT
            + CODE_CONTROL_PANEL_HEIGHT
            + PROBLEM_TOP_HEADER_HEIGHT
            + EDITOR_REASIZE_AREA_HEIGHT}px)`,
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
            <div className="w-full py-2 overflow-x-hidden">
              <div className="flex items-center justify-end gap-1 overflow-x-hidden min-w-[215px]">
                <Button onClick={() => modal.push('testCase', TestCaseModal, {})} color="blue">테스트 케이스 추가</Button>
                <Button color="blue">실행</Button>
              </div>
            </div>
            <Card className="h-full w-full overflow-scroll bg-gray-900">
              <table className="w-full min-w-max table-fixed text-center">
                <thead>
                  <tr>
                    {['입력', '출력', '예상 결과', '일치 여부'].map((head, index, arr) => (
                      <th
                        key={head}
                        className={`${index + 1 !== arr.length ? 'w-[28%]' : 'w-[16%]'} border-b border-blue-gray-100 bg-black p-4`}
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
                  {executeResultList.map(({
                    input, output, expected, state,
                  }, index, arr) => {
                    const isLast = index === arr.length - 1;
                    const classes = ` bg-gray-900 p-4${isLast ? '' : 'border-b'}`;

                    return (
                      <tr className="h-12" key={index}>
                        <td className={`${classes} w-28%`}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal break-words text-left"
                          >
                            {input}
                          </Typography>
                        </td>
                        <td className={`${classes} w-28%`}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal break-words text-left"
                          >
                            {output}
                          </Typography>
                        </td>
                        <td className={`${classes} w-28%`}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal break-words text-left"
                          >
                            {expected}
                          </Typography>
                        </td>
                        <td className={`${classes} w-16%`}>
                          <Typography
                            variant="small"
                            color="green"
                            className="font-normal break-words"
                          >
                            {state}
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
