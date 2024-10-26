/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TabBody from '../atom/TabBody';
import CodeEditorResizer from '../molecule/CodeEditorResizer';
import CodeResultInput from './CodeResultInput';
import CodeResultOutput from './CodeResultOutput';
import CodeTestCaseTable from './CodeTestCaseTable';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useCodeResultPanel from '../hook/useCodeResultPanel';
import useExecute from '../hook/useExecute';

export default function CodeResultPannel() {
  const {
    input,
    output,
    handleChangeInput,
    handleClickPasteInput,
    selectedIndex,
    handleClickTab,
    inputTextAreaRef,
    outputTextAreaRef,
    handleClickCopyOutput,
    handleClickResetOutput,
    testCaseList,
  } = useCodeResultPanel();

  const { handleExecute } = useExecute();

  const { connect } = useExecuteSocketStore(
    ({ connect }) => ({ connect }),
  );

  const handleWs = async () => {
    await connect('ws://localhost:3001');
  };

  useEffect(() => {
    handleWs();
  }, []);

  return (
    <div
      className="w-full h-full overflow-x-hidden overflow-y-hidden"
    >
      <CodeEditorResizer />
      <TabHeader className="h-10 min-w-[360px] overflow-hidden">
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={(e) => { handleClickTab(e, 0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={(e) => { handleClickTab(e, 1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={(e) => { handleClickTab(e, 2); }} />
      </TabHeader>
      <TabBody className="h-[calc(100%-44px)]">
        <TabPanel isSelected={selectedIndex === 0}>
          <CodeResultInput
            handleClickRun={() => { handleExecute(); }}
            handleClickPaste={handleClickPasteInput}
            handleChangeInput={handleChangeInput}
            input={input}
            inputTextAreaRef={inputTextAreaRef}
          />
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <CodeResultOutput
            output={output}
            handleClickCopy={handleClickCopyOutput}
            handleClickReset={handleClickResetOutput}
            outputTextAreaRef={outputTextAreaRef}
          />
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <CodeTestCaseTable executeResultList={testCaseList} />
        </TabPanel>
      </TabBody>
    </div>
  );
}
