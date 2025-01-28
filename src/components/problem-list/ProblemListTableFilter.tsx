// src/components/Table/ProblemTableFilter.tsx

import React, { useCallback } from 'react';
import { Typography } from '@components/common';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { ChipWithSelected } from '@components/Chip/index';

function ProblemListTableFilter() {
  const { problemOptionList, setProblemOptionList } = useProblemTableFilterStore(
    ({ problemOptionList, setProblemOptionList }) => ({ problemOptionList, setProblemOptionList }),
  );

  const handleReset = useCallback(() => {
    setProblemOptionList([]);
  }, [setProblemOptionList]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      setProblemOptionList((prevList) => [
        ...prevList.slice(0, index),
        ...prevList.slice(index + 1),
      ]);
    },
    [setProblemOptionList],
  );

  if (!problemOptionList.length) {
    return null;
  }

  return (
    <div className="mt-2">
      {/* <Line /> */}
      <div className="flex flex-wrap gap-2 py-2">

        <div
          onClick={handleReset}
          className="flex items-center gap-1 cursor-pointer"
          aria-label="초기화"
        >
          <ArrowPathIcon className="w-4 h-4" />
          <Typography variant="small">초기화</Typography>
        </div>

        {problemOptionList.map(({ type, isSelected, name }, index) => (isSelected ? (
          <ChipWithSelected
            key={`${type}_${name}`}
            isSelected
            value={name}
            onClick={() => handleRemoveOption(index)}
          />
        ) : null))}
      </div>
    </div>
  );
}

export default React.memo(ProblemListTableFilter);
