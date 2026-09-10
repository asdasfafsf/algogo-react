import { useNavigate } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageState from "@/components/page-state/PageState";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-dvh items-center bg-muted/30">
      <PageState
        icon={<FileQuestion className="size-6" />}
        title="페이지를 찾을 수 없습니다"
        description="주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다."
      >
        <Button variant="outline" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button onClick={() => navigate("/")}>문제 목록으로</Button>
      </PageState>
    </div>
  );
}
