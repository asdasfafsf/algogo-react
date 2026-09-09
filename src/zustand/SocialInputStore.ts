import { create } from "zustand";
import { emptySocialValues, type SocialValues } from "@/domain/account/profile";

type SocialInputStore = {
  values: SocialValues;
  setValue: (socialProvider: SocialProvider, value: string) => void;
};

export const useSocialInputStore = create<SocialInputStore>((set) => ({
  values: emptySocialValues(),
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
