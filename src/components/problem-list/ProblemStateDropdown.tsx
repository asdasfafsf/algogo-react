import { Typography } from "@components/common";
import { Checkbox } from "@components/Checkbox/index";
import { Dropdown } from "@components/Dropdown/index";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import useProblemStateDropdown from "@/hook/problem-list/useProblemStateDropdown";

export default React.memo(() => {
  const { open, handler, problemStateList, handleClick } =
    useProblemStateDropdown();
  return (
    <Dropdown
      align="bottom-left"
      open={open}
      handler={handler}
      className="px-0 py-0"
      showArrow={false}
    >
      <div
        className={`flex cursor-pointer items-center gap-1 rounded-md border p-2 ${open ? "border-primary/30 bg-accent text-accent-foreground" : "border-input bg-background text-foreground hover:bg-accent"}`}
      >
        <Typography variant="medium">상태</Typography>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
