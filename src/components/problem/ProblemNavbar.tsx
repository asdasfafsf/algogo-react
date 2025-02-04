import { ArrowPathIcon, Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import useModal from '@plugins/modal/useModal';
import { IconButton } from '@components/Button/index';
import { useCallback } from 'react';
import useConfirmModal from '@hook/useConfirmModal';
import { collectProblem } from '@api/problems';
import useAlertModal from '@hook/useAlertModal';
import useLoadingModal from '@hook/modal/useLoadingModal';
import CodeEditorSettingsModal from './CodeEditorSettingsModal';
import CompilerInfoModal from './CompilerInfoModal';

interface ProblemNavbarProps {
  problem: ResponseProblem;
}
export default function ProblemNavbar({ problem }: ProblemNavbarProps) {
  const modal = useModal();
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const { startLoading, endLoading } = useLoadingModal();

  const handleClickUpdate = useCallback(async () => {
    try {
      const isOk = await confirm('문제를 업데이트 할까요?');

      if (!isOk) {
        return;
      }

      const today = new Date();
      const updatedAt = new Date(problem.updatedAt);

      if (today.getFullYear() === updatedAt.getFullYear()
          && today.getMonth() === updatedAt.getMonth()
          && today.getDate() === updatedAt.getDate()) {
        await alert('금일 해당 문제의 업데이트가 이미 수행되었습니다. 다음 날 다시 요청해주세요');
        return;
      }

      startLoading();

      const response = await collectProblem({ url: problem.sourceUrl });

      if (response.errorCode !== '0000') {
        await alert(response.errorMessage);
        endLoading();
        return;
      }

      window.location.reload();
    } catch (e) {
      await alert('예외 오류가 발생하였습니다.');
      endLoading();
    } finally {
      endLoading();
    }
  }, [problem]);

  return (
    <nav className="flex w-full">
      <div className="flex items-center justify-end w-full h-full gap-1 p-0 px-4 text-white">

        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            onClick={handleClickUpdate}
            className="w-10 h-10 text-white bg-gray-900"
          >
            <ArrowPathIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>
        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            className="w-10 h-10 text-white bg-gray-900"
            onClick={() => {
              modal.push('CompilerInfo', CompilerInfoModal, {});
            }}
          >
            <DocumentTextIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>

        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            // ripple
            className="w-10 h-10 text-white bg-gray-900"
            onClick={async () => {
              modal.push('CODE_EDITOR_SETTINGS', CodeEditorSettingsModal, {});
            }}
          >
            <Cog6ToothIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
