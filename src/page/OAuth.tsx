import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAlertModal from "../hook/useAlertModal";
import { useMeStore } from "../zustand/MeStore";
import { executeLegacyOAuthCallback } from "@/application/account/oauthCallback";

export default function OAuth() {
  const [alert] = useAlertModal();
  const navigate = useNavigate();
  const { fetchToken, fetchMe } = useMeStore((state) => state);
  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination") || "";

  useEffect(() => {
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

    handleTokens();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="flex items-center justify-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-t-4 border-gray-200 border-solid rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-lg font-medium text-foreground">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}
