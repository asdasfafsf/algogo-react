import React from "react";

interface SelectBoxItemProps {
  children: React.ReactNode;
  className?: string;
  onClick: (_: unknown) => unknown | Promise<unknown>;
}

export default function SelectBoxItem({
  className = "",
  children,
  onClick,
}: SelectBoxItemProps) {
  return (
    <li
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          void onClick(event);
        }
      }}
      role="option"
      aria-selected={className.includes("bg-")}
      tabIndex={0}
      className={`cursor-pointer rounded-md p-2 outline-none hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      {children}
    </li>
  );
}
