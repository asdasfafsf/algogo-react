import ColorInstagramIcon from "/public/assets/icons8-instagram_e.svg?react";
// import DisabledInstragramIcon from '/public/assets/icons8-instagram_d.svg?react';
import ColorLinkdedInIcon from "/public/assets/icons8-linkedin_e.svg?react";
// import DisabledLinkedInIcon from '/public/assets/icons8-linkedin_d.svg?react';
import ColorYoutubeInIcon from "/public/assets/icons8-youtube_e.svg?react";
// import DisabledYoutubeIcon from '/public/assets/icons8-youtube_d.svg?react';
import ColorGithubIcon from "/public/assets/icons8-github-48.svg?react";
import { Input } from "@components/Input";
import { Typography } from "@components/common";
import useSocialInputStore from "@zustand/SocialInputStore";
import { useEffect } from "react";
import {
  socialListToValues,
  type SocialValues,
} from "@/domain/account/profile";

interface SocialInputProps {
  isEditMode: boolean;
  socialList: Social[];
}

export default function SocialInput({
  isEditMode,
  socialList,
}: SocialInputProps) {
  const setValue = useSocialInputStore((state) => state.setValue);
  const values = useSocialInputStore((state) => state.values);

  useEffect(() => {
    const initialValues = socialListToValues(socialList);
    Object.entries(initialValues).forEach(([provider, value]) => {
      setValue(provider as SocialProvider, value);
    });
  }, [setValue]);

  return (
    <SocialInputView
      isEditMode={isEditMode}
      values={values}
      onChange={setValue}
    />
  );
}

export function SocialInputView({
  isEditMode,
  values,
  onChange,
}: {
  isEditMode: boolean;
  values: SocialValues;
  onChange: (provider: SocialProvider, value: string) => void;
}) {
  if (isEditMode) {
    return (
      <>
        <div className="flex justify-center">
          <Typography variant="h5" className="flex justify-start w-64">
            소셜미디어
          </Typography>
        </div>
        <div className="flex items-center justify-center my-2">
          <div className="w-64">
            <Input
              label="Instagram"
              // placeholder="Input your Instagram ID"
              onChange={(e) => onChange("instagram", e.target.value)}
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
              onChange={(e) => onChange("linkedin", e.target.value)}
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
              onChange={(e) => onChange("youtube", e.target.value)}
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
              onChange={(e) => onChange("github", e.target.value)}
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
      <ColorInstagramIcon className="w-8 h-8 text-gray-500 cursor-pointer" />
      <ColorLinkdedInIcon className="w-8 h-8 cursor-pointer" />
      <ColorYoutubeInIcon className="w-8 h-8 cursor-pointer" />
      <ColorGithubIcon className="w-8 h-8 cursor-pointer" />
    </div>
  );
}
