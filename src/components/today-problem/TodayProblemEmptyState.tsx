import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageState from "@/components/page-state/PageState";
export function TodayProblemEmptyState() {
  return (
    <PageState
      icon={<CalendarDays className="size-6" />}
      title="오늘의 문제가 없습니다"
      description={
        <>
          새로운 문제가 등록될 때까지 조금만 기다려주세요.
          <br />
          <Badge variant="secondary" className="mt-4">
            매일 UTC 자정에 갱신됩니다
          </Badge>
        </>
      }
    >
      <Button asChild>
        <Link to="/problem">전체 문제 둘러보기</Link>
      </Button>
    </PageState>
  );
}
