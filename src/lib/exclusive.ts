export type ExclusiveRunResult<Result> =
  { started: true; value: Result } | { started: false };

export type ExclusiveRunner = <Result>(
  operation: () => Promise<Result>,
) => Promise<ExclusiveRunResult<Result>>;

export function createExclusiveRunner(): ExclusiveRunner {
  let isRunning = false;

  return async <Result>(operation: () => Promise<Result>) => {
    if (isRunning) return { started: false };

    isRunning = true;
    try {
      return { started: true, value: await operation() };
    } finally {
      isRunning = false;
    }
  };
}
