import { useState } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PagebarProps {
  currentPage: number,
  displayedPageRange: number,
  maxPage?: number;
  handleChangePage: (pageNo: number) => void | Promise<void>
}

export default function Pagebar({
  currentPage = 1,
  displayedPageRange = 10,
  maxPage,
  handleChangePage,
}: PagebarProps) {
  const getItemProps = (index: number) => ({
    variant: currentPage === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => handleChangePage(index),
  });

  const next = () => {
    if (maxPage && maxPage >= currentPage) {
      return;
    }

    handleChangePage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    handleChangePage(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
        {' '}
        이전 페이지
      </Button>
      <div className="flex items-center gap-2">
        {Array.from(
          Array(displayedPageRange),
          (_, k) => (Math.floor(currentPage / displayedPageRange)) * 10 + (k + 1),
        ).map((pageNo) => <IconButton {...getItemProps(pageNo)}>{pageNo}</IconButton>)}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === (maxPage && maxPage >= currentPage)}
      >
        다음 페이지
        <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
      </Button>
    </div>
  );
}
