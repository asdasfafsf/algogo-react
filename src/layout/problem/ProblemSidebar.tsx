import { Button as ShadcnButton } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  const { problemWidth, maxProblemWidth, handlePointerDown, handleKeyDown } =
    useProblemSidebar();
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
        className="relative z-10 flex w-full border-r border-border bg-background"
      >
        {children}
        <div className="group relative">
          <Separator
            decorative={false}
            orientation="vertical"
            aria-label="문제와 코드 패널 크기 조절"
            aria-valuemin={100}
            aria-valuemax={maxProblemWidth}
            aria-valuenow={open ? problemWidth : undefined}
            aria-valuetext={
              open ? `문제 패널 너비 ${problemWidth}px` : undefined
            }
            tabIndex={open ? 0 : -1}
            onPointerDown={open ? handlePointerDown : undefined}
            onKeyDown={open ? handleKeyDown : undefined}
            className="absolute -right-2.5 z-10 h-full w-5 touch-none cursor-col-resize bg-transparent outline-none focus-visible:bg-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div
            className={`absolute top-1/2 -right-4 z-20 -translate-y-1/2 transition-opacity ${
              open
                ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 [@media(hover:none)]:opacity-100"
                : "opacity-100"
            }`}
          >
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
