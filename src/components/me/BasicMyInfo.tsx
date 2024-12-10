import { Card } from '@components/Card/index';

import { Typography, ProfilePhoto } from '@components/common/index';
import { Button } from '@components/Button/index';
import { Input } from '@components/Input/index';

import useMyInfo from '@hook/me/useMyInfo';
import SocialInput from './SocialInput';
// eslint-disable-next-line
// import DisabledGithubIcon from '/public/assets/icons8-github-48.svg?react';

export default function BasicMyInfo() {
  const {
    me,
    isEditMode,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
  } = useMyInfo();
  return (
    <Card className="p-4">

      <ProfilePhoto isEditable={isEditMode} />
      {isEditMode
        ? (
          <>
            {' '}
            <div className="flex justify-center">
              <Typography variant="h5" className="flex justify-start w-64">기본정보</Typography>
            </div>
            <div className="flex items-center justify-center my-2">
              <div className="w-64">
                <Input
                  // size="md"
                  label="이름"
                  onChange={handleChangeName}
                  value={name}
                  // success
                />
              </div>
            </div>
          </>
        )

        : (
          <Typography
            variant="h5"
            className="flex items-center justify-center my-4"
          >
            {me?.name || '이름 없음'}
          </Typography>
        )}

      {
        isEditMode
          ? (
            <div className="flex items-center justify-center my-4">
              <div className="w-64">
                <Input
                  disabled
                  // size="lg"
                  label="이메일"
                  value={me?.email}
                />

                <Typography
                  variant="small"
                  className="flex items-center justify-center py-0 text-sm text-gray-500"
                >
                  처음 가입한 이메일로 등록됩니다.
                </Typography>
              </div>
            </div>
          )
          : (
            <>
              <Typography
                variant="medium"
                weight="regular"
                color="gray"
                className="flex items-center justify-center mt-2"
              >
                {me?.email || '이메일 정보가 없습니다.'}
              </Typography>
              <Typography
                variant="small"
                className="flex items-center justify-center py-0 text-sm text-gray-500"
              >
                {me?.email ? '처음 가입한 이메일로 등록됩니다.' : ''}
              </Typography>
            </>
          )
    }

      <SocialInput socialList={me?.socialList ?? []} isEditMode={isEditMode} />

      <div className="flex items-end justify-center gap-1 mt-8 mb-2">
        {isEditMode
          ? (
            <>
              <Button
                onClick={handleCancel}
                className="bg-gray-500"
                color="gray"
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                color="blue"
              >
                저장
              </Button>
            </>
          )
          : (
            <Button
              onClick={handleEditMode}
              color="blue"
            >
              수정하기
            </Button>
          )}

      </div>
    </Card>
  );
}
