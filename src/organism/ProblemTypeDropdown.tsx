import { Button, Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';

interface ProblemTypeDropdownProps {
  optionList: ProblemOption[],
  handleSelect: (e: React.MouseEvent, index: number) => void | Promise<void>
  handleOk: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  handleReset: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

export default function ProblemTypeDropdown({
  optionList,
  handleSelect,
  handleOk,
  handleReset,
}: ProblemTypeDropdownProps) {
  return (
    <Dropdown value="유형">
      <div>
        <div className="mb-2">
          <Typography variant="small">유형 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80">

          {optionList.map(({
            isSelected, name, value, type,
          }, index) => {
            if (type === '유형') {
              return (
                <ChipWithSelected
                  key={value}
                  onClick={(e) => handleSelect(e, index)}
                  size="sm"
                  value={name}
                  isSelected={isSelected}
                />
              );
            }
            return '';
          })}

        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            onClick={handleReset}
            className="bg-gray-500"
            color="gray"
            size="sm"
          >
            초기화
          </Button>
          <Button
            onClick={handleOk}
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
