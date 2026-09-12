import { StrictMode, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ProblemSidebar from "@layout/problem/ProblemSidebar";
import { LoginRequiredOverlay } from "@layout/problem/ProblemSection";
import ThemeToggle from "@/components/ThemeToggle";
import { ScreenSizeProvider } from "@/context/ScreenSizeContext";
import { useProblemWidthStore } from "@zustand/ProblemWidthStore";
import "../../src/index.css";

function ProblemSidebarResizerFixture() {
  const problemWidth = useProblemWidthStore((state) => state.problemWidth);
  const setProblemWidth = useProblemWidthStore(
    (state) => state.setProblemWidth,
  );
  const [open, setOpen] = useState(true);
  const [previousWidth, setPreviousWidth] = useState(problemWidth);

  const handleClickOpen = useCallback(() => {
    if (open) {
      setPreviousWidth(problemWidth);
      setProblemWidth(0);
    } else {
      setProblemWidth(previousWidth);
    }

    setOpen((currentOpen) => !currentOpen);
  }, [open, previousWidth, problemWidth, setProblemWidth]);

  return (
    <main className="min-h-dvh bg-background p-8 text-foreground">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">
              문제 패널 리사이저 fixture
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              오른쪽 로그인 오버레이에서도 세로 손잡이, 키보드 조절, 접기와
              펼치기 동작을 확인합니다.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex h-[600px] overflow-hidden rounded-lg border border-border">
          <div
            className="relative h-full shrink-0"
            style={{ width: `${problemWidth}px` }}
          >
            <ProblemSidebar open={open} handleClickOpen={handleClickOpen}>
              <section
                className="w-full overflow-y-auto p-6"
                aria-label="문제 패널"
              >
                <h2 className="text-lg font-semibold">샘플 문제</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  경계선과 손잡이가 코드 패널과의 경계를 항상 보여 줍니다.
                </p>
              </section>
            </ProblemSidebar>
          </div>
          <section
            className="relative min-w-0 flex-1 bg-muted/20 p-6"
            aria-label="코드 패널"
          >
            <h2 className="text-lg font-semibold">코드 패널</h2>
            <LoginRequiredOverlay
              destination="/problem/fixture-sidebar-resizer"
              id="fixture-code-login"
            />
          </section>
        </div>

        <output aria-live="polite">문제 패널 너비: {problemWidth}px</output>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/problem/fixture-sidebar-resizer"]}>
      <ScreenSizeProvider>
        <ProblemSidebarResizerFixture />
      </ScreenSizeProvider>
    </MemoryRouter>
  </StrictMode>,
);
