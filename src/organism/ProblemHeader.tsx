import ProblemBreadcrumbs from '../molecule/ProblemBreadcrumbs';
import ProblemNavbar from '../molecule/ProblemNavbar';

export default function ProblemHeader() {
  return (
    <header
      className="h-12 bg-gray-900 grid grid-cols-2 items-center"
    >
      <ProblemBreadcrumbs path={['문제']} current="문제이름" />
      <ProblemNavbar />
    </header>
  );
}
