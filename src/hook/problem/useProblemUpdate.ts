import { useCallback } from 'react';
import { collectProblem } from '@api/problems';
import useConfirmModal from '@hook/useConfirmModal';
import useAlertModal from '@hook/useAlertModal';
import useLoadingModal from '@hook/modal/useLoadingModal';
import { updateProblem } from '@/application/problems/updateProblem';
import type { Problem } from '@/type/Problem.type';

function toCalendarDay(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
}

export default function useProblemUpdate(problem?: Problem) {
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const { startLoading, endLoading } = useLoadingModal();
  return useCallback(
    () =>
      updateProblem(problem, {
        confirm,
        alert,
        startLoading,
        endLoading,
        collect: collectProblem,
        today: () => toCalendarDay(new Date()),
        calendarDay: value => toCalendarDay(new Date(value)),
        reload: () => window.location.reload(),
      }),
    [problem, confirm, alert, startLoading, endLoading],
  );
}
