import { useCallback, useEffect, useState } from 'react';
import { useProblemTableFilterStore } from '../zustand/ProblemTableFilterStore';
import { getProblemList } from '../api/problems';
import useAlertModal from './useAlertModal';
import useDebounce from './useDebounce';

export default function useProblemTable() {
  const [alert] = useAlertModal();
  const [problemList, setProblemList] = useState<ResponseProblem[] | undefined>();
  const {
    problemTitle, problemOptionList, problemSort, setProblemSort, setProblemTitle,
  } = useProblemTableFilterStore((
    {
      problemTitle, problemOptionList, problemSort, setProblemSort, setProblemTitle,
    },
  ) => ({
    problemTitle, problemOptionList, problemSort, setProblemSort, setProblemTitle,
  }));

  const [pagingInfo, setPagingInfo] = useState({
    pageNo: 1,
    pageSize: 20,
  });
  const [isOpenGrade] = useState(false);

  const [maxPageNo, setMaxPageNo] = useState(1);
  const fetchProblemList = useCallback(async () => {
    setProblemList(undefined);
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
    if (response.statusCode !== 200) {
      await alert(`${response.errorMessage}`);
      return;
    }

    const {
      problemList, totalCount,
    } = response.data;

    const maxPageNo = Math.ceil(totalCount / pageSize);
    setMaxPageNo(maxPageNo);
    setProblemList(problemList);
  }, [pagingInfo]);

  useEffect(() => {
    setPagingInfo((prev) => ({ ...prev, pageNo: 1 }));
  }, [problemOptionList]);

  useEffect(() => {
    fetchProblemList();
  }, [pagingInfo]);

  const handleChangePageNo = useCallback(async (
    _e: React.MouseEvent<HTMLButtonElement>,
    pageNo: number,
  ) => {
    if (pageNo === pagingInfo.pageNo) {
      return;
    }

    if (pageNo < 0 || pageNo > maxPageNo) {
      return;
    }

    setPagingInfo((prev) => ({ ...prev, pageNo }));
  }, [pagingInfo]);

  const handleClickProblem = useCallback(
    (_e: React.MouseEvent<HTMLElement>, problemUuid: string) => {
      window.open(
        location.hostname === 'localhost'
          ? `http://localhost:5173/problem/${problemUuid}`
          : `https://www.algogo.co.kr/problem/${problemUuid}`,
        '_blank',
        'noopener, noreferrer',
      );
    },
    [],
  );

  const handleClickProblemTh = useCallback((_e: unknown, head: ProblemSortName | '출처') => {
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

  const handleChangeProblemTitle = useCallback(
    (
      _: React.ChangeEvent<HTMLElement>,
      value: string,
    ) => {
      setProblemTitle(value);
    },
    [],
  );

  return {
    isOpenGrade,
    problemList,
    problemSort,
    pagingInfo,
    maxPageNo,
    handleChangeProblemTitle,
    handleClickProblem,
    handleClickProblemTh,
    handleChangePageNo,
  };
}
