import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHead } from "@components/ui/table";

interface ProblemThSortProps {
  className?: string;
  align?: "left" | "center";
  sort: 0 | 1 | 2;
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
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
      className={`p-0 ${className}`}
    >
      <button
        type="button"
        className={`flex h-12 w-full select-none items-center gap-1 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:bg-muted/70 ${align === "center" ? "justify-center" : "justify-start"}`}
        onClick={onClick}
      >
        {children}
        {sort === 1 && <ChevronUp className="size-4" />}
        {sort === 2 && <ChevronDown className="size-4" />}
      </button>
    </TableHead>
  );
}
