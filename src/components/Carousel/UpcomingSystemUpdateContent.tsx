import { Link2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function UpcomingSystemUpdateContent() {
  return (
    <Card className="relative flex h-full flex-col justify-center overflow-hidden rounded-none border-0 bg-[#111827] text-white shadow-none before:absolute before:-right-24 before:-top-24 before:size-72 before:rounded-full before:bg-primary/15 before:blur-3xl">
      <CardHeader className="relative z-10 px-10 pb-0 sm:px-14">
        <div className="mb-3 flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-primary">
            <Link2 className="size-5" />
          </span>
          <Badge className="border border-primary/25 bg-primary/10 text-primary">
            업데이트 소식
          </Badge>
        </div>
        <CardTitle className="font-billboard text-2xl font-normal leading-tight tracking-tight sm:text-4xl">
          더 편리한 계정 연동을
          <br />
          준비하고 있어요.
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 px-10 pb-0 pt-3 sm:px-14">
        <p className="text-sm leading-6 text-slate-400">
          다양한 플랫폼과 연결해서
          <br />
          학습 기록을 한곳에서 만나보세요.
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
          <ArrowUpRight className="size-4" />
          새로운 소식을 곧 전해드릴게요
        </div>
      </CardContent>
      <div
        aria-hidden="true"
        className="absolute right-16 top-1/2 hidden size-44 -translate-y-1/2 rounded-full border border-white/10 lg:block"
      >
        <span className="absolute left-12 top-8 size-28 rounded-full border border-white/7" />
        <span className="absolute bottom-8 left-4 size-3 rounded-full bg-white/15" />
      </div>
    </Card>
  );
}
