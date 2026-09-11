import { oauthLoginV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2Callback() {
  useOAuthCallback("login", oauthLoginV2);
  return (
    <OAuthCallbackStatus
      title="로그인을 마치고 있어요"
      description="잠시만 기다려 주세요."
    />
  );
}
