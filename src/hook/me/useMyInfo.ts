import { useCallback, useEffect, useState } from "react";
import useMeStore from "@zustand/MeStore";
import useAlertModal from "@hook/useAlertModal";
import useConfirmModal from "@hook/useConfirmModal";
import {
  createProfileUpdateRequest,
  profileSaveOutcome,
  profileSaveRequestFailure,
} from "@/domain/account/profile";

export default function useMyInfo() {
  const me = useMeStore((state) => state.me);
  const updateMe = useMeStore((state) => state.updateMe);
  const [name, setName] = useState(me?.name ?? "");
  const [profilePhoto, setProfilePhoto] = useState<File>();
  const [image, setImage] = useState<string>(me?.profilePhoto ?? "");
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const [isEditMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const resetDraft = useCallback(() => {
    if (!me) return;

    setName(me.name ?? "");
    setImage(me.profilePhoto ?? "");
    setProfilePhoto(undefined);
  }, [me]);

  useEffect(() => {
    if (!isEditMode) resetDraft();
  }, [isEditMode, resetDraft]);

  const handleEditMode = useCallback(() => {
    if (me === null) {
      void alert("로그인 후 이용해주세요.");
      return;
    }

    resetDraft();
    setEditMode(true);
  }, [alert, me, resetDraft]);

  const handleSave = useCallback(async () => {
    if (isSaving) return;

    if (me === null) {
      await alert("로그인 후 이용해주세요.");
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      await alert("이름을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    try {
      const isOk = await confirm("적용하시겠습니까?");
      if (!isOk) return;

      const requestUpdateMeDto = createProfileUpdateRequest(
        trimmedName,
        profilePhoto,
        me.socialList,
      );
      const res = await updateMe(requestUpdateMeDto);
      const outcome = profileSaveOutcome(res, me.profilePhoto ?? "");
      if (outcome.type === "failure") {
        await alert(outcome.message);
        return;
      }

      setImage(outcome.profilePhoto);
      setProfilePhoto(undefined);
      setEditMode(false);
    } catch {
      await alert(profileSaveRequestFailure().message);
    } finally {
      setIsSaving(false);
    }
  }, [alert, confirm, isSaving, me, name, profilePhoto, updateMe]);

  const handleCancel = useCallback(() => {
    if (me === null) {
      void alert("로그인 후 이용해주세요.");
      return;
    }

    resetDraft();
    setEditMode(false);
  }, [alert, me, resetDraft]);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );

  const handleChangeProfilePhoto = useCallback(
    async (_: unknown, src: File, b64: string) => {
      setProfilePhoto(src);
      setImage(b64);
    },
    [setProfilePhoto],
  );

  return {
    me,
    isEditMode,
    isSaving,
    image,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
    handleChangeProfilePhoto,
  };
}
