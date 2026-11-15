import type { MathJax3Config } from "better-react-mathjax";

export const problemMathJaxConfig: MathJax3Config = {
  loader: { load: ["ui/safe"] },
  startup: { typeset: false },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  options: {
    safeOptions: {
      allow: { URLs: "safe", classes: "safe", cssIDs: "safe", styles: "safe" },
      safeProtocols: {
        http: true,
        https: true,
        file: false,
        javascript: false,
        data: false,
      },
    },
  },
};
