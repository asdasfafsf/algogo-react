/* eslint-disable react/no-array-index-key */
import { useRef, useState } from 'react';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TabBody from '../atom/TabBody';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';
import { useExecuteResultListStore } from '../zustand/ExecuteResultListStore';
import {
  CODE_CONTROL_PANEL_HEIGHT,
  EDITOR_REASIZE_AREA_HEIGHT,
  PROBLEM_HEADER_HEIGHT,
} from '../constant/Size';
import CodeEditorResizer from '../molecule/CodeEditorResizer';
import { useScreenSize } from '../context/ScreenSizeContext';
import CodeResultInput from './CodeResultInput';
import CodeResultOutput from './CodeResultOutput';
import CodeTestCaseTable from './CodeTestCaseTable';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const executeResultList = useExecuteResultListStore((state) => state.executeResultList);

  return (
    <div
      className="w-full h-full overflow-y-hidden"
    >
      <CodeEditorResizer />
      <TabHeader className="h-10 min-w-[360px] overflow-hidden">
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={() => { setSelectedIndex(0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={() => { setSelectedIndex(1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={() => { setSelectedIndex(2); }} />
      </TabHeader>
      <TabBody className="h-[calc(100%-40px)]">
        <TabPanel isSelected={selectedIndex === 0}>
          <div>테스트</div>
          {/* <CodeResultInput inputTextAreaRef={inputTextAreaRef} /> */}
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <div>테스트</div>
          {/* <CodeResultOutput outputTextAreaRef={outputTextAreaRef} /> */}
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          {/* <div>테스트</div> */}
          <CodeTestCaseTable executeResultList={executeResultList} />
        </TabPanel>
      </TabBody>
    </div>
  );
}
