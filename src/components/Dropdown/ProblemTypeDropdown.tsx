import { Button } from '@components/Button/index';
import { Input } from '@components/Input/index';
import { Typography } from '@components/Typography/index';
import useInput from '@hook/useInput';
import { Dropdown } from '@components/Dropdown/index';
import useProbleTypeDropdown from '@hook/useProblemTypeDropdown';
import { ChipWithSelected } from '@components/Chip/index';

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
              onClick={(e: React.MouseEvent<HTMLElement>) => handleSelect(e, index)}
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
            size="small"
          >
            초기화
          </Button>
          <Button
            onClick={handleOk}
            color="blue"
            size="small"
          >
            적용
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
