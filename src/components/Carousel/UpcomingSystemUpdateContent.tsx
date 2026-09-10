import { Link2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function UpcomingSystemUpdateContent() {
  return (
    <Card className="flex h-full flex-col justify-between border-border bg-muted/30 shadow-none">
      <CardHeader className="px-14 pb-0 pt-7">
        <div className="mb-3 flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-lg border bg-background text-blue-600">
            <Link2 className="size-5" />
          </span>
          <Badge variant="secondary">업데이트 소식</Badge>
        </div>
        <CardTitle className="text-lg leading-snug sm:text-xl">
          더 편리한 계정 연동을
          <br />
          준비하고 있어요.
        </CardTitle>
      </CardHeader>
      <CardContent className="px-14 pb-7 pt-3">
        <p className="text-sm leading-6 text-muted-foreground">
          다양한 플랫폼과 연결해서
          <br />
          학습 기록을 한곳에서 만나보세요.
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ArrowUpRight className="size-4" />
          새로운 소식을 곧 전해드릴게요
        </div>
      </CardContent>
    </Card>
  );
}
