import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export default function RecentActivity() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <BookOpen className="size-5 text-muted-foreground" />
          최근 풀이
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          최근에 해결한 문제를 확인하는 영역입니다.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 text-center">
          <p className="font-medium">최근 풀이를 준비하고 있어요</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            풀이 기록이 쌓이면 최근 활동을 이곳에서 확인할 수 있습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
