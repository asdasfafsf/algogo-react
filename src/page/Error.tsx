import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import PageState from "@/components/page-state/PageState";
import { useState, useEffect } from "react";
import useAlertModal from "@hook/useAlertModal";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alert] = useAlertModal();

  // message 상태 선언
  const [message, setMessage] = useState("알 수 없는 오류");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialMessage = searchParams.get("message") || "알 수 없는 오류";
    setMessage(initialMessage); // 초기값 설정
  }, [location.search]);

  useEffect(() => {
    alert(message);
  }, [message]);

  return (
    <div className="grid min-h-dvh items-center bg-muted/30">
      <PageState
        icon={<CircleAlert className="size-6" />}
        title="문제가 발생했습니다"
        description={message}
      >
        <Button variant="outline" onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
        <Button onClick={() => navigate("/")}>홈</Button>
      </PageState>
    </div>
  );
}
