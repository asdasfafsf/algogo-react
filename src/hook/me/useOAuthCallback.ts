import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAlertModal from "@hook/useAlertModal";
import { useMeStore } from "@zustand/MeStore";
import { executeOAuthCallback } from "@/application/account/oauthCallback";
import { parseOAuthDestination, type OAuthFlow } from "@/domain/account/oauth";

type OAuthRequest = (input: { provider: string; code: string }) => Promise<{
  errorCode: string;
  data?: { accessToken: string; refreshToken: string };
}>;

export default function useOAuthCallback(
  flow: OAuthFlow,
  request: OAuthRequest,
) {
  const [alert] = useAlertModal();
  const navigate = useNavigate();
  const { provider } = useParams();
  const fetchMe = useMeStore((state) => state.fetchMe);
  const logout = useMeStore((state) => state.logout);
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code") || "";
  const destination = parseOAuthDestination(query.get("state"), flow);
  const hasStarted = useRef(false);

  const run = useCallback(async () => {
    const outcome = await executeOAuthCallback({
      flow,
      provider: provider || "",
      code,
      destination,
      dependencies: {
        request: (oauthProvider, oauthCode) =>
          request({ provider: oauthProvider, code: oauthCode }),
        saveTokens: ({ accessToken, refreshToken }) => {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        },
        fetchMe,
      },
    });

    if ("message" in outcome) await alert(outcome.message);
    if (outcome.type === "account-deleted") logout();
    navigate(outcome.destination);
  }, [
    alert,
    code,
    destination,
    fetchMe,
    flow,
    logout,
    navigate,
    provider,
    request,
  ]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    void run();
  }, [run]);
}
