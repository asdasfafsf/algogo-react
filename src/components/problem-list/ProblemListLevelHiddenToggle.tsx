import { Eye, EyeOff, Tags } from "lucide-react";
import { useProblemTableFilterStore } from "@zustand/ProblemTableFilterStore";
import { Button } from "@components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { cn } from "@lib/utils";

export default function ProblemListLevelHiddenToggle() {
  const problemHidden = useProblemTableFilterStore(
    (state) => state.problemHidden,
  );
  const setProblemHidden = useProblemTableFilterStore(
    (state) => state.setProblemHidden,
  );

  const toggle = (column: "난이도" | "카테고리") => {
    setProblemHidden((previous) => ({
      ...previous,
      [column]: !previous[column],
    }));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "w-11 hover:border-foreground/30 hover:bg-accent/60 active:bg-accent",
              problemHidden["난이도"] && "bg-muted text-muted-foreground",
            )}
            onClick={() => toggle("난이도")}
            aria-pressed={problemHidden["난이도"]}
            aria-label={
              problemHidden["난이도"] ? "난이도 보기" : "난이도 숨기기"
            }
          >
            {problemHidden["난이도"] ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {problemHidden["난이도"] ? "난이도 보기" : "난이도 숨기기"}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "w-11 hover:border-foreground/30 hover:bg-accent/60 active:bg-accent",
              problemHidden["카테고리"] && "bg-muted text-muted-foreground",
            )}
            onClick={() => toggle("카테고리")}
            aria-pressed={problemHidden["카테고리"]}
            aria-label={
              problemHidden["카테고리"] ? "카테고리 보기" : "카테고리 숨기기"
            }
          >
            <Tags
              size={16}
              className={problemHidden["카테고리"] ? "opacity-50" : undefined}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {problemHidden["카테고리"] ? "카테고리 보기" : "카테고리 숨기기"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
