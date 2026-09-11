import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <Pagination className="overflow-x-auto px-1 py-1">
      <PaginationContent className="min-w-max">
        <PaginationItem>
          <PaginationLink
            aria-label="이전 페이지"
            disabled={currentPage === 1}
            onClick={(event) => handleChangePage(event, currentPage - 1)}
            className="size-10 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80 disabled:cursor-not-allowed disabled:hover:bg-transparent sm:h-9 sm:w-auto sm:px-3"
          >
            <ChevronLeft aria-hidden className="size-4" />
            <span className="hidden sm:inline">이전</span>
          </PaginationLink>
        </PaginationItem>
        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((pageNo) => (
            <PaginationItem key={pageNo}>
              <PaginationLink
                aria-label={`${pageNo}페이지`}
                isActive={pageNo === currentPage}
                onClick={(event) => handleChangePage(event, pageNo)}
                className="hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80"
              >
                {pageNo}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem className="sm:hidden">
          <PaginationLink
            isActive
            disabled
            aria-label={`현재 ${currentPage}페이지, 전체 ${maxPage ?? currentPage}페이지`}
            className="h-10 w-auto min-w-16 px-3 tabular-nums disabled:opacity-100 disabled:hover:bg-background"
          >
            {currentPage}
            <span aria-hidden className="px-1 text-muted-foreground">
              /
            </span>
            <span aria-hidden className="text-muted-foreground">
              {maxPage ?? currentPage}
            </span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-label="다음 페이지"
            disabled={maxPage ? currentPage >= maxPage : false}
            onClick={(event) => handleChangePage(event, currentPage + 1)}
            className="size-10 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80 disabled:cursor-not-allowed disabled:hover:bg-transparent sm:h-9 sm:w-auto sm:px-3"
          >
            <span className="hidden sm:inline">다음</span>
            <ChevronRight aria-hidden className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
