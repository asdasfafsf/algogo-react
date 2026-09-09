export const DEFAULT_PROBLEM_PAGE = {
  pageNo: 1,
  pageSize: 20,
} as const;

export type ProblemPaging = {
  pageNo: number;
  pageSize: number;
};

export type ProblemFilterKind = '난이도' | '유형' | '상태' | '출처';

export type ProblemFilterOption = {
  type: ProblemFilterKind;
  name: string;
  value: string;
  isSelected: boolean;
};

export type ProblemListRequest = ProblemPaging & {
  levelList: number[];
  typeList: string[];
  sort: number;
  title: string;
  states: string[];
};

export type ProblemSortColumn = '제목' | '난이도' | '정답률' | '제출';

const PROBLEM_SORT_CYCLES: Record<ProblemSortColumn, readonly number[]> = {
  제목: [10, 11, 0],
  난이도: [20, 21, 0],
  정답률: [30, 31, 0],
  제출: [40, 41, 0],
};

export function buildProblemListRequest(
  paging: ProblemPaging,
  options: readonly ProblemFilterOption[],
  sort = 0,
  title = '',
): ProblemListRequest {
  const selected = options.filter(option => option.isSelected);

  return {
    ...paging,
    levelList: selected
      .filter(option => option.type === '난이도')
      .map(option => Number(option.value)),
    typeList: selected
      .filter(option => option.type === '유형')
      .map(option => option.value),
    sort,
    title,
    states: selected
      .filter(option => option.type === '상태')
      .map(option => option.value),
  };
}

export function calculateMaxPage(totalCount: number, pageSize: number): number {
  return Math.ceil(totalCount / pageSize);
}

export function changeProblemPage(
  paging: ProblemPaging,
  requestedPage: number,
  maxPage: number,
): ProblemPaging {
  if (requestedPage < 1 || requestedPage > maxPage) {
    return paging;
  }

  return { ...paging, pageNo: requestedPage };
}

export function resetProblemPage(paging: ProblemPaging): ProblemPaging {
  return { ...paging, pageNo: 1 };
}

export function nextProblemSort(
  currentSort: number,
  column: ProblemSortColumn,
): number {
  const cycle = PROBLEM_SORT_CYCLES[column];
  const currentIndex = cycle.indexOf(currentSort);
  return cycle[(currentIndex + 1) % cycle.length];
}

export function removeProblemFilter(
  options: readonly ProblemFilterOption[],
  index: number,
): ProblemFilterOption[] {
  return [...options.slice(0, index), ...options.slice(index + 1)];
}

export function replaceProblemFilters(
  current: readonly ProblemFilterOption[],
  type: ProblemFilterKind,
  available: readonly Omit<ProblemFilterOption, 'type'>[],
): ProblemFilterOption[] {
  const availableByName = new Map(
    available.map(option => [option.name, option]),
  );
  const next = current.filter(option => {
    if (option.type !== type) return true;
    return availableByName.get(option.name)?.isSelected === true;
  });

  for (const option of available) {
    if (
      option.isSelected &&
      !next.some(candidate => candidate.name === option.name)
    ) {
      next.push({ type, ...option });
    }
  }

  return next;
}
