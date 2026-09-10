import { Checkbox } from "@components/Checkbox/index";
import { Dropdown } from "@components/Dropdown/index";
import { ChevronDown, ListChecks } from "lucide-react";
import React from "react";
import useProblemStateDropdown from "@/hook/problem-list/useProblemStateDropdown";

export default React.memo(() => {
  const { open, handler, problemStateList, handleClick } =
    useProblemStateDropdown();
  const selectedCount = problemStateList.filter(
    (item) => item.isSelected,
  ).length;
  return (
    <Dropdown
      align="bottom-left"
      open={open}
      handler={handler}
      className="px-0 py-0"
      showArrow={false}
    >
      <div className="flex h-10 w-[200px] cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-4 transition-colors hover:border-foreground/30 hover:bg-accent/60">
        <div className="flex min-w-0 items-center gap-2">
          <ListChecks
            className={`size-4 shrink-0 ${selectedCount > 0 ? "text-green-600" : "opacity-50"}`}
          />
          <span className="truncate text-sm font-medium">
            {selectedCount > 0 ? `상태 (${selectedCount})` : "상태"}
          </span>
        </div>
        <ChevronDown
          className={`size-3.5 shrink-0 opacity-40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      <ul className="w-40 gap-2 p-2">
        {problemStateList.map(({ isSelected, name, value }, index) => (
          <li
            key={value}
            className="flex items-center w-full gap-1 py-1 rounded-md cursor-pointer hover:bg-gray-300"
          >
            <Checkbox
              label={name}
              onClick={(e) => handleClick(e, index)}
              checked={isSelected}
              color="blue"
            />
          </li>
        ))}
      </ul>
    </Dropdown>
  );
});
