import { useCallback, useRef, useState } from "react";
import { createExclusiveRunner, type ExclusiveRunner } from "@lib/exclusive";

export default function useExclusiveAsync() {
  const runnerRef = useRef<ExclusiveRunner | null>(null);
  if (!runnerRef.current) {
    runnerRef.current = createExclusiveRunner();
  }
  const [isPending, setIsPending] = useState(false);

  const runExclusive = useCallback(
    async <Result>(operation: () => Promise<Result>) =>
      runnerRef.current!(async () => {
        setIsPending(true);
        try {
          return await operation();
        } finally {
          setIsPending(false);
        }
      }),
    [],
  );

  return { isPending, runExclusive };
}
