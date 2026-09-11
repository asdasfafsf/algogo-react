import { useCallback } from "react";
import useProblemStore from "@zustand/ProblemStore";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import { submitCode } from "@/application/editor/submit";
import { getSubmissionFeedback } from "@/domain/editor/submission";
import { writeTextToClipboard } from "@lib/clipboard";
import { openSubmissionPage } from "@lib/submissionBrowser";
import useToastModal from "@hook/modal/useToastModal";

export default function useSubmit() {
  const problem = useProblemStore((state) => state.problem);
  const code = useCodeEditorStore((state) => state.code);
  const { toast } = useToastModal();

  const handleSubmit = useCallback(() => {
    const submission = submitCode(
      {
        problem: problem && {
          source: problem.source,
          sourceId: problem.sourceId,
        },
        code,
      },
      {
        openPage: openSubmissionPage,
        copyText: writeTextToClipboard,
      },
    );

    void submission.then((result) => {
      const feedback = getSubmissionFeedback(result);
      return toast(feedback.message, 5000, feedback.variant);
    });
  }, [problem, code, toast]);

  return { handleSubmit };
}
