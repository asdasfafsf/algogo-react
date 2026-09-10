import ProblemBreadcrumbs from "@components/problem/ProblemBreadcrumbs";
import ProblemNavbar from "@components/problem/ProblemNavbar";
import { PROBLEM_HEADER_HEIGHT } from "../../constant/Size";
import { Problem } from "@/type/Problem.type";
import ThemeToggle from "@components/ThemeToggle";

interface ProblemHeaderProps {
  problem?: Problem;
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="dark flex w-full min-w-0 items-center border-b border-white/10 bg-[#090b12]"
    >
      <div className="min-w-0 flex-1">
        <ProblemBreadcrumbs
          pathList={[{ path: "문제", to: "/" }]}
          current={`${problem?.title ?? "불러오는 중"}`}
        />
      </div>
      <ThemeToggle />
      <ProblemNavbar problem={problem} />
    </header>
  );
}
