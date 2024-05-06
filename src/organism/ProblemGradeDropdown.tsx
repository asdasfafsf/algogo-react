import { Button, Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';

interface ProblemGradeDropdownProps {
  optionList: ProblemOption[];
  handleSelect: (e: React.MouseEvent, value: string) => void | Promise<void>
  handleOk: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  handleReset: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

export default function ProblemGradeDropdown({
  optionList,
  handleSelect,
  handleOk,
  handleReset,
}: ProblemGradeDropdownProps) {
  return (
    <Dropdown value="난이도">
      <div>
        {['브론즈', '실버', '골드', '플래티넘', '다이아', '루비'].map((level) => (
          <>
            <div className="my-2">
              <Typography variant="small">{level}</Typography>
            </div>
            <div className="flex flex-wrap gap-2 max-w-80">
              {optionList
                .filter((elem) => elem.type === '난이도')
                .filter((elem) => elem.name.includes(level))
                .map((elem) => (
                  <ChipWithSelected
                    value={elem.name}
                    isSelected={elem.isSelected}
                    onClick={(e) => { handleSelect(e, elem.value); }}
                  />
                ))}
            </div>
          </>
        ))}

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            className="bg-gray-500"
            color="gray"
            size="sm"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            color="blue"
            size="sm"
            onClick={handleOk}
          >
            적용
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
