import { oauthConnectV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2ConnectCallback() {
  useOAuthCallback("connect", oauthConnectV2);
  return (
    <OAuthCallbackStatus
      title="계정 연결을 확인하고 있습니다"
      description="연결이 완료되면 마이페이지로 돌아갑니다."
    />
  );
}
