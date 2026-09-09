export const getSubmissionUrl = (problem: {
  source: string;
  sourceId: string | number;
}) =>
  problem.source === "BOJ"
    ? `https://www.acmicpc.net/submit/${problem.sourceId}`
    : null;
