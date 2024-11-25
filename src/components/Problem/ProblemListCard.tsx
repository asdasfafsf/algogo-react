import { Card } from '@components/Card/index';
import useProblemListStore from '@zustand/ProblemListStore';
import ProblemListCardHeader from './ProblemListCardHeader';
import ProblemListTable from './ProblemListTable';
import ProblemListCardFooter from './ProblemListCardFooter';
import ProblemListTableSkeleton from './ProblemListTableSkeleton';

export default function ProblemListCard() {
  const isFetching = useProblemListStore((state) => state.isFetching);
  return (
    <Card className="p-0">
      <ProblemListCardHeader />
      <ProblemListTable />
      {/* {isFetching ? <ProblemListTableSkeleton /> : <ProblemListTable /> } */}
      <ProblemListCardFooter />
    </Card>
  );
}
