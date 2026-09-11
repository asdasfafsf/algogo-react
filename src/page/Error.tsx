import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageState from "@/components/page-state/PageState";

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
    <PageState
      fullScreen
      title="잠시 문제가 생겼어요"
      description="잠시 후 다시 시도해 주세요."
    >
      <Button
        variant="outline"
        className="active:translate-y-px"
        onClick={goBackOrHome}
      >
        이전으로
      </Button>
      <Button
        className="active:translate-y-px"
        onClick={() => navigate("/", { replace: true })}
      >
        문제 목록으로
      </Button>
    </PageState>
  );
}
