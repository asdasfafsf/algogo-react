import CodeEditor from "@components/problem/CodeEditor";
import CodeResultPannel from "@components/problem/CodeResultPannel";
import { useProblemWidthStore } from "@zustand/ProblemWidthStore";
import { useCodeEditorHeightStore } from "@zustand/CodeResultHeightStore";
import { useProblemScreenStore } from "@zustand/ProblemScreenStore";
import useMeStore from "@zustand/MeStore";
import { Button } from "@components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import { useScreenSize } from "../../context/ScreenSizeContext";
import ProblemSidebar from "./ProblemSidebar";
import ProblemSidebarSkeleton from "./ProblemSidebarSkeleton";
import Problem from "./Problem";
import { Problem as ProblemType } from "@/type/Problem.type";
import ProblemFooter from "./ProblemFooter";
import {
  createAuthDestination,
  createAuthRedirectPath,
} from "@/domain/account/authDestination";

interface ProblemSectionProps {
  problem: ProblemType | undefined;
}

interface LoginRequiredOverlayProps {
  destination: string;
  id: string;
}

export function LoginRequiredOverlay({
  destination,
  id,
}: LoginRequiredOverlayProps) {
  const titleId = id + "-title";
  const descriptionId = id + "-description";

  return (
    <aside
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="absolute inset-0 z-20 flex overflow-y-auto bg-background/70 p-4 backdrop-blur-sm"
    >
      <div className="m-auto w-full max-w-sm rounded-xl border border-border bg-card p-5 text-center shadow-lg sm:p-6">
        <h2 id={titleId} className="text-lg font-semibold text-card-foreground">
          로그인하고 문제를 풀어보세요
        </h2>
        <p
          id={descriptionId}
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
        >
          로그인하면 풀이를 작성하고 바로 실행할 수 있어요.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2" aria-label="인증 이동">
          <Button asChild variant="outline">
            <Link to={createAuthRedirectPath("/signup", destination)}>
              회원가입
            </Link>
          </Button>
          <Button asChild>
            <Link to={createAuthRedirectPath("/login", destination)}>
              로그인
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  const problemWidth = useProblemWidthStore((state) => state.problemWidth);
  const problemHeight = useCodeEditorHeightStore(
    (state) => state.codeEditorHeight,
  );
  const { isMobile } = useScreenSize();
  const selectedIndex = useProblemScreenStore((state) => state.selectedIndex);
  const location = useLocation();
  const me = useMeStore((state) => state.me);
  const [openSidebar, setOpenSidebar] = useState(true);
  const setProblemWidth = useProblemWidthStore(
    (state) => state.setProblemWidth,
  );

  const [prevProblemWidth, setPrevProblemWidth] = useState(problemWidth);
  const destination = createAuthDestination(
    location.pathname,
    location.search,
    location.hash,
  );

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

  const codeLoginOverlay = !me && (
    <LoginRequiredOverlay destination={destination} id="code-login" />
  );
  const resultLoginOverlay = !me && (
    <LoginRequiredOverlay destination={destination} id="result-login" />
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
              {codeLoginOverlay}
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
              {resultLoginOverlay}
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
            {codeLoginOverlay}
          </div>
        )}
      </div>
    </section>
  );
}
