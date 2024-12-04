import ProblemBreadcrumbs from '@components/problem/ProblemBreadcrumbs';
import ProblemNavbar from '@components/problem/ProblemNavbar';
import { PROBLEM_HEADER_HEIGHT } from '../../constant/Size';

interface ProblemHeaderProps {
  problemTitle?: string;
}

export default function ProblemHeader({ problemTitle = '' }: ProblemHeaderProps) {
  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="flex items-center w-screen bg-gray-900"
    >
      <div className="flex">
        <ProblemBreadcrumbs
          pathList={[{ path: '문제', to: '/' }]}
          current={`${problemTitle}`}
        />
      </div>
      <ProblemNavbar />
    </header>
  );
}
