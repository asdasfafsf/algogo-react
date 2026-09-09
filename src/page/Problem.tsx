import { PROBLEM_HEADER_HEIGHT } from "@constant/Size";
import ProblemSection from "@layout/problem/ProblemSection";
import ProblemHeader from "@layout/problem/ProblemHeader";
import ProblemFooter from "@layout/problem/ProblemFooter";
import useProblemPage from "@hook/problem/useProblemPage";

export default function ProblemPage() {
  const { problem } = useProblemPage();

  return (
    <>
      {problem?.style && <style>{problem.style}</style>}
      <div className="h-screen overflow-x-hidden">
        <ProblemHeader problem={problem} />
        <div
          className="relative w-screen overflow-x-hidden"
          style={{
            height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_HEADER_HEIGHT}px)`,
          }}
        >
          <ProblemSection problem={problem} />
        </div>
        <ProblemFooter />
      </div>
    </>
  );
}
