import { badgeVariants } from "@components/ui/badge";
import { cn } from "@lib/utils";
import { getProblemCategoryBadgeColor } from "@/lib/problem-category-colors";

interface ProblemCategoryChipProps {
  category: ProblemCategory;
  className?: string;
}

export default function ProblemCategoryChip({
  category,
  className,
}: ProblemCategoryChipProps) {
  const isMasked = category === "알고리즘 유형 숨김";
  const isUnknown = category === "알 수 없음";

  return (
    <span
      className={cn(
        badgeVariants({ variant: "secondary" }),
        "rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-none whitespace-nowrap",
        isMasked || isUnknown
          ? "border-border bg-muted text-muted-foreground hover:bg-muted/80"
          : getProblemCategoryBadgeColor(category),
        className,
      )}
    >
      {isMasked ? "가려짐" : category}
    </span>
  );
}

interface ProblemCategoryBadgeListProps {
  categories: readonly ProblemCategory[];
  className?: string;
}

export function ProblemCategoryBadgeList({
  categories,
  className,
}: ProblemCategoryBadgeListProps) {
  if (categories.length === 0) return null;

  const [primary, ...rest] = categories;

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <ProblemCategoryChip category={primary} />
      {rest.length > 0 && (
        <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          +{rest.length}
        </span>
      )}
    </span>
  );
}
