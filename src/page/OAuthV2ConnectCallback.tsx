import { oauthConnectV2 } from "@api/oauth-v2";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2ConnectCallback() {
  useOAuthCallback("connect", oauthConnectV2);
  return (
    <OAuthCallbackStatus
      title="계정을 연결하고 있어요"
      description="잠시만 기다려 주세요."
    />
  );
}
