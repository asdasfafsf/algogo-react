import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import ProblemBreadcrumbs from '../molecule/ProblemBreadcrumbs';
import ProblemNavbar from '../molecule/ProblemNavbar';

export default function ProblemHeader() {
  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="flex bg-gray-900 items-center w-screen"
    >
      <div className="flex">
        <ProblemBreadcrumbs pathList={[{ path: '문제', to: '/' }]} current="문제이름이 존나길면 어떻게 됩니까????????????????" />
      </div>
      <ProblemNavbar />
    </header>
  );
}
