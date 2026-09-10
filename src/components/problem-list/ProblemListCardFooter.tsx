import { Pagebar } from "@components/Pagebar/index";
import useProblemListPagebar from "@hook/problem-list/useProblemListPagebar";

export default function ProblemListCardFooter() {
  const { pagingInfo, maxPageNo, handleChangePageNo } = useProblemListPagebar();
  if (maxPageNo < 1) return null;

  return (
    <div className="mt-4 flex w-full items-center">
      <Pagebar
        currentPage={pagingInfo.pageNo}
        displayedPageRange={10}
        maxPage={maxPageNo}
        handleChangePage={handleChangePageNo}
      />
    </div>
  );
}
