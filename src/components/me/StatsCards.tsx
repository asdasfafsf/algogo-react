import { CheckCircle2, Flame, Target, Trophy } from "lucide-react";
import StatCard from "./StatCard";

const stats = [
  {
    icon: CheckCircle2,
    title: "해결한 문제",
    tone: "primary",
  },
  {
    icon: Target,
    title: "정답률",
    tone: "success",
  },
  {
    icon: Flame,
    title: "연속 활동",
    tone: "warning",
  },
  {
    icon: Trophy,
    title: "현재 랭크",
    tone: "accent",
  },
] as const;

export default function StatsCards() {
  return (
    <section aria-labelledby="profile-stats-title" className="space-y-4">
      <div>
        <h2
          id="profile-stats-title"
          className="font-display text-lg font-semibold"
        >
          학습 현황
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          학습 현황을 준비하고 있어요.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            tone={stat.tone}
          />
        ))}
      </div>
    </section>
  );
}
