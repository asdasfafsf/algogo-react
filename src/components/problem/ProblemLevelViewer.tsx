import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProblemLevelViewer from "@hook/useProblemLevelViewer";
import React from "react";
import { ProblemLevelChip } from "../Chip";

interface ProblemLevelViewerProps {
  intialState: ProblemCategoryState;
  level: ProblemLevel;
}

function ProblemLevelViewer({ intialState, level }: ProblemLevelViewerProps) {
  const [levelState, tooltipContent, handleClick] =
    useProblemLevelViewer(intialState);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            aria-label={tooltipContent}
            className="mr-1 flex flex-wrap items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="whitespace-nowrap text-sm font-bold leading-snug">
              난이도 :
            </span>
            <span className="ml-1">
              {levelState === "hide" ? (
                <ProblemLevelChip level="숨김" />
              ) : (
                <ProblemLevelChip level={level} />
              )}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default React.memo(ProblemLevelViewer);
