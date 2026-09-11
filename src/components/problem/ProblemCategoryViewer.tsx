import { Button } from "@/components/ui/button";
import { ProblemCategoryChip } from "@components/Chip/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProblemCategoryViewer from "@hook/useProblemCategoryViewer";
import { Tag } from "lucide-react";
import React from "react";

interface ProblemCategoryProps {
  initialState: ProblemCategoryState;
  categoryList: string[];
}

export function ProblemCategoryViewer({
  initialState = "hide",
  categoryList,
}: ProblemCategoryProps) {
  const [categoryState, tooltipContent, handleClick] =
    useProblemCategoryViewer(initialState);

  if (categoryList.length === 0) {
    return (
      <section className="space-y-2">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          <Tag className="size-3.5 shrink-0" aria-hidden="true" />
          <span>태그</span>
        </h2>
        <p className="text-sm text-muted-foreground">등록된 태그가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
        <Tag className="size-3.5 shrink-0" aria-hidden="true" />
        <span>태그</span>
      </h2>
      <div>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={handleClick}
                aria-label={tooltipContent}
                className="h-auto cursor-pointer p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex flex-wrap gap-2">
                  {categoryState === "hide" ? (
                    <ProblemCategoryChip category="알고리즘 유형 숨김" />
                  ) : (
                    categoryList.map((category) => (
                      <ProblemCategoryChip key={category} category={category} />
                    ))
                  )}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
}

export default React.memo(ProblemCategoryViewer);
