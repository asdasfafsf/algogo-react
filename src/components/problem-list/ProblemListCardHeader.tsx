import { Typography } from '@components/common/index';
import ProblemListTableFilter from './ProblemListTableFilter';
import ProblemLevelDropdown from './ProblemLevelDropdown';
import ProblemTypeDropdown from './ProblemTypeDropdown';
import ProblemStateDropdown from './ProblemStateDropdown';
import ProblemListSearcher from './ProblemListSearcher';

export default function ProblemListCardHeader() {
  return (
    <div
      className="flex flex-wrap justify-between gap-4 p-6 mb-4 rounded-none"
    >
      <div className="w-full">
        <div className="w-full h-12">
          <Typography variant="h5">
            모든 문제
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <ProblemTypeDropdown />
            <ProblemLevelDropdown />
            <ProblemStateDropdown />
          </div>
          <ProblemListSearcher />
        </div>

        <ProblemListTableFilter />
      </div>
    </div>
  );
}
