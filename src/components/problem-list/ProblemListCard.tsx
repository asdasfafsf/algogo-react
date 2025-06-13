import ProblemListCardHeader from './ProblemListCardHeader';
import ProblemListTable from './ProblemListTable';
import ProblemListCardFooter from './ProblemListCardFooter';

export default function ProblemListCard() {
  return (
    <div className="mb-16">
      <ProblemListCardHeader />
      <div className="border border-gray-300 rounded-lg">
        <ProblemListTable />
      </div>
      <ProblemListCardFooter />
    </div>
  );
}
