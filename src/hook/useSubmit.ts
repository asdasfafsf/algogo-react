import { useCallback } from 'react';
import useProblemStore from '@zustand/ProblemStore';
import useCodeEditorStore from '@zustand/CodeEditorStore';

export default function useSubmit() {
  const problem = useProblemStore((state) => state.problem);
  const code = useCodeEditorStore((state) => state.code);
  const handleSubmit = useCallback(async () => {
    if (problem) {
      const { sourceId, source } = problem;

      // Copy code to clipboard
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        // Do nothing
      }

      if (source === 'BOJ') {
        window.open(`https://www.acmicpc.net/submit/${sourceId}`, '_blank');
      }
    }
  }, [problem, code]);

  return { handleSubmit };
}
