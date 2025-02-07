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
  const [image, setImage] = useState<string>(me?.profilePhoto ?? '');

  useEffect(() => {
    fetchMe()
      .then((me) => {
        if (me) {
          setImage(me.profilePhoto ?? '');
        }
      });
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
      const res = await updateMe(requestUpdateMeDto);
      setImage(res.data?.profilePhoto ?? '');
      if (res.errorCode !== '0000') {
        setImage(me.profilePhoto ?? '');
        alert(res.errorMessage);
      }
    } catch (error) {
      setImage(me.profilePhoto ?? '');
      if (error instanceof AxiosError) {
        alert('저장 중 오류가 발생했습니다.');
      }
    } finally {
      setEditMode(false);
    }
  }, [me, name, profilePhoto, updateMe]);

  const handleCancel = useCallback(() => {
    if (me === null) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    setImage(me.profilePhoto ?? '');
    setProfilePhoto(undefined);
    setEditMode((prev) => !prev);
  }, [setEditMode, me]);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );

  const handleChangeProfilePhoto = useCallback(async (_: unknown, src: File, b64: string) => {
    setProfilePhoto(src);
    setImage(b64);
  }, [setProfilePhoto]);

  return {
    me,
    isEditMode,
    image,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
    handleChangeProfilePhoto,
  };
}
