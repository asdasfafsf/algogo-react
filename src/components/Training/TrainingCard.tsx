import { ArrowUpRight, CalendarDays, Layers, Sparkles } from "lucide-react";
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
    <div
      className={`group relative flex items-center gap-4 border-y border-border/70 px-1 py-5 transition-colors ${active ? "cursor-pointer hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" : "opacity-65"}`}
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
        className={`grid size-11 shrink-0 place-items-center rounded-lg border ${active ? "border-primary/25 bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {active ? (
        <ArrowUpRight className="size-4 text-primary" />
      ) : (
        <Badge variant="secondary" className="text-[10px]">
          준비중
        </Badge>
      )}
    </div>
  );
}
