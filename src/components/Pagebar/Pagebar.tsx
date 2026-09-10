import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

interface PagebarProps {
  currentPage: number;
  displayedPageRange: number;
  maxPage?: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    pageNo: number,
  ) => void | Promise<void>;
}

export default function Pagebar({
  currentPage = 1,
  displayedPageRange = 10,
  maxPage,
  handleChangePage,
}: PagebarProps) {
  const firstPage =
    Math.floor((currentPage - 1) / displayedPageRange) * displayedPageRange + 1;
  const pages = Array.from(
    {
      length: Math.max(
        0,
        Math.min(
          displayedPageRange,
          (maxPage ?? firstPage + displayedPageRange - 1) - firstPage + 1,
        ),
      ),
    },
    (_, index) => firstPage + index,
  );
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={(event) => handleChangePage(event, currentPage - 1)}
          />
        </PaginationItem>
        <div className="hidden items-center gap-1 md:flex">
          {pages.map((pageNo) => (
            <PaginationItem key={pageNo}>
              <PaginationLink
                aria-label={`${pageNo}페이지`}
                isActive={pageNo === currentPage}
                onClick={(event) => handleChangePage(event, pageNo)}
              >
                {pageNo}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem className="md:hidden">
          <PaginationLink isActive aria-label={`현재 ${currentPage}페이지`}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            disabled={maxPage ? currentPage >= maxPage : false}
            onClick={(event) => handleChangePage(event, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
