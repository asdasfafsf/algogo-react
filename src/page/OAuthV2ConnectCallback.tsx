import { oauthConnectV2 } from "@api/oauth-v2";
import useOAuthCallback from "@hook/me/useOAuthCallback";

export default function OAuthV2Callback() {
  useOAuthCallback("connect", oauthConnectV2);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-t-4 border-gray-200 border-solid rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}
