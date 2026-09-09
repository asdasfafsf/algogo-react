import { isSameCalendarDay } from '../../domain/problems/problemDetail';
import type { CalendarDay } from '../../domain/problems/problemDetail';

type UpdateProblem = { updatedAt: string | Date; sourceUrl: string };

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
    if (!(await ports.confirm('문제를 업데이트 할까요?'))) return;
    if (
      isSameCalendarDay(ports.today(), ports.calendarDay(problem.updatedAt))
    ) {
      await ports.alert(
        '금일 해당 문제의 업데이트가 이미 수행되었습니다. 다음 날 다시 요청해주세요',
      );
      return;
    }
    ports.startLoading();
    const response = await ports.collect({ url: problem.sourceUrl });
    if (response.errorCode !== '0000') {
      await ports.alert(response.errorMessage);
      ports.endLoading();
      return;
    }
    ports.reload();
  } catch {
    await ports.alert('예외 오류가 발생하였습니다.');
    ports.endLoading();
  } finally {
    ports.endLoading();
  }
}
