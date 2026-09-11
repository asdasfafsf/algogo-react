import ProblemLevelDropdown from "./ProblemLevelDropdown";
import ProblemListLevelHiddenToggle from "./ProblemListLevelHiddenToggle";
import ProblemListSearcher from "./ProblemListSearcher";
import ProblemListTableFilter from "./ProblemListTableFilter";
import ProblemStateDropdown from "./ProblemStateDropdown";
import ProblemTypeDropdown from "./ProblemTypeDropdown";
import useProblemListStore from "@zustand/ProblemListStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export default function ProblemListCardHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">전체 문제</h2>
        <ProblemListSummary />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <ProblemListSearcher />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <ProblemLevelDropdown />
          <ProblemTypeDropdown />
          <ProblemStateDropdown />
          <ProblemListLevelHiddenToggle />
        </div>
      </div>
      <ProblemListTableFilter />
    </div>
  );
}

function ProblemListSummary() {
  const pagingInfo = useProblemListStore((state) => state.pagingInfo);
  const setPagingInfo = useProblemListStore((state) => state.setPagingInfo);
  const totalCount = useProblemListStore((state) => state.totalCount);
  const isFetching = useProblemListStore((state) => state.isFetching);

  return (
    <div className="flex items-center gap-3">
      <Select
        value={String(pagingInfo.pageSize)}
        onValueChange={(value) =>
          setPagingInfo({ pageNo: 1, pageSize: Number(value) })
        }
      >
        <SelectTrigger
          aria-label="페이지당 문제 수"
          className="h-8 w-auto cursor-pointer gap-1 text-xs transition-colors hover:border-foreground/30 hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring active:bg-accent"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem
              key={size}
              value={String(size)}
              className="cursor-pointer data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
            >
              {size}개씩 보기
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!isFetching && (
        <span className="text-sm text-muted-foreground">
          {totalCount}개의 문제
        </span>
      )}
    </div>
  );
}
