import { Button, Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';
import useProbleTypeDropdown from '../hook/useProblemTypeDropdown';

export default function ProblemTypeDropdown() {
  const [open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler] = useProbleTypeDropdown();

  return (
    <Dropdown
      handler={handler}
      open={open}
      value="유형"
    >
      <div>
        <div className="mb-2">
          <Typography variant="small">유형 </Typography>
        </div>
        <div className="flex flex-wrap gap-2 max-w-80">

          {problemTypeList.map(({
            isSelected, name, value,
          }, index) => (
            <ChipWithSelected
              key={value}
              onClick={(e) => handleSelect(e, index)}
              size="sm"
              value={name}
              isSelected={isSelected}
            />
          ))}

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
