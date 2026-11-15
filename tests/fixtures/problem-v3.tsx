import { problemMathJaxConfig } from "../../src/components/problem/problemMathJaxConfig";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MathJaxContext } from "better-react-mathjax";
import ProblemDocumentView from "../../src/components/problem/ProblemDocumentView";
import { isProblemDocument } from "../../src/domain/problems/problemDocument";
import fixture from "./problem-v3.json";
import "../../src/index.css";

if (!isProblemDocument(fixture)) throw new Error("Invalid fixture");
const document = fixture;
function Fixture() {
  const [revision, setRevision] = useState(0);
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <h1>v3 문제 문서 검증</h1>
      <button type="button" onClick={() => setRevision((value) => value + 1)}>
        문서 다시 렌더링 {revision}
      </button>
      <MathJaxContext version={3} config={problemMathJaxConfig}>
        <ProblemDocumentView key={revision} document={document} />
      </MathJaxContext>
    </main>
  );
}
createRoot(window.document.getElementById("root")!).render(<Fixture />);
