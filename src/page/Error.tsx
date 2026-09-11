import { useLocation, useNavigate } from "react-router-dom";
import ErrorFallback from "@/components/errors/ErrorFallback";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBackOrHome = () => {
    if (location.key !== "default" && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <ErrorFallback
      onBack={goBackOrHome}
      onHome={() => navigate("/", { replace: true })}
    />
  );
}
