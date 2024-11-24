import { Button } from '@components/Button/index';
import { Input } from '@components/Input/index';
import { Dropdown } from '@components/Dropdown/index';
import { ChipWithSelected } from '@components/Chip/index';
import { Typography } from '@components/Typography/index';
import useInput from '@hook/useInput';
import useProbleTypeDropdown from '@hook/useProblemTypeDropdown';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

export default function ProblemTypeDropdown() {
  const {
    open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  } = useProbleTypeDropdown();

  const [filterValue, handleChange] = useInput();
  return useMemo(() => (
    <Dropdown
      open={open}
      handler={handler}
      className="px-0 py-0"
      showArrow={false}
      align="bottom-left"

    >
      <div className={`flex items-center gap-1 p-2 ${open ? 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 '} rounded-md cursor-pointer`}>
        <Typography variant="medium">유형</Typography>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div className="p-4">
        <Input
          className="w-full h-10 mb-4"
          onChange={handleChange}
          value={filterValue}
          label="유형 검색"
        />
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
  ), [open, problemTypeList]);
}
