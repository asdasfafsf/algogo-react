import React from "react";

function ProblemSource() {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        출처
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        출처 정보가 없습니다.
      </p>
    </section>
  );
}

export default React.memo(ProblemSource);
