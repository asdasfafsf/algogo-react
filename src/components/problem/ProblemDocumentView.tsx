import { MathJax } from "better-react-mathjax";
import type { ProblemDocument } from "@/domain/problems/problemDocument";
import ProblemDocumentNodes from "./ProblemDocumentNodes";
import ProblemInputOutputList from "./ProblemInputOutputList";

export default function ProblemDocumentView({
  document,
  scale = 1,
}: {
  document: ProblemDocument;
  scale?: number;
}) {
  return (
    <MathJax dynamic className="space-y-8" style={{ zoom: scale }}>
      {document.sections.map((section) =>
        section.kind === "sample" ? (
          <ProblemInputOutputList
            key={section.id}
            startIndex={section.order - 1}
            inputOutputList={[
              {
                order: section.order,
                input: section.input,
                output: section.output,
                content: "",
              },
            ]}
            renderExplanation={() =>
              section.explanation.length > 0 ? (
                <div className="problem-content">
                  <ProblemDocumentNodes nodes={section.explanation} />
                </div>
              ) : null
            }
          />
        ) : (
          <section key={section.id} className="min-w-0 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </h2>
            <div className="problem-content w-full overflow-x-auto">
              <ProblemDocumentNodes nodes={section.nodes} />
            </div>
          </section>
        ),
      )}
    </MathJax>
  );
}
