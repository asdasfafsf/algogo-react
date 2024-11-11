import { Button, IconButton } from '@components/Button';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PagebarProps {
  currentPage: number,
  displayedPageRange: number,
  maxPage?: number;
  handleChangePage: (e: React.MouseEvent<HTMLButtonElement>, pageNo: number) => void | Promise<void>
}

export default function Pagebar({
  currentPage = 1,
  displayedPageRange = 10,
  maxPage,
  handleChangePage,
}: PagebarProps) {
  const handleClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if (maxPage && currentPage >= maxPage) {
      return;
    }

    handleChangePage(e, currentPage + 1);
  };

  const handleClickPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if (currentPage === 1) return;

    handleChangePage(e, currentPage - 1);
  };

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleClickPrev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
        {' '}
        이전 페이지
      </Button>
      <div className="flex items-center gap-2">
        <div className="items-center hidden gap-2 md:flex">
          {Array.from(
            Array(displayedPageRange),
            (_, k) => (Math.floor(currentPage / displayedPageRange)) * 10 + (k + 1),
          ).map((pageNo) => (
            <IconButton
              key={pageNo}
              disabled={maxPage ? maxPage < pageNo : false}
              variant={currentPage === pageNo ? 'filled' : 'text'}
              onClick={(e) => handleChangePage(e, pageNo)}
            >
              {pageNo}
            </IconButton>
          ))}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <IconButton
            variant="text"
            // color="gray"
            onClick={(e) => handleChangePage(e, currentPage)}
          >
            {currentPage}
          </IconButton>
        </div>
      </div>
      <Button
        variant="text"
        className="flex items-center justify-center gap-2"
        onClick={handleClickNext}
        disabled={maxPage ? currentPage >= maxPage : false}
      >
        다음 페이지
        <ArrowRightIcon strokeWidth={2} className="relative w-4 h-4" />
      </Button>
    </div>
  );
}
