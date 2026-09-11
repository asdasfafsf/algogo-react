import { useCallback, useEffect } from "react";
import useCodeResultPanelStore from "../zustand/CodeResultPanelStore";
import useCodeEditorStore from "../zustand/CodeEditorStore";
import useTestCaseListStore from "../zustand/TestCaseListStore";
import useProblemStore from "../zustand/ProblemStore";
import useToastModal from "@hook/modal/useToastModal";
import {
  copyTextWithFeedback,
  pasteTextWithFeedback,
  type ClipboardFeedback,
  type ClipboardReadText,
  type ClipboardWriteText,
} from "@lib/clipboard";
import useExclusiveAsync from "@hook/useExclusiveAsync";

interface UseCodeResultPanelOptions {
  clipboardReader?: ClipboardReadText | null;
  clipboardWriter?: ClipboardWriteText | null;
}

export default function useCodeResultPanel({
  clipboardReader,
  clipboardWriter,
}: UseCodeResultPanelOptions = {}) {
  const {
    isPending: isInputPastePending,
    runExclusive: runExclusiveInputPaste,
  } = useExclusiveAsync();
  const {
    isPending: isOutputCopyPending,
    runExclusive: runExclusiveOutputCopy,
  } = useExclusiveAsync();
  const { toast } = useToastModal();
  const {
    selectedIndex,
    setSelectedIndex,
    inputTextAreaRef,
    outputTextAreaRef,
  } = useCodeResultPanelStore((state) => state);
  const handleClickTab = useCallback(
    (index: number) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex],
  );

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

  const showClipboardFeedback = useCallback(
    ({ message, variant }: ClipboardFeedback) => {
      void toast(message, 3000, variant).catch(() => undefined);
    },
    [toast],
  );

  const handleClickPasteInput = useCallback(async () => {
    const attempt = await runExclusiveInputPaste(() =>
      pasteTextWithFeedback(clipboardReader),
    );
    if (!attempt.started) return;

    const result = attempt.value;
    if (result.status === "success") {
      setInput(result.value);
    }
    showClipboardFeedback(result.feedback);
  }, [
    clipboardReader,
    runExclusiveInputPaste,
    setInput,
    showClipboardFeedback,
  ]);

  const handleChangeInput = useCallback(
    (input: string) => {
      setInput(input);
    },
    [setInput],
  );

  const handleClickCopyOutput = useCallback(async () => {
    const attempt = await runExclusiveOutputCopy(() =>
      copyTextWithFeedback(
        `${output.result}${output.detail ? `\n${output.detail}` : ""}`,
        clipboardWriter,
      ),
    );
    if (!attempt.started) return;

    const result = attempt.value;
    showClipboardFeedback(result.feedback);
  }, [clipboardWriter, output, runExclusiveOutputCopy, showClipboardFeedback]);

  const handleClickResetOutput = useCallback(
    () =>
      setOutput({
        seq: 0,
        processTime: 0,
        memory: 0,
        code: "",
        result: "실행 결과가 출력됩니다",
        detail: "",
      }),
    [],
  );

  const testCaseList = useTestCaseListStore((state) => state.testCaseList);

  return {
    input,
    output,
    inputTextAreaRef,
    outputTextAreaRef,
    selectedIndex,
    testCaseList,
    isInputPastePending,
    isOutputCopyPending,
    handleClickTab,
    handleClickPasteInput,
    handleChangeInput,
    handleClickCopyOutput,
    handleClickResetOutput,
  };
}
