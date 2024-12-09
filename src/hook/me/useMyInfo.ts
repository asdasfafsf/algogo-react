import { useCallback, useState } from 'react';
import useMeStore from '@zustand/MeStore';
import useAlertModal from '@hook/useAlertModal';
import useConfirmModal from '@hook/useConfirmModal';

export default function useMyInfo() {
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const me = useMeStore((state) => state.me);

  const [isEditMode, setEditMode] = useState(false);
  const handleEditMode = useCallback(async () => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setEditMode((prev) => !prev);
  }, [setEditMode]);
  const handleSave = useCallback(async () => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const isOk = await confirm('적용하시겠습니까?');
    if (!isOk) {
      return;
    }

    console.log('save');
  }, []);

  const handleCancel = useCallback(() => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setEditMode((prev) => !prev);
  }, [setEditMode]);
  return {
    me,
    isEditMode,
    handleEditMode,
    handleSave,
    handleCancel,
  };
}
