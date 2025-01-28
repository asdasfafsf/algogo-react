import { Input } from '@components/Input/index';
import { Button } from '@components/Button/index';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useProblemListSearcher from '@hook/problem-list/useProblemListSearcher';


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
    <div className="flex flex-wrap items-center justify-end w-full gap-4 shrink-0 md:w-max">
      <div className="w-full md:w-72">
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
      <Button
        onClick={handleClickSearch}
        className="w-full md:max-w-fit"
      >
        검색
      </Button>
    </div>
  );
}
