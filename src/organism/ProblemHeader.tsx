import ProblemBreadcrumbs from '../molecule/ProblemBreadcrumbs';

export default function ProblemHeader() {
  return (
    <header className="h-12 bg-gray-900 grid col-start-1 col-end-1 row-start-1 row-end-2">
      <div className="flex w-full h-full items-center">
        <ProblemBreadcrumbs path={['문제']} current="문제이름" />
        <div />
      </div>
    </header>
  );
}
