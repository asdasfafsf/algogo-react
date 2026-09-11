import React from "react";
import { Link2 } from "lucide-react";

function ProblemSource() {
  return (
    <section className="space-y-2">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
        <Link2 className="size-3.5 shrink-0" aria-hidden="true" />
        <span>출처</span>
      </h2>
      <p className="text-sm text-muted-foreground">등록된 출처가 없습니다.</p>
    </section>
  );
}

export default React.memo(ProblemSource);
