import { Card } from '@components/Card/index';
import ProblemListCardHeader from './ProblemListCardHeader';
import ProblemListTable from './ProblemListTable';
import ProblemListCardFooter from './ProblemListCardFooter';

export default function ProblemListCard() {
  return (
    <Card className="p-0">
      <ProblemListCardHeader />
      <ProblemListTable />
      <ProblemListCardFooter />
    </Card>
  );
}
