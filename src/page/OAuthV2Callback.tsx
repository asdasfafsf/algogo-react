import { oauthLoginV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2Callback() {
  useOAuthCallback("login", oauthLoginV2);
  return (
    <OAuthCallbackStatus
      title="로그인을 확인하고 있습니다"
      description="인증이 완료되면 요청하신 페이지로 이동합니다."
    />
  );
}
