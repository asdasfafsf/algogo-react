export type EditorExecutionSource = {
  code: string;
  language: Language;
};

export const emptyExecutionResult = (): ResponseExecuteResult => ({
  seq: 0,
  processTime: 0,
  memory: 0,
  code: "",
  result: "",
  detail: "",
});

export const buildExecutionRequest = (
  source: EditorExecutionSource,
  inputs: readonly string[],
): RequestExecuteList => ({
  code: source.code,
  provider: source.language,
  inputList: inputs.map((input, seq) => ({ seq, input })),
});
