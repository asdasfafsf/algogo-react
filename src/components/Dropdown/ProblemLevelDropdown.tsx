import { Button } from '@components/Button/index';
import { Dropdown } from '@components/Dropdown/index';
import { ChipWithSelected } from '@components/Chip/index';
import { Typography } from '@components/Typography/index';
import React from 'react';
import useProblemLevelDropdown from '@hook/useProblemLevelDropdown';

export default function ProblemLevelDropdown() {
  const [
    isOpen,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  ] = useProblemLevelDropdown();

  return (
    <Dropdown open={isOpen} handler={handler} value="난이도">
      <div key="problemLevelDropdown">
        {['브론즈', '실버', '골드', '플래티넘', '다이아', '루비'].map((level) => (
          <React.Fragment key={level}>
            <div className="my-2">
              <Typography weight="light" variant="medium">{`${level}`}</Typography>
            </div>
            <div className="flex flex-wrap gap-2 max-w-80">
              {problemLevelList
                .filter(({ name }) => name.includes(level))
                .map(({ name, isSelected }) => (
                  <ChipWithSelected
                    key={name}
                    value={name}
                    isSelected={isSelected}
                    onClick={(e) => {
                      handleSelect(e, name);
                    }}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            className="bg-gray-500"
            color="gray"
            size="small"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button color="blue" size="small" onClick={handleOk}>
            적용
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
