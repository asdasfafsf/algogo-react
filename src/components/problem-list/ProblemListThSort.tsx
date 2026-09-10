import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHead } from "@components/ui/table";

interface ProblemThSortProps {
  className?: string;
  align?: "left" | "center";
  sort: 0 | 1 | 2;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

export default function ProblemThSort({
  sort,
  children,
  className = "",
  align = "left",
  onClick = () => {},
}: ProblemThSortProps) {
  return (
    <TableHead
      aria-sort={sort === 1 ? "ascending" : sort === 2 ? "descending" : "none"}
      className={`cursor-pointer select-none hover:bg-muted/50 ${className}`}
      onClick={onClick}
    >
      <button
        type="button"
        className={`flex w-full items-center gap-1 text-sm font-medium text-muted-foreground ${align === "center" ? "justify-center" : "justify-start"}`}
      >
        {children}
        {sort === 1 && <ChevronUp className="size-4" />}
        {sort === 2 && <ChevronDown className="size-4" />}
      </button>
    </TableHead>
  );
}
