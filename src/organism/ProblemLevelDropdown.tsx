import { Button, Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';
import useProblemLevelDropdown from '../hook/useProblemLevelDropdown';

export default function ProblemLevelDropdown() {
  const [isOpen,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler] = useProblemLevelDropdown();
  return (
    <Dropdown
      open={isOpen}
      handler={handler}
      value="난이도"
    >
      <div>
        {['브론즈', '실버', '골드', '플래티넘', '다이아', '루비'].map((level) => (
          <>
            <div className="my-2">
              <Typography variant="small">{level}</Typography>
            </div>
            <div className="flex flex-wrap gap-2 max-w-80">
              {problemLevelList
                .filter(({ value }) => value.includes(level))
                .map(({ name, value, isSelected }) => (
                  <ChipWithSelected
                    key={value}
                    value={name}
                    isSelected={isSelected}
                    onClick={(e) => { handleSelect(e, value); }}
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
