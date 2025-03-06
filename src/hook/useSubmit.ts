/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import useProblemStore from '@zustand/ProblemStore';
import useCodeEditorStore from '@zustand/CodeEditorStore';

export default function useSubmit() {
  const problem = useProblemStore((state) => state.problem);

  const handleSubmit = useCallback(async () => {
    if (problem) {
      const { sourceId, source } = problem;
      const { code, language } = useCodeEditorStore.getState();

      if (source === 'BOJ') {
        const submissionId = crypto.randomUUID();

        console.log('submissionId', submissionId);

        const executeResult = await new Promise<any>((resolve) => {
          window.postMessage({
            type: 'EXECUTE',
            data: {
              source,
              sourceId,
              code,
              language,
              submissionId,
            },
          }, '*');

          window.addEventListener('message', function handler(event) {
            console.log('event', event);
            if (event.data.data?.submissionId === submissionId) {
              window.removeEventListener('message', handler);
              resolve(event.data.data);
            }
          });
        });

        console.log('executeResult', executeResult);

        if (executeResult.code === '0000') {
          while (true) {
            const statusResult = await new Promise<any>((resolve) => {
              window.postMessage({
                type: 'PROGRESS',
                data: {
                  submissionId, // 진행상황 체크할 때도 동일한 ID 사용
                },
              }, '*');

              window.addEventListener('message', function handler(event) {
                // 동일한 ID의 진행상황만 처리
                if (event.data.data?.submissionId === submissionId) {
                  window.removeEventListener('message', handler);
                  resolve(event.data.data);
                }
              });
            });

            if (statusResult.isComplete) break;
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      }
    }
  }, [problem]);

  return { handleSubmit };
}
