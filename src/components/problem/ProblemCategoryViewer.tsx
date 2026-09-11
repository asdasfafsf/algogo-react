import { Button } from "@/components/ui/button";
import { ProblemCategoryChip } from "@components/Chip/index";
import { Tooltip } from "@components/common/index";
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

  return (
    <section className="space-y-2">
      <h2 className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        <Tag className="size-3.5" />
        태그
      </h2>
      <div>
        <Tooltip content={tooltipContent} placement="top-start">
          <Button
            variant="ghost"
            onClick={handleClick}
            className="h-auto cursor-pointer p-0 hover:bg-transparent"
          >
            <span className="flex flex-wrap gap-2">
              {categoryState === "hide" ? (
                <ProblemCategoryChip category="알고리즘 유형 숨김" />
              ) : categoryState === "none" ? (
                <ProblemCategoryChip category="알 수 없음" />
              ) : (
                categoryList.map((category) => (
                  <ProblemCategoryChip key={category} category={category} />
                ))
              )}
            </span>
          </Button>
        </Tooltip>
      </div>
    </section>
  );
}

export default React.memo(ProblemCategoryViewer);
