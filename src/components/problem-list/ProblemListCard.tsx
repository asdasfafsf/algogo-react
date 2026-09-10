import ProblemListCardHeader from "./ProblemListCardHeader";
import ProblemListTable from "./ProblemListTable";
import ProblemListCardFooter from "./ProblemListCardFooter";

export default function ProblemListCard() {
  return (
    <section className="mb-16 space-y-4">
      <ProblemListCardHeader />
      <div className="block overflow-hidden rounded-lg border border-border/60">
        <ProblemListTable />
      </div>
      <ProblemListCardFooter />
    </section>
  );
}
