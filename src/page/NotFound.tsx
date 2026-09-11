import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageState from "@/components/page-state/PageState";

export default function NotFound() {
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
      title="찾는 페이지가 없어요"
      description="주소가 바뀌었거나 잘못 입력됐을 수 있어요."
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
