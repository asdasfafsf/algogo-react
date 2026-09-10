import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProblemContentSizeStore } from "@zustand/ProblemContentSizeStore";
export default function ProblemContentResizer() {
  const setSize = useProblemContentSizeStore((s) => s.setSize);
  const size = useProblemContentSizeStore((s) => s.size);
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        aria-label="문제 글자 축소"
        disabled={size <= 100}
        onClick={() =>
          setSize((prev) => Math.max(prev - 10, 100) as ProblemContentSize)
        }
      >
        <Minus className="size-3.5" />
      </Button>
      <span
        className="min-w-10 text-center text-xs tabular-nums"
        aria-live="polite"
      >
        {size}%
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        aria-label="문제 글자 확대"
        disabled={size >= 200}
        onClick={() =>
          setSize((prev) => Math.min(prev + 10, 200) as ProblemContentSize)
        }
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
}
