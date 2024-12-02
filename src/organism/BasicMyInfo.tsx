import { useCallback, useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import { Card } from '@components/Card/index';
import ProfilePhoto from '../atom/ProfilePhoto';
import useConfirmModal from '../hook/useConfirmModal';

// eslint-disable-next-line
import ColorInstagramIcon from '/public/assets/icons8-instagram_e.svg?react';
// eslint-disable-next-line
// import DisabledInstragramIcon from '/public/assets/icons8-instagram_d.svg?react';
// eslint-disable-next-line
import ColorLinkdedInIcon from '/public/assets/icons8-linkedin_e.svg?react';
// eslint-disable-next-line
// import DisabledLinkedInIcon from '/public/assets/icons8-linkedin_d.svg?react';
// eslint-disable-next-line
import ColorYoutubeInIcon from '/public/assets/icons8-youtube_e.svg?react';
// eslint-disable-next-line
// import DisabledYoutubeIcon from '/public/assets/icons8-youtube_d.svg?react';
// eslint-disable-next-line
import ColorGithubIcon from '/public/assets/icons8-github-48.svg?react';
// eslint-disable-next-line
// import DisabledGithubIcon from '/public/assets/icons8-github-48.svg?react';

export default function BasicMyInfo() {
  const [isEditMode, setEditMode] = useState(false);
  const [confirm] = useConfirmModal();

  const handleClickEdit = useCallback(async () => {
    setEditMode((prev) => !prev);
  }, [setEditMode]);

  const handleClickSave = useCallback(async () => {
    const isOk = await confirm('적용하시겠습니까?');
    if (!isOk) {
      return;
    }

    console.log('save');
  }, []);

  const handleClickCancel = useCallback(() => {
    setEditMode((prev) => !prev);
  }, [setEditMode]);

  return (
    <Card>

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
                  size="md"
                  label="이름"
                  placeholder="이름을 입력하세요"
                  success
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
            한원근
          </Typography>
        )}

      {
        isEditMode
          ? (
            <div className="flex items-center justify-center my-4">
              <div className="w-64">
                <Input
                  disabled
                  size="lg"
                  label="이메일"
                  value="asdasfafsf@naver.com"
                  placeholder="이메일을 입력하세요"
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
                variant="paragraph"
                className="flex items-center justify-center mt-2"
              >
                asdasfafsf@naver.com
              </Typography>
              <Typography
                variant="small"
                className="flex items-center justify-center py-0 text-sm text-gray-500"
              >
                처음 가입한 이메일로 등록됩니다.
              </Typography>
            </>
          )
    }

      {
        isEditMode
          ? (
            <>
              <div className="flex justify-center">
                <Typography variant="h5" className="flex justify-start w-64">소셜미디어</Typography>
              </div>
              <div className="flex items-center justify-center my-2">
                <div className="w-64">
                  <Input
                    size="md"
                    label="Instagram"
                    placeholder="Input your Instagram ID"
                    className="flex items-center"
                    icon={<ColorInstagramIcon className="w-8 h-full" />}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center my-2">
                <div className="w-64">
                  <Input
                    size="md"
                    label="LinkedIn"
                    placeholder="Input your Linked ID"
                    className="flex items-center"
                    icon={<ColorLinkdedInIcon className="w-8 h-full" />}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center my-2">
                <div className="w-64">
                  <Input
                    size="md"
                    label="Youtube"
                    placeholder="Input your Youtube Channel Link"
                    className="flex items-center"
                    icon={<ColorYoutubeInIcon className="w-8 h-full" />}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center my-2">
                <div className="w-64">
                  <Input
                    size="md"
                    label="Github"
                    placeholder="Input your Github Id"
                    className="flex items-center"
                    icon={<ColorGithubIcon className="w-8 h-full" />}
                  />
                </div>
              </div>
            </>
          )
          : (
            <div className="flex items-center justify-center gap-2 my-3">
              <ColorInstagramIcon
                className="w-8 h-8 text-gray-500 cursor-pointer"
              />
              <ColorLinkdedInIcon
                className="w-8 h-8 cursor-pointer"
              />
              <ColorYoutubeInIcon
                className="w-8 h-8 cursor-pointer"
              />
              <ColorGithubIcon
                className="w-8 h-8 cursor-pointer"
              />
            </div>
          )
    }

      <div className="flex items-end justify-center gap-1 mt-8 mb-2">
        {isEditMode
          ? (
            <>
              <Button
                onClick={handleClickCancel}
                className="bg-gray-500"
                color="gray"
              >
                취소
              </Button>
              <Button
                onClick={handleClickSave}
                color="blue"
              >
                저장
              </Button>
            </>
          )
          : (
            <Button
              onClick={handleClickEdit}
              color="blue"
            >
              수정하기
            </Button>
          )}

      </div>
    </Card>
  );
}
