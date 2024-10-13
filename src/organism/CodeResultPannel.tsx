/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import TabHeader from '../atom/TabHeader';
import Tab from '../atom/Tab';
import TabPanel from '../atom/TabPanel';
import TabBody from '../atom/TabBody';
import { useExecuteResultListStore } from '../zustand/ExecuteResultListStore';
import CodeEditorResizer from '../molecule/CodeEditorResizer';
import CodeResultInput from './CodeResultInput';
import CodeResultOutput from './CodeResultOutput';
import CodeTestCaseTable from './CodeTestCaseTable';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';

export default function CodeResultPannel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const executeResultList = useExecuteResultListStore((state) => state.executeResultList);
  const {
    language, code, input, output, setInput, setOutput,
  } = useCodeEditorStore(({
    language, code, input, output, setInput, setOutput,
  }) => ({
    language, code, input, output, setInput, setOutput,
  }));

  const { connect, execute } = useExecuteSocketStore(
    ({ connect, execute }) => ({ connect, execute }),
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
        <Tab text="입력" isSelected={selectedIndex === 0} handleClick={() => { setSelectedIndex(0); }} />
        <Tab text="실행 결과" isSelected={selectedIndex === 1} handleClick={() => { setSelectedIndex(1); }} />
        <Tab text="테스트 케이스" isSelected={selectedIndex === 2} handleClick={() => { setSelectedIndex(2); }} />
      </TabHeader>
      <TabBody className="h-[calc(100%-44px)]">
        <TabPanel isSelected={selectedIndex === 0}>
          <CodeResultInput
            handleClickRun={async () => {
              execute({
                seq: 0,
                provider: language,
                code,
                inputList: [{ seq: '1', input }],
              });
            }}
            handleClickPaste={async () => {
              const copiedValue = await navigator.clipboard.readText();
              setInput(copiedValue);
            }}
            handleChangeInput={(_, input) => setInput(input)}
            input={input}
            inputTextAreaRef={inputTextAreaRef}
          />
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 1}>
          <CodeResultOutput
            output={output}
            handleClickCopy={async () => navigator.clipboard.writeText(output)}
            handleChangeOutput={(_, output) => setOutput(output)}
            handleClickReset={() => setOutput('')}
            outputTextAreaRef={outputTextAreaRef}
          />
        </TabPanel>
        <TabPanel isSelected={selectedIndex === 2}>
          <CodeTestCaseTable executeResultList={executeResultList} />
        </TabPanel>
      </TabBody>
    </div>
  );
}
