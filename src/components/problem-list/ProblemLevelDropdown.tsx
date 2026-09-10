import { Button } from "@components/Button/index";
import { Dropdown } from "@components/Dropdown/index";
import { ChipWithSelected } from "@components/Chip/index";
import { Typography } from "@components/common";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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

  return (
    <Dropdown
      align="bottom-left"
      showArrow={false}
      open={isOpen}
      handler={handler}
    >
      <div
        className={`flex cursor-pointer items-center gap-1 rounded-md border p-2 ${isOpen ? "border-primary/30 bg-accent text-accent-foreground" : "border-input bg-background text-foreground hover:bg-accent"}`}
      >
        <Typography variant="medium">난이도</Typography>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
