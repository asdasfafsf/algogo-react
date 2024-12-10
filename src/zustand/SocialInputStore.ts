import { create } from 'zustand';

type SocialProvider = 'instagram' | 'youtube' | 'linkedin' | 'github';

type SocialInputStore = {
  values: Record<SocialProvider, string>;
  setValue: (socialProvider: SocialProvider, value: string) => void;
};

export const useSocialInputStore = create<SocialInputStore>((set) => ({
  values: {
    instagram: '',
    youtube: '',
    linkedin: '',
    github: '',
  },
  setValue(socialProvider, value) {
    set((state) => ({
      values: {
        ...state.values,
        [socialProvider]: value,
      },
    }));
  },
}));

export default useSocialInputStore;
