import {
  useCallback, useEffect, useState,
} from 'react';
import useMeStore from '@zustand/MeStore';
import useAlertModal from '@hook/useAlertModal';
import useConfirmModal from '@hook/useConfirmModal';
import useSocialInputStore from '@zustand/SocialInputStore';
import { AxiosError } from 'axios';

export default function useMyInfo() {
  const me = useMeStore((state) => state.me);
  const updateMe = useMeStore((state) => state.updateMe);
  const fetchMe = useMeStore((state) => state.fetchMe);
  const [name, setName] = useState(me?.name ?? '');
  const [profilePhoto, setProfilePhoto] = useState<File>();

  useEffect(() => {
    fetchMe();
  }, []);

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

    const { values } = useSocialInputStore.getState();
    const socialList = (Object.keys(values) as SocialProvider[])
      .map((provider) => ({ provider, content: values[provider] } as Social));

    const requestUpdateMeDto = {
      name,
      file: profilePhoto,
      socialList,
    };

    try {
      await updateMe(requestUpdateMeDto);
      setEditMode(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  }, [me, name, profilePhoto, updateMe]);

  const handleCancel = useCallback(() => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setProfilePhoto(undefined);
    setEditMode((prev) => !prev);
  }, [setEditMode, me]);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );

  const handleChangeProfilePhoto = useCallback(async (_: unknown, src: File) => {
    setProfilePhoto(src);
  }, [setProfilePhoto]);

  return {
    me,
    isEditMode,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
    handleChangeProfilePhoto,
  };
}
