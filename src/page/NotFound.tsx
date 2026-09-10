import { useLocation, useNavigate } from "react-router-dom";
import { FileQuestion } from "lucide-react";
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
      variant="terminal"
      code="404"
      command={`algogo navigate ${location.pathname}`}
      icon={<FileQuestion className="size-4" />}
      title="페이지를 찾을 수 없습니다"
      description="요청하신 경로가 존재하지 않거나 이동되었습니다."
    >
      <Button variant="outline" onClick={goBackOrHome}>
        이전 페이지
      </Button>
      <Button onClick={() => navigate("/", { replace: true })}>
        문제 목록으로
      </Button>
    </PageState>
  );
}
