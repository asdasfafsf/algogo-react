import { Input } from "@components/ui/input";
import { Search } from "lucide-react";
import useProblemListSearcher from "@hook/problem-list/useProblemListSearcher";

export default function ProblemListSearcher() {
  const {
    inputRef,
    handleFocus,
    handleBlur,
    handleKeyUp,
    handleChangeProblemTitle,
    handleClickSearch,
  } = useProblemListSearcher();

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleClickSearch}
        aria-label="검색"
        className="absolute inset-y-0 left-0 z-10 flex w-9 items-center justify-center rounded-l-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <Search className="size-4" />
      </button>
      <Input
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeProblemTitle}
        placeholder="문제 제목 검색..."
        aria-label="문제 제목 검색"
        className="h-10 pl-9"
      />
    </div>
  );
}
