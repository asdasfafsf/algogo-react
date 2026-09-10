import { Button } from "@components/Button/index";
import { Dropdown } from "@components/Dropdown/index";
import { ChipWithSelected } from "@components/Chip/index";
import { Typography } from "@components/common";
import React from "react";
import { ChevronDown, Signal } from "lucide-react";
import useProblemLevelDropdown from "@hook/problem-list/useProblemLevelDropdown";

export default React.memo(() => {
  const [
    isOpen,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  ] = useProblemLevelDropdown();
  const selectedCount = problemLevelList.filter(
    (item) => item.isSelected,
  ).length;

  return (
    <Dropdown
      align="bottom-left"
      showArrow={false}
      open={isOpen}
      handler={handler}
    >
      <div className="flex h-10 w-[200px] cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-4 transition-colors hover:border-foreground/30 hover:bg-accent/60">
        <div className="flex min-w-0 items-center gap-2">
          <Signal
            className={`size-4 shrink-0 ${selectedCount > 0 ? "text-tier-gold" : "opacity-50"}`}
          />
          <span className="truncate text-sm font-medium">
            {selectedCount > 0 ? `난이도 ${selectedCount}개` : "난이도"}
          </span>
        </div>
        <ChevronDown
          className={`size-3.5 shrink-0 opacity-40 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <div className="p-4" key="problemLevelDropdown">
        {["브론즈", "실버", "골드", "플래티넘", "다이아", "루비"].map(
          (level) => (
            <React.Fragment key={level}>
              <div className="my-2">
                <Typography
                  weight="light"
                  variant="medium"
                >{`${level}`}</Typography>
              </div>
              <div className="flex flex-wrap gap-2 w-80 max-w-80">
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
          ),
        )}

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
});
