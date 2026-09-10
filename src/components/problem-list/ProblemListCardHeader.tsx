import { Typography } from "@components/common/index";
import ProblemLevelDropdown from "./ProblemLevelDropdown";
import ProblemListLevelHiddenToggle from "./ProblemListLevelHiddenToggle";
import ProblemListSearcher from "./ProblemListSearcher";
import ProblemListTableFilter from "./ProblemListTableFilter";
import ProblemStateDropdown from "./ProblemStateDropdown";
import ProblemTypeDropdown from "./ProblemTypeDropdown";

export default function ProblemListCardHeader() {
  return (
    <div className="flex flex-wrap justify-between gap-4 mb-5 rounded-none">
      <div className="w-full">
        <div className="w-full h-10">
          <Typography variant="h5">모든 문제</Typography>
        </div>
        <div className="grid w-full gap-3 md:grid-cols-2 md:items-center">
          <ProblemListSearcher />
          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <ProblemTypeDropdown />
            <ProblemLevelDropdown />
            <ProblemStateDropdown />
            <ProblemListLevelHiddenToggle />
          </div>
        </div>

        <ProblemListTableFilter />
      </div>
    </div>
  );
}
