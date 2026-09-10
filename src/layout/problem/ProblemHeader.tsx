import ProblemBreadcrumbs from "@components/problem/ProblemBreadcrumbs";
import ProblemNavbar from "@components/problem/ProblemNavbar";
import { PROBLEM_HEADER_HEIGHT } from "../../constant/Size";
import { Problem } from "@/type/Problem.type";

interface ProblemHeaderProps {
  problem?: Problem;
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="dark flex items-center w-full min-w-0 border-b border-white/10 bg-gray-900"
    >
      <div className="min-w-0 flex-1">
        <ProblemBreadcrumbs
          pathList={[{ path: "문제", to: "/" }]}
          current={`${problem?.title ?? "불러오는 중"}`}
        />
      </div>
      <ProblemNavbar problem={problem} />
    </header>
  );
}
