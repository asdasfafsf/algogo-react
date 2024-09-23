import { useCallback, useEffect, useState } from 'react';
import useProblemTableFilterStore from '../zustand/ProblemTableFilterStore';
import { getProblemList } from '../api/problems';

export default function useProblemTable() {
  // const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((elem) => ({
  //   state: Math.floor((Math.random() * 100) % 2),
  //   title: '저는 문제입니다아아아아아아아아아아아아아아',
  //   grade: `다이아 ${(elem % 5) + 1}`,
  //   rate: '88.88',
  //   submitCount: (Math.random() * 10000).toFixed(0),
  //   source: 'https://acimpc.net/problem/3455',
  // }));

  const [problemList, setProblemList] = useState<ResponseProblem[]>([]);
  const { problemSort, setProblemSort } = useProblemTableFilterStore((
    { problemSort, setProblemSort },
  ) => ({ problemSort, setProblemSort }));

  const { problemOptionList } = useProblemTableFilterStore((
    { problemOptionList },
  ) => ({ problemOptionList }));

  const [pagingInfo, setPagingInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [maxPageNo, setMaxPageNo] = useState(1);

  const fetchProblemList = useCallback(async () => {
    const { pageNo, pageSize } = pagingInfo;
    const requestProblemListDto = {
      pageNo,
      pageSize,
      levelList: problemOptionList
        .filter((elem) => elem.isSelected && elem.type === '난이도')
        .map((elem) => elem.value)
        .map(Number),
      typeList: problemOptionList
        .filter((elem) => elem.isSelected && elem.type === '유형')
        .map((elem) => elem.value),
    };
    const response = await getProblemList(requestProblemListDto);
    const {
      problemList, totalCount,
    } = response.data;
    const maxPageNo = Math.ceil(totalCount / pageSize);
    setMaxPageNo(maxPageNo);
    setProblemList(problemList);
  }, [pagingInfo, problemList, problemOptionList]);

  useEffect(() => {
    fetchProblemList();
  }, [pagingInfo, problemOptionList]);

  const handleChangePageNo = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>,
    pageNo: number,
  ) => {
    if (pageNo === pagingInfo.pageNo) {
      return;
    }

    if (pageNo < 0 || pageNo > maxPageNo) {
      return;
    }

    setPagingInfo({
      ...pagingInfo,
      pageNo,
    });
  }, [pagingInfo, maxPageNo]);

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
  return {
    problemList,
    problemSort,
    ...pagingInfo,
    maxPageNo,
    handleClickProblemTh,
    handleChangePageNo,
  };
}
