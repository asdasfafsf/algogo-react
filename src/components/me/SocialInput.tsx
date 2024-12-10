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
import { Input } from '@components/Input';
import { Typography } from '@components/common';
import useSocialInputStore from '@zustand/SocialInputStore';
import { useEffect } from 'react';

interface SocialInputProps {
  isEditMode: boolean;
  socialList: Social[];
}

export default function SocialInput({ isEditMode, socialList }: SocialInputProps) {
  const instagramValue = socialList
    .find((elem) => elem.provider === 'instagram')
    ?.content ?? '';

  const linkedInValue = socialList
    .find((elem) => elem.provider === 'linkedin')
    ?.content ?? '';

  const youtubeValue = socialList
    .find((elem) => elem.provider === 'youtube')
    ?.content ?? '';

  const githubValue = socialList
    .find((elem) => elem.provider === 'github')
    ?.content ?? '';

  const setValue = useSocialInputStore((state) => state.setValue);
  const values = useSocialInputStore((state) => state.values);

  useEffect(() => {
    setValue('youtube', youtubeValue);
    setValue('github', githubValue);
    setValue('linkedin', linkedInValue);
    setValue('instagram', instagramValue);
  }, [setValue]);

  if (isEditMode) {
    return (
      <>
        <div className="flex justify-center">
          <Typography variant="h5" className="flex justify-start w-64">소셜미디어</Typography>
        </div>
        <div className="flex items-center justify-center my-2">
          <div className="w-64">
            <Input
              label="Instagram"
              // placeholder="Input your Instagram ID"
              onChange={(e) => setValue('instagram', e.target.value)}
              className="flex items-center"
              value={values.instagram}
              icon={<ColorInstagramIcon className="w-8 h-full" />}
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-2">
          <div className="w-64">
            <Input
              label="LinkedIn"
              // placeholder="Input your Linked ID"
              onChange={(e) => setValue('linkedin', e.target.value)}
              className="flex items-center"
              value={values.linkedin}
              icon={<ColorLinkdedInIcon className="w-8 h-full" />}
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-2">
          <div className="w-64">
            <Input
              label="Youtube"
              onChange={(e) => setValue('youtube', e.target.value)}
              // placeholder="Input your Youtube Channel Link"
              className="flex items-center"
              value={values.youtube}
              icon={<ColorYoutubeInIcon className="w-8 h-full" />}
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-2">
          <div className="w-64">
            <Input
              label="Github"
              onChange={(e) => setValue('github', e.target.value)}
              // placeholder="Input your Github Id"
              className="flex items-center"
              value={values.github}
              icon={<ColorGithubIcon className="w-8 h-full" />}
            />
          </div>
        </div>
      </>
    );
  }

  return (
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
  );
}
