import { Typography } from '@components/common/index';
import { Input } from '@components/Input/index';
import { Button } from '@components/Button/index';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProblemListTableFilter from './ProblemListTableFilter';
import ProblemLevelDropdown from './ProblemLevelDropdown';
import ProblemTypeDropdown from './ProblemTypeDropdown';
import ProblemStateDropdown from './ProblemStateDropdown';

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
          <div className="flex flex-wrap items-center justify-end w-full gap-4 shrink-0 md:w-max">
            {/* <div className="md:w-72"> */}
            <Input
              label="제목"
              icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            />
            {/* </div> */}
            <Button
              className="w-full md:max-w-fit"
            >
              검색
            </Button>
          </div>
        </div>

        <ProblemListTableFilter />
      </div>
    </div>
  );
}
