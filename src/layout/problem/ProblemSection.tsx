import CodeEditor from "@components/problem/CodeEditor";
import CodeResultPannel from "@components/problem/CodeResultPannel";
import { useProblemWidthStore } from "@zustand/ProblemWidthStore";
import { useCodeEditorHeightStore } from "@zustand/CodeResultHeightStore";
import { useProblemScreenStore } from "@zustand/ProblemScreenStore";
import useMeStore from "@zustand/MeStore";
import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  PROBLEM_FOOTER_HEIGHT,
  PROBLEM_HEADER_HEIGHT,
} from "../../constant/Size";
import { useScreenSize } from "../../context/ScreenSizeContext";
import ProblemSidebar from "./ProblemSidebar";
import ProblemSidebarSkeleton from "./ProblemSidebarSkeleton";
import Problem from "./Problem";
import { Problem as ProblemType } from "@/type/Problem.type";

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

  return (
    <section
      className="transition-left overflow-x-hidden gap-0 m-0 p-0 h-full relative"
      style={
        isMobile
          ? {
              display: "flex",
              width: "300vw",
              left: `-${100 * selectedIndex}%`,
            }
          : {
              display: "flex",
              width: "100vw",
              height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
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
                height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
              }
        }
        className="relative w-screen h-full shrink-0"
      >
        {problem ? (
          <ProblemSidebar open={openSidebar} handleClickOpen={handleClickOpen}>
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
                    height: "calc(100vh - 96px)",
                  }
                : {
                    height: `${problemHeight}px`,
                  }
            }
            className="relative w-full shrink-0"
          >
            <CodeEditor />
          </div>
          <div
            inert={selectedIndex !== 2}
            style={{
              width: "100vw",
              height: "calc(100vh - 96px)",
            }}
            className="relative w-full shrink-0"
          >
            <CodeResultPannel />
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
          {!me && (
            <div className="absolute z-20 w-full h-full gap-2 cursor-not-allowed bg-black/70">
              <div className="flex items-center justify-center w-full h-full gap-2">
                <Button
                  onClick={() => {
                    navigate(`/login?destination=${window.location.pathname}`);
                  }}
                  color="blue"
                >
                  로그인
                </Button>
                <Button
                  onClick={() => {
                    navigate(`/signup?destination=${window.location.pathname}`);
                  }}
                  color="blue"
                >
                  회원가입
                </Button>
              </div>
            </div>
          )}

          <div
            style={{
              height: `${problemHeight}px`,
            }}
            className="relative w-full shrink-0"
          >
            <CodeEditor />
          </div>
          <div
            style={
              isMobile
                ? {
                    width: "100vw",
                    height: "calc(100vh - 96px)",
                  }
                : {
                    gridRow: 2,
                    gridColumn: 2,
                    height: `calc(100vh - ${
                      problemHeight +
                      PROBLEM_HEADER_HEIGHT +
                      PROBLEM_FOOTER_HEIGHT
                    }px)`,
                  }
            }
            className="relative w-full shrink-0"
          >
            <CodeResultPannel />
          </div>
        </div>
      )}
    </section>
  );
}
