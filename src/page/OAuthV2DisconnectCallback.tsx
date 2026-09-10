import { oauthDisconnectV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2DisconnectCallback() {
  useOAuthCallback("disconnect", oauthDisconnectV2);
  return (
    <OAuthCallbackStatus
      title="연결 해제를 확인하고 있습니다"
      description="처리가 완료되면 계정 상태를 새로 확인합니다."
    />
  );
}
