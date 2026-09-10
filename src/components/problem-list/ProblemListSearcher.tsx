import { Input } from "@components/Input/index";
import { Button } from "@components/Button/index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
    <div className="flex w-full items-center gap-2">
      <div className="min-w-0 flex-1">
        <Input
          ref={inputRef}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeProblemTitle}
          label="제목"
          icon={<MagnifyingGlassIcon className="w-5 h-5" />}
        />
      </div>
      <Button onClick={handleClickSearch} color="blue" className="shrink-0">
        검색
      </Button>
    </div>
  );
}
