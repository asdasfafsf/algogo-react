import { oauthDisconnectV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2DisconnectCallback() {
  useOAuthCallback("disconnect", oauthDisconnectV2);
  return (
    <OAuthCallbackStatus
      title="계정 연결을 해제하고 있어요"
      description="잠시만 기다려 주세요."
    />
  );
}
