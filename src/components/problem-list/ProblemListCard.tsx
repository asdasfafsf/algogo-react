import { Card } from "@/components/ui/card";
import ProblemListCardHeader from "./ProblemListCardHeader";
import ProblemListTable from "./ProblemListTable";
import ProblemListCardFooter from "./ProblemListCardFooter";

export default function ProblemListCard() {
  return (
    <div className="mb-16">
      <ProblemListCardHeader />
      <Card className="block gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        <ProblemListTable />
      </Card>
      <ProblemListCardFooter />
    </div>
  );
}
