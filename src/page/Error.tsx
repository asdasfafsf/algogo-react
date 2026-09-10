import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import PageState from "@/components/page-state/PageState";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  const message =
    new URLSearchParams(location.search).get("message")?.trim() ||
    "알 수 없는 오류가 발생했습니다.";

  const goBackOrHome = () => {
    if (location.key !== "default" && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <PageState
      variant="terminal"
      code="runtime"
      command="algogo recover"
      icon={<CircleAlert className="size-4" />}
      title="문제가 발생했습니다"
      description="요청을 처리하는 중 오류가 발생했습니다."
      detail={message}
    >
      <Button variant="outline" onClick={goBackOrHome}>
        이전 페이지
      </Button>
      <Button onClick={() => navigate("/", { replace: true })}>홈으로</Button>
    </PageState>
  );
}
