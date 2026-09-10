import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import useAlertModal from "../hook/useAlertModal";
import { useMeStore } from "../zustand/MeStore";
import { executeLegacyOAuthCallback } from "@/application/account/oauthCallback";

export default function OAuth() {
  const [alert] = useAlertModal();
  const navigate = useNavigate();
  const fetchToken = useMeStore((state) => state.fetchToken);
  const fetchMe = useMeStore((state) => state.fetchMe);
  const destination =
    new URLSearchParams(window.location.search).get("destination") ?? "";
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const handleTokens = async () => {
      const outcome = await executeLegacyOAuthCallback({
        destination,
        fetchToken,
        fetchMe,
      });
      if (outcome.type === "failure") {
        await alert(
          "토큰 발급 중 오류가 발생했습니다. 처음부터 다시 시도해주세요!",
        );
      }
      navigate(outcome.destination);
    };

    void handleTokens();
  }, [alert, destination, fetchMe, fetchToken, navigate]);

  return (
    <OAuthCallbackStatus
      title="로그인을 확인하고 있습니다"
      description="인증이 완료되면 요청하신 페이지로 이동합니다."
    />
  );
}
