import { Link } from "react-router-dom";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TodayProblemEmptyState({
  variant = "empty",
  onRetry,
}: {
  variant?: "empty" | "error";
  onRetry?: () => void;
}) {
  const isError = variant === "error";

  return (
    <section
      className="mx-auto mt-7 max-w-xl border-y border-border/70 px-1 py-10 text-center sm:mt-9 sm:py-12"
      aria-live="polite"
    >
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {isError
          ? "오늘의 문제를 가져오지 못했어요"
          : "이 날짜에 준비된 문제가 없어요"}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {isError
          ? "연결을 확인한 뒤 다시 시도해 주세요."
          : "위에서 다른 날짜를 고르거나 전체 문제에서 직접 찾아보세요."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {isError && onRetry ? (
          <Button
            variant="outline"
            onClick={() => void onRetry()}
            className="cursor-pointer active:scale-[0.98]"
          >
            <RotateCw aria-hidden="true" />
            다시 시도
          </Button>
        ) : null}
        <Button asChild className="cursor-pointer active:scale-[0.98]">
          <Link to="/problem">전체 문제 보기</Link>
        </Button>
      </div>
    </section>
  );
}
