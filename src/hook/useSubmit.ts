import { useCallback } from 'react';
import useProblemStore from '@zustand/ProblemStore';

export default function useSubmit() {
  const problem = useProblemStore((state) => state.problem);
  const handleSubmit = useCallback(async () => {
    if (problem) {
      const { sourceId, source } = problem;

      if (source === 'BOJ') {
        window.open(`https://www.acmicpc.net/submit/${sourceId}`, '_blank');
      }
    }
  }, [problem]);

  return { handleSubmit };
}
