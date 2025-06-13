import { Typography } from '@components/common/index';
import ProblemLevelDropdown from './ProblemLevelDropdown';
import ProblemListLevelHiddenToggle from './ProblemListLevelHiddenToggle';
import ProblemListSearcher from './ProblemListSearcher';
import ProblemListTableFilter from './ProblemListTableFilter';
import ProblemStateDropdown from './ProblemStateDropdown';
import ProblemTypeDropdown from './ProblemTypeDropdown';

export default function ProblemListCardHeader() {
  return (
    <div
      className="flex flex-wrap justify-between gap-4 mb-8 rounded-none"
    >
      <div className="w-full">
        <div className="w-full h-10">
          <Typography variant="h5">
            모든 문제
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <ProblemTypeDropdown />
            <ProblemLevelDropdown />
            <ProblemStateDropdown />
            <ProblemListLevelHiddenToggle />
          </div>
          <ProblemListSearcher />
        </div>

        <ProblemListTableFilter />
      </div>
    </div>
  );
}
