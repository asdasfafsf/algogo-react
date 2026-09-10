import ProblemListCardHeader from "./ProblemListCardHeader";
import ProblemListTable from "./ProblemListTable";
import ProblemListCardFooter from "./ProblemListCardFooter";

export default function ProblemListCard() {
  return (
    <div className="mb-16">
      <ProblemListCardHeader />
      <div className="block overflow-hidden border-y border-border">
        <ProblemListTable />
      </div>
      <ProblemListCardFooter />
    </div>
  );
}
