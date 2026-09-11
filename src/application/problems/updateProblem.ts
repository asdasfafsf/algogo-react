import { isSameCalendarDay } from "../../domain/problems/problemDetail";
import type { CalendarDay } from "../../domain/problems/problemDetail";

type UpdateProblem = { updatedAt: string | Date; sourceUrl: string };

export const problemUpdateFailureMessage =
  "문제를 업데이트하지 못했습니다. 잠시 후 다시 시도해 주세요.";

type UpdateProblemPorts = {
  confirm: (message: string) => Promise<unknown>;
  alert: (message: string) => Promise<unknown>;
  today: () => CalendarDay;
  calendarDay: (value: string | Date) => CalendarDay;
  collect: (request: {
    url: string;
  }) => Promise<{ errorCode: string; errorMessage: string }>;
  startLoading: () => void;
  endLoading: () => void;
  reload: () => void;
};

export async function updateProblem(
  problem: UpdateProblem | undefined,
  ports: UpdateProblemPorts,
) {
  if (!problem) return;

  try {
    if (!(await ports.confirm("문제를 업데이트 할까요?"))) return;
    if (
      isSameCalendarDay(ports.today(), ports.calendarDay(problem.updatedAt))
    ) {
      await ports.alert(
        "금일 해당 문제의 업데이트가 이미 수행되었습니다. 다음 날 다시 요청해주세요",
      );
      return;
    }
  } catch {
    await ports.alert(problemUpdateFailureMessage);
    return;
  }

  ports.startLoading();
  try {
    const response = await ports.collect({ url: problem.sourceUrl });
    if (response.errorCode !== "0000") {
      await ports.alert(problemUpdateFailureMessage);
      return;
    }
    ports.reload();
  } catch {
    await ports.alert(problemUpdateFailureMessage);
  } finally {
    ports.endLoading();
  }
}
