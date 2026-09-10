import { Link } from "react-router-dom";
import { CalendarDays, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageState from "@/components/page-state/PageState";

export function TodayProblemEmptyState({
  variant = "empty",
}: {
  variant?: "empty" | "error";
}) {
  const isError = variant === "error";

  return (
    <div className="mt-8">
      <PageState
        icon={
          isError ? (
            <RefreshCw className="size-6" />
          ) : (
            <CalendarDays className="size-6" />
          )
        }
        title={
          isError
            ? "오늘의 문제를 불러오지 못했습니다"
            : "이 날짜에는 문제가 없습니다"
        }
        description={
          isError
            ? "잠시 후 다시 확인해 주세요."
            : "다른 날짜를 탐색하거나 전체 문제를 둘러보세요."
        }
      >
        <Button asChild>
          <Link to="/problem">전체 문제 둘러보기</Link>
        </Button>
      </PageState>
    </div>
  );
}
