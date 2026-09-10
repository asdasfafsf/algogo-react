import CodeEditor from "@components/problem/CodeEditor";
import CodeResultPannel from "@components/problem/CodeResultPannel";
import { useProblemWidthStore } from "@zustand/ProblemWidthStore";
import { useCodeEditorHeightStore } from "@zustand/CodeResultHeightStore";
import { useProblemScreenStore } from "@zustand/ProblemScreenStore";
import useMeStore from "@zustand/MeStore";
import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useScreenSize } from "../../context/ScreenSizeContext";
import ProblemSidebar from "./ProblemSidebar";
import ProblemSidebarSkeleton from "./ProblemSidebarSkeleton";
import Problem from "./Problem";
import { Problem as ProblemType } from "@/type/Problem.type";
import ProblemFooter from "./ProblemFooter";
import { LockKeyhole } from "lucide-react";

interface ProblemSectionProps {
  problem: ProblemType | undefined;
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  const problemWidth = useProblemWidthStore((state) => state.problemWidth);
  const problemHeight = useCodeEditorHeightStore(
    (state) => state.codeEditorHeight,
  );
  const { isMobile } = useScreenSize();
  const selectedIndex = useProblemScreenStore((state) => state.selectedIndex);
  const navigate = useNavigate();
  const me = useMeStore((state) => state.me);
  const [openSidebar, setOpenSidebar] = useState(true);
  const setProblemWidth = useProblemWidthStore(
    (state) => state.setProblemWidth,
  );

  const [prevProblemWidth, setPrevProblemWidth] = useState(problemWidth);

  const handleClickOpen = useCallback(() => {
    setOpenSidebar((prev) => !prev);
    if (openSidebar) {
      setPrevProblemWidth(problemWidth);
      setProblemWidth(0);
    } else {
      setProblemWidth(prevProblemWidth);
    }
  }, [openSidebar, prevProblemWidth, problemWidth, setProblemWidth]);

  const workspace = (
    <>
      <div
        className="relative min-h-0 shrink-0"
        style={{ height: `${problemHeight}px` }}
      >
        <CodeEditor />
      </div>
      <div className="min-h-0 flex-1">
        <CodeResultPannel />
      </div>
    </>
  );

  const loginOverlay = !me && (
    <div className="absolute inset-0 z-20 grid place-items-center bg-background/80 p-5 backdrop-blur-sm">
      <div className="max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
          <LockKeyhole className="size-5" />
        </div>
        <h2 className="text-lg font-semibold">로그인하고 코드를 실행하세요</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          로그인하면 코드 작성, 테스트 실행과 제출 기능을 사용할 수 있습니다.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button
            variant="outlined"
            color="gray"
            onClick={() =>
              navigate(`/signup?destination=${window.location.pathname}`)
            }
          >
            회원가입
          </Button>
          <Button
            color="blue"
            onClick={() =>
              navigate(`/login?destination=${window.location.pathname}`)
            }
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      aria-label="문제 풀이 작업 공간"
      className="relative flex h-full min-h-0 flex-col overflow-hidden"
    >
      {isMobile && <ProblemFooter />}
      <div
        className="transition-left relative m-0 flex min-h-0 flex-1 gap-0 p-0"
        style={
          isMobile
            ? {
                width: "300vw",
                left: `-${100 * selectedIndex}%`,
              }
            : {
                width: "100vw",
              }
        }
      >
        <div
          inert={isMobile && selectedIndex !== 0}
          style={
            isMobile
              ? {}
              : {
                  width: `${problemWidth}px`,
                }
          }
          className="relative h-full w-screen shrink-0"
        >
          {problem ? (
            <ProblemSidebar
              open={openSidebar}
              handleClickOpen={handleClickOpen}
            >
              <Problem problem={problem} />
            </ProblemSidebar>
          ) : (
            <ProblemSidebarSkeleton />
          )}
        </div>

        {isMobile ? (
          <>
            <div
              inert={selectedIndex !== 1}
              style={
                isMobile
                  ? {
                      width: "100vw",
                      height: "100%",
                    }
                  : {
                      height: `${problemHeight}px`,
                    }
              }
              className="relative flex w-full shrink-0 flex-col"
            >
              <div inert={!me} className="h-full">
                <CodeEditor />
              </div>
              {loginOverlay}
            </div>
            <div
              inert={selectedIndex !== 2}
              style={{
                width: "100vw",
                height: "100%",
              }}
              className="relative w-full shrink-0"
            >
              <div inert={!me} className="h-full">
                <CodeResultPannel />
              </div>
              {loginOverlay}
            </div>
          </>
        ) : (
          <div
            className="relative h-full"
            style={
              isMobile
                ? {
                    width: "100vw",
                    height: "calc(100vh - 96px)",
                  }
                : {
                    width: `calc(100vw - ${problemWidth}px)`,
                  }
            }
          >
            <div inert={!me} className="flex h-full min-h-0 flex-col">
              {workspace}
            </div>
            {loginOverlay}
          </div>
        )}
      </div>
    </section>
  );
}
