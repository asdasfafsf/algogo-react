import { Button } from "@components/Button/index";
import { Input } from "@components/Input/index";
import { Dropdown } from "@components/Dropdown/index";
import { ChipWithSelected } from "@components/Chip/index";
import useInput from "@hook/useInput";
import { ChevronDown, Tag } from "lucide-react";
import React from "react";
import useProbleTypeDropdown from "@hook/problem-list/useProblemTypeDropdown";

export default React.memo(() => {
  const {
    open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  } = useProbleTypeDropdown();
  const selectedCount = problemTypeList.filter(
    (item) => item.isSelected,
  ).length;

  const { value: filterValue, handleChange } = useInput();
  return (
    <Dropdown
      open={open}
      handler={handler}
      className="px-0 py-0"
      showArrow={false}
      align="bottom-left"
    >
      <div className="flex h-10 w-[200px] cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-4 transition-colors hover:border-foreground/30 hover:bg-accent/60">
        <div className="flex min-w-0 items-center gap-2">
          <Tag
            className={`size-4 shrink-0 ${selectedCount > 0 ? "text-primary" : "opacity-50"}`}
          />
          <span className="truncate text-sm font-medium">
            {selectedCount > 0 ? `유형 (${selectedCount})` : "유형"}
          </span>
        </div>
        <ChevronDown
          className={`size-3.5 shrink-0 opacity-40 transition-transform ${open ? "rotate-180" : ""}`}
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
          {problemTypeList.map(
            ({ isSelected, name, value }, index) =>
              name.includes(filterValue) && (
                <ChipWithSelected
                  key={value}
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleSelect(e, index)
                  }
                  value={name}
                  isSelected={isSelected}
                />
              ),
          )}
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
          <Button onClick={handleOk} color="blue" size="small">
            적용
          </Button>
        </div>
      </div>
    </Dropdown>
  );
});
