import { Button, Typography } from '@material-tailwind/react';
import { MouseEvent } from 'react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';

interface ProblemGradeDropdownProps {
  optionList: ProblemOption[];
}

export default function ProblemGradeDropdown({ optionList }: ProblemGradeDropdownProps) {
  return (
    <Dropdown value="난이도">
      <div>
        <div className="mb-2">
          <Typography variant="small">브론즈 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80">
          {optionList
            .filter((elem) => elem.type === '난이도')
            .filter((elem) => elem.name.includes('브론즈'))
            .map((elem) => (
              <ChipWithSelected
                value={elem.name}
                isSelected={elem.isSelected}
                onClick={() => {}}
              />
            ))}
        </div>
        <div className="mb-2">
          <Typography variant="small">실버 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80" />
        <div className="mb-2">
          <Typography variant="small">골드 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80" />
        <div className="mb-2">
          <Typography variant="small">플래티넘 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80" />
        <div className="mb-2">
          <Typography variant="small">다이아 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80" />
        <div className="mb-2">
          <Typography variant="small">루비 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80" />
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            className="bg-gray-500"
            color="gray"
            size="sm"
          >
            초기화
          </Button>
          <Button
            color="blue"
            size="sm"
          >
            적용
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
