import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProblemBreadCrumbsProps = {
  pathList: { to: string; path: string }[];
  current: string;
};

export default function ProblemBreadcrumbs({
  pathList,
  current,
}: ProblemBreadCrumbsProps) {
  return (
    <nav aria-label="문제 경로" className="min-w-0 px-3 text-sm text-white">
      <ol className="flex min-w-0 items-center gap-1">
        <li className="shrink-0">
          <Button asChild variant="ghost" size="icon" className="size-8">
            <a href="/" aria-label="홈">
              <Home />
            </a>
          </Button>
        </li>
        {pathList.map(({ path, to }) => (
          <li key={path} className="hidden shrink-0 items-center gap-1 sm:flex">
            <ChevronRight className="size-3 text-gray-500" />
            <a href={to} className="text-gray-400 hover:text-white">
              {path}
            </a>
          </li>
        ))}
        <li className="flex min-w-0 items-center gap-1">
          <ChevronRight className="size-3 shrink-0 text-gray-500" />
          <span
            aria-current="page"
            title={current}
            className="truncate font-semibold"
          >
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
