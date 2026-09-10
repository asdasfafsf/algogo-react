import { Activity, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export default function ContributionGraph() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 font-display text-lg">
            <Activity className="size-5 text-muted-foreground" />
            활동 기록
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            일별 문제 해결 기록을 한눈에 확인하는 영역입니다.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground sm:flex">
          <CalendarDays className="size-4" />
          최근 1년
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 text-center">
          <Activity className="mb-4 size-9 text-muted-foreground/60" />
          <p className="font-medium">활동 기록을 준비하고 있어요</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            기록이 쌓이면 날짜별 활동을 이곳에서 확인할 수 있습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
