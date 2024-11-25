import { Pagebar } from '@components/Pagebar/index';
import useProblemListPagebar from '@hook/problem/useProblemListPagebar';

export default function ProblemListCardFooter() {
  const {
    pagingInfo,
    maxPageNo,
    handleChangePageNo,
  } = useProblemListPagebar();
  return (
    <div className="flex items-center w-full h-20">
      <Pagebar
        currentPage={pagingInfo.pageNo}
        displayedPageRange={10}
        maxPage={maxPageNo}
        handleChangePage={handleChangePageNo}
      />
    </div>
  );
}
