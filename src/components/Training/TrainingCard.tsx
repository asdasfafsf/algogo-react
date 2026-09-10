import { ArrowUpRight, CalendarDays, Layers, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export interface TrainingCardProps {
  title: string;
  description: string;
  iconUrl: string;
  color: "blue" | "purple" | "gray";
  status: "active" | "coming-soon";
  onClick?: () => void;
}
export function TrainingCard({
  title,
  description,
  color,
  status,
  onClick,
}: TrainingCardProps) {
  const active = status === "active";
  const Icon =
    color === "blue" ? CalendarDays : color === "purple" ? Layers : Sparkles;
  return (
    <Card
      className={`group relative flex items-center gap-4 p-5 shadow-none transition-colors ${active ? "cursor-pointer border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" : "bg-muted/20"}`}
      role={active ? "button" : undefined}
      tabIndex={active ? 0 : undefined}
      onClick={active ? onClick : undefined}
      onKeyDown={(event) => {
        if (active && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-lg border ${active ? "border-blue-200 bg-white text-blue-600" : "bg-background text-muted-foreground"}`}
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {active ? (
        <ArrowUpRight className="size-4 text-blue-600" />
      ) : (
        <Badge variant="secondary" className="text-[10px]">
          준비중
        </Badge>
      )}
    </Card>
  );
}
