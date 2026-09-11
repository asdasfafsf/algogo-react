import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProblemCategoryViewer from "@components/problem/ProblemCategoryViewer";
import ProblemSource from "@components/problem/ProblemSource";
import ProblemTabsList from "@components/problem/ProblemTabsList";
import { Tabs } from "@components/ui/tabs";
import "../../src/index.css";

function ProblemDetailEmptyStatesFixture() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-3xl content-start gap-8 px-5 py-8 sm:px-8">
      <div>
        <h1 className="text-xl font-semibold">문제 상세 상태 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          준비 중인 탭과 태그·출처의 데이터 유무를 확인합니다.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border bg-card">
        <h2 className="sr-only">문제 탭</h2>
        <Tabs defaultValue="description">
          <ProblemTabsList />
        </Tabs>
      </section>

      <div className="grid gap-5 sm:grid-cols-2">
        <section className="space-y-6 rounded-xl border bg-card p-5">
          <h2 className="text-base font-semibold">정보가 있는 문제</h2>
          <ProblemCategoryViewer
            initialState="hide"
            categoryList={["수학", "구현"]}
          />
        </section>

        <section className="space-y-6 rounded-xl border bg-card p-5">
          <h2 className="text-base font-semibold">정보가 없는 문제</h2>
          <ProblemCategoryViewer initialState="none" categoryList={[]} />
          <ProblemSource />
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProblemDetailEmptyStatesFixture />
  </StrictMode>,
);
