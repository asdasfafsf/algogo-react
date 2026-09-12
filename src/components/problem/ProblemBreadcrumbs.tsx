import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProblemBreadcrumbsProps {
  number?: string;
  title: string;
  className?: string;
}

export default function ProblemBreadcrumbs({
  number,
  title,
  className,
}: ProblemBreadcrumbsProps) {
  const current = number ? `#${number} ${title}` : title;

  return (
    <nav
      aria-label="문제 경로"
      className={cn("min-w-0 flex-1 overflow-hidden", className)}
    >
      <ol className="flex min-w-0 items-center gap-1 text-sm">
        <li className="shrink-0">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Link to="/" aria-label="홈으로 이동">
              <Home aria-hidden="true" />
            </Link>
          </Button>
        </li>

        <li
          aria-hidden="true"
          className="flex shrink-0 items-center text-muted-foreground"
        >
          <ChevronRight className="size-3.5" />
        </li>

        <li className="hidden shrink-0 items-center gap-1 min-[480px]:flex">
          <Link
            to="/problem"
            className="rounded-sm px-1.5 py-1 text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            문제 목록
          </Link>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />
        </li>

        <li className="min-w-0 flex-1 px-1">
          <span
            aria-current="page"
            title={current}
            className="block truncate font-semibold tracking-tight text-foreground"
          >
            {number && (
              <span className="mr-1.5 font-mono text-[11px] font-semibold text-primary">
                #{number}
              </span>
            )}
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
