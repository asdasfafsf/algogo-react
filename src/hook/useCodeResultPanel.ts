import { useCallback, useEffect } from 'react';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import useTestCaseListStore from '../zustand/TestCaseListStore';
import useProblemStore from '../zustand/ProblemStore';

export default function useCodeResultPanel() {
  const {
    selectedIndex, setSelectedIndex, inputTextAreaRef, outputTextAreaRef,
  } = useCodeResultPanelStore((state) => state);
  const handleClickTab = useCallback(async (_: React.MouseEvent<Element>, index: number) => {
    setSelectedIndex(index);
  }, [selectedIndex]);

  const problem = useProblemStore((state) => state.problem);

  const input = useCodeEditorStore((state) => state.input);
  const output = useCodeEditorStore((state) => state.output);
  const setInput = useCodeEditorStore((state) => state.setInput);
  const setOutput = useCodeEditorStore((state) => state.setOutput);

  useEffect(() => {
    if (problem) {
      if (problem.inputOutputList.length > 0) {
        setInput(problem.inputOutputList[0].input);
      }
    }
  }, [problem]);

  const handleClickPasteInput = useCallback(async () => {
    const input = await navigator.clipboard.readText();
    setInput(input);
  }, [setInput]);

  const handleChangeInput = useCallback((_: React.ChangeEvent<HTMLElement>, input: string) => {
    setInput(input);
  }, [setInput]);

  const handleClickCopyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(`${output.result}${output.detail ? `\n${output.detail}` : ''}`);
  }, [output]);

  const handleClickResetOutput = useCallback(() => setOutput({
    seq: 0,
    processTime: 0,
    memory: 0,
    code: '',
    result: '실행 결과가 출력됩니다',
    detail: '',
  }), []);

  const testCaseList = useTestCaseListStore((state) => state.testCaseList);

  return {
    input,
    output,
    inputTextAreaRef,
    outputTextAreaRef,
    selectedIndex,
    testCaseList,
    handleClickTab,
    handleClickPasteInput,
    handleChangeInput,
    handleClickCopyOutput,
    handleClickResetOutput,
  };
}
