import { useCallback, useState } from 'react';
import useMeStore from '@zustand/MeStore';
import useAlertModal from '@hook/useAlertModal';
import useConfirmModal from '@hook/useConfirmModal';

export default function useMyInfo() {
  const me = useMeStore((state) => state.me);
  const updateMe = useMeStore((state) => state.updateMe);
  const [name, setName] = useState(me?.name ?? '');

  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();

  const [isEditMode, setEditMode] = useState(false);
  const handleEditMode = useCallback(async () => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setName(me?.name || '');
    setEditMode((prev) => !prev);
  }, [setEditMode, me]);
  const handleSave = useCallback(async () => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const isOk = await confirm('적용하시겠습니까?');
    if (!isOk) {
      return;
    }

    const requestUpdateMeDto = {
      name,
    };

    await updateMe(requestUpdateMeDto);
    setEditMode(false);
  }, [me, name]);

  const handleCancel = useCallback(() => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setEditMode((prev) => !prev);
  }, [setEditMode, me]);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );
  return {
    me,
    isEditMode,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
  };
}
