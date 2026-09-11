export type AccountSocialProvider =
  "instagram" | "youtube" | "linkedin" | "github";

export interface AccountSocial {
  provider: AccountSocialProvider;
  content: string;
}

export interface ProfileUpdateData<TFile> {
  name: string;
  file: TFile | undefined;
  socialList: AccountSocial[];
}

export const createProfileUpdateRequest = <TFile>(
  name: string,
  file: TFile | undefined,
  socialList: ReadonlyArray<AccountSocial>,
): ProfileUpdateData<TFile> => ({
  name,
  file,
  socialList: socialList.map(({ provider, content }) => ({
    provider,
    content,
  })),
});

export const selectProfileImageAfterUpdate = (
  response: { errorCode: string; data?: { profilePhoto?: string } | null },
  previousImage: string,
): string =>
  response.errorCode === "0000"
    ? (response.data?.profilePhoto ?? "")
    : previousImage;
