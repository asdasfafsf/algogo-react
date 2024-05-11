import { Button, Input, Typography } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';
import ChipWithSelected from '../atom/ChipWithSelected';
import useProbleTypeDropdown from '../hook/useProblemTypeDropdown';
import useInput from '../hook/useInput';

export default function ProblemTypeDropdown() {
  const [open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler] = useProbleTypeDropdown();

  const [filterValue, handleChange] = useInput();
  return (
    <Dropdown
      handler={handler}
      open={open}
      value="유형"
    >
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          <Typography variant="small">유형 </Typography>
          <Input
            onChange={handleChange}
            value={filterValue}
            label="유형 검색"
          />
        </div>
        <div className="flex flex-wrap gap-2 overflow-y-auto rounded-md w-80 max-h-60">

          {problemTypeList.map(({
            isSelected, name, value,
          }, index) => (
            name.includes(filterValue)
            && (
            <ChipWithSelected
              key={value}
              onClick={(e) => handleSelect(e, index)}
              size="sm"
              value={name}
              isSelected={isSelected}
            />
            )
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
