import React from "react";
import useProblemTableFilter from "@hook/problem-list/useProblemTableFilter";
import { Button } from "@components/ui/button";
import { Typography } from "@components/common";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChipWithSelected } from "@components/Chip";

function ProblemListTableFilter() {
  const {
    problemOptionList,
    resetProblemOptions: handleReset,
    removeProblemOption: handleRemoveOption,
  } = useProblemTableFilter();
  const selectedOptions = problemOptionList
    .map((option, index) => ({ ...option, index }))
    .filter((option) => option.isSelected);

  if (selectedOptions.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="활성 필터"
    >
      {selectedOptions.map(({ type, name, index }) => (
        <ChipWithSelected
          key={`${type}_${name}`}
          isSelected
          value={name}
          onClick={() => handleRemoveOption(index)}
        />
      ))}
      {selectedOptions.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="ml-1 flex cursor-pointer items-center gap-1 border-l pl-3 text-muted-foreground"
          aria-label="필터 전체 초기화"
        >
          <ArrowPathIcon className="size-4" />
          <Typography variant="small">전체 초기화</Typography>
        </Button>
      )}
    </div>
  );
}

export default React.memo(ProblemListTableFilter);
