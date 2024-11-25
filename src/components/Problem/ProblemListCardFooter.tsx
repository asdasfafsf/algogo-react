import { Pagebar } from '@components/Pagebar/index';

export default function ProblemListCardFooter() {
  return (
    <div className="flex items-center w-full h-20">
      <Pagebar
        currentPage={1}
        displayedPageRange={10}
        maxPage={10}
        handleChangePage={() => {}}
      />
    </div>
  );
}
