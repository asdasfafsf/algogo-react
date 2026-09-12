import { Button as ShadcnButton } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GripVertical } from "lucide-react";
import React from "react";
import { MathJaxContext } from "better-react-mathjax";

import useProblemSidebar from "../../hook/useProblemSidebar";
import { useScreenSize } from "../../context/ScreenSizeContext";

interface ProblemSidebarProps {
  children: React.ReactNode;
  open: boolean;
  handleClickOpen: () => void;
}

export function ProblemSidebar({
  children,
  open,
  handleClickOpen,
}: ProblemSidebarProps) {
  const {
    problemWidth,
    maxProblemWidth,
    isResizing,
    handlePointerDown,
    handleKeyDown,
  } = useProblemSidebar();
  const { isMobile } = useScreenSize();

  return (
    <MathJaxContext
      version={3}
      config={{
        startup: { typeset: false },
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      }}
    >
      <aside
        style={
          isMobile
            ? { height: "calc(100vh - 96px)" }
            : {
                height: "100%",
                width: `${problemWidth}px`,
                gridRow: "span 2",
                gridColumn: 1,
              }
        }
        className="relative flex w-full border-r border-border bg-background"
      >
        {children}
        <div className="group relative h-full w-0 shrink-0">
          {!isMobile && open && (
            <Separator
              decorative={false}
              orientation="vertical"
              aria-label="문제와 코드 패널 크기 조절"
              aria-valuemin={100}
              aria-valuemax={maxProblemWidth}
              aria-valuenow={problemWidth}
              aria-valuetext={`문제 패널 너비 ${problemWidth}px`}
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
              className={`group/resizer absolute -right-2.5 z-30 h-full w-5 touch-none cursor-col-resize bg-transparent outline-none before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 before:transition-colors hover:before:bg-primary focus-visible:before:bg-primary focus-visible:ring-2 focus-visible:ring-ring active:before:bg-primary ${
                isResizing ? "before:bg-primary" : "before:bg-border"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-[calc(50%-44px)] flex size-5 -translate-x-1/2 items-center justify-center rounded-full border shadow-sm transition-colors group-hover/resizer:border-primary/60 group-hover/resizer:text-primary group-focus-visible/resizer:border-primary group-focus-visible/resizer:text-primary ${
                  isResizing
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                <GripVertical className="size-3" />
              </span>
            </Separator>
          )}
          <div className="absolute top-1/2 -right-4 z-30 -translate-y-1/2">
            <ShadcnButton
              variant="ghost"
              size="sm"
              type="button"
              aria-label={open ? "문제 접기" : "문제 펼치기"}
              onClick={handleClickOpen}
              className="rounded-full border border-border bg-background p-1.5 text-foreground shadow-sm hover:bg-muted"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path d="M15 19l-7-7 7-7" />
                ) : (
                  <path d="M9 5l7 7-7 7" />
                )}
              </svg>
            </ShadcnButton>
          </div>
        </div>
      </aside>
    </MathJaxContext>
  );
}

export default React.memo(ProblemSidebar);
