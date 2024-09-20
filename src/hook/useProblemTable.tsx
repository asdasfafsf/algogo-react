import { useCallback, useState } from 'react';
import useProblemTableFilterStore from '../zustand/ProblemTableFilterStore';

export default function useProblemTable() {
  const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((elem) => ({
    state: Math.floor((Math.random() * 100) % 2),
    title: '저는 문제입니다아아아아아아아아아아아아아아',
    grade: `다이아 ${(elem % 5) + 1}`,
    rate: '88.88',
    submitCount: (Math.random() * 10000).toFixed(0),
    source: 'https://acimpc.net/problem/3455',
  }));

  const [problemList] = useState(problems);
  const { problemSort, setProblemSort } = useProblemTableFilterStore((
    { problemSort, setProblemSort },
  ) => ({ problemSort, setProblemSort }));

  const handleClickProblemTh = useCallback((e: unknown, head: ProblemSortName | '출처') => {
    if ((head === '상태' || head === '출처')) {
      return;
    }

    setProblemSort(({ name, value }) => {
      if (head === name) {
        if (value === 1) {
          return ({
            name,
            value: 2,
          });
        } if (value === 2) {
          return ({
            name: '',
            value: 1,
          });
        }
      }
      return ({
        name: head,
        value: 1,
      });
    });
  }, [setProblemSort]);
  return [problemList,
    problemSort,
    handleClickProblemTh,
  ] as const;
}
