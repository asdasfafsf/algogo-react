import React from 'react';
import {
  Tab, TabHeader, TabPanel, TabBody,
} from '@components/tab/index';
import useExecute from '@hook/useExecute';
import useCodeResultPanel from '@hook/useCodeResultPanel';
import CodeEditorResizer from './CodeEditorResizer';
import CodeResultInput from './CodeResultInput';
import CodeResultOutput from './CodeResultOutput';
import CodeTestCaseTable from './CodeTestCaseTable';

export function CodeResultPannel() {
  const {
    input,
    output,
    handleChangeInput,
    handleClickPasteInput,
    selectedIndex,
    handleClickTab,
    inputTextAreaRef,
    handleClickCopyOutput,
    handleClickResetOutput,
    testCaseList,
  } = useCodeResultPanel();

  const { handleExecute } = useExecute();
  return (
    <div
      className="w-full h-full overflow-x-hidden overflow-y-hidden"
    >
      <CodeEditorResizer />
      <TabHeader className="h-10 min-w-[360px] overflow-hidden">
        <Tab
          text="입력"
          isSelected={selectedIndex === 0}
          handleClick={(e) => { handleClickTab(e, 0); }}
        />
        <Tab
          text="실행 결과"
          isSelected={selectedIndex === 1}
          handleClick={(e) => { handleClickTab(e, 1); }}
        />
        <Tab
          text="테스트 케이스"
          isSelected={selectedIndex === 2}
          handleClick={(e) => { handleClickTab(e, 2); }}
        />
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
            handleClickRun={() => handleExecute()}
            handleClickCopy={handleClickCopyOutput}
            handleClickReset={handleClickResetOutput}
          />
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <CodeTestCaseTable executeResultList={testCaseList} />
        </TabPanel>
      </TabBody>
    </div>
  );
}

export default React.memo(CodeResultPannel);
