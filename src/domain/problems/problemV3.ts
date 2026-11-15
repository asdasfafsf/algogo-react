import type { Problem } from "@/type/Problem.type";
import { isProblemDocument } from "./problemDocument";

export type ProblemV3 = Omit<
  Problem,
  | "content"
  | "input"
  | "output"
  | "limit"
  | "hint"
  | "subTask"
  | "protocol"
  | "etc"
  | "style"
  | "subTaskList"
  | "inputOutputList"
  | "customExample"
  | "customImplementation"
  | "customGrader"
  | "customNotes"
  | "customAttachment"
  | "customSample"
  | "problemSource"
  | "document"
> & { document: unknown; collectedAt: string };

export function toProblemView(problem: ProblemV3): Problem {
  if (!isProblemDocument(problem.document))
    throw new Error("지원하지 않는 문제 문서 형식입니다.");
  return {
    ...problem,
    document: problem.document,
    content: "",
    style: "",
    subTaskList: [],
    customExample: "",
    customImplementation: "",
    customGrader: "",
    customNotes: "",
    customAttachment: "",
    customSample: "",
    problemSource: "",
    inputOutputList: problem.document.sections.flatMap((section) =>
      section.kind === "sample"
        ? [
            {
              order: section.order,
              input: section.input,
              output: section.output,
              content: "",
            },
          ]
        : [],
    ),
  };
}
