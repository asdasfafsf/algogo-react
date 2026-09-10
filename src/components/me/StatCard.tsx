import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@components/ui/card";
import { cn } from "@lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  tone?: "primary" | "success" | "warning" | "accent";
}

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
} as const;

export default function StatCard({
  icon: Icon,
  title,
  tone = "primary",
}: StatCardProps) {
  return (
    <Card
      className="border-border/60 shadow-sm"
      aria-label={`${title}, 준비 중`}
    >
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            toneClasses[tone],
          )}
        >
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-semibold text-muted-foreground">—</p>
        </div>
      </CardContent>
    </Card>
  );
}
