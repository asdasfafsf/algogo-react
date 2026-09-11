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

export type ProfileSaveFailure = { type: "failure"; message: string };

export type ProfileSaveOutcome =
  { type: "success"; profilePhoto: string } | ProfileSaveFailure;

const profileSaveFailureMessages = {
  UNAUTHORIZED: "로그인 정보를 확인할 수 없어요. 다시 로그인해 주세요.",
  INVALID_PROFILE: "이름과 프로필 사진을 확인해 주세요.",
} as const;

export const profileSaveFailureMessage = (errorCode: string): string =>
  profileSaveFailureMessages[
    errorCode as keyof typeof profileSaveFailureMessages
  ] ?? "프로필을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.";

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

export const profileSaveOutcome = (
  response: { errorCode: string; data?: { profilePhoto?: string } | null },
  previousImage: string,
): ProfileSaveOutcome =>
  response.errorCode === "0000"
    ? {
        type: "success",
        profilePhoto: selectProfileImageAfterUpdate(response, previousImage),
      }
    : {
        type: "failure",
        message: profileSaveFailureMessage(response.errorCode),
      };

export const profileSaveRequestFailure = (): ProfileSaveFailure => ({
  type: "failure",
  message: "프로필 저장 중 연결에 문제가 생겼어요. 잠시 후 다시 시도해 주세요.",
});
