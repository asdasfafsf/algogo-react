export const socialProviders = [
  "instagram",
  "youtube",
  "linkedin",
  "github",
] as const;

export type AccountSocialProvider = (typeof socialProviders)[number];
export type SocialValues = Record<AccountSocialProvider, string>;

export const emptySocialValues = (): SocialValues => ({
  instagram: "",
  youtube: "",
  linkedin: "",
  github: "",
});

export const socialListToValues = (
  socialList: ReadonlyArray<{
    provider: AccountSocialProvider;
    content: string;
  }>,
): SocialValues => {
  const values = emptySocialValues();
  socialList.forEach(({ provider, content }) => {
    values[provider] = content;
  });
  return values;
};

export interface AccountSocial {
  provider: AccountSocialProvider;
  content: string;
}

export interface ProfileUpdateData<TFile> {
  name: string;
  file: TFile | undefined;
  socialList: AccountSocial[];
}

export const socialValuesToList = (values: SocialValues): AccountSocial[] =>
  socialProviders.map((provider) => ({ provider, content: values[provider] }));

export const createProfileUpdateRequest = <TFile>(
  name: string,
  file: TFile | undefined,
  socialValues: SocialValues,
): ProfileUpdateData<TFile> => ({
  name,
  file,
  socialList: socialValuesToList(socialValues),
});

export const selectProfileImageAfterUpdate = (
  response: { errorCode: string; data?: { profilePhoto?: string } | null },
  previousImage: string,
): string =>
  response.errorCode === "0000"
    ? (response.data?.profilePhoto ?? "")
    : previousImage;
