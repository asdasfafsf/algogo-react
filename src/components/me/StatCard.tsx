import { Card as SurfaceCard } from "@/components/ui/card";
import { Typography } from "@components/common";
import { memo } from "react";

type ColorVariant = "blue" | "emerald" | "purple" | "orange" | "gray";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color?: ColorVariant;
}

const colorMap = {
  blue: {
    bgColor: "bg-linear-to-br from-blue-500 to-blue-600",
    subtitleColor: "text-blue-600",
  },
  emerald: {
    bgColor: "bg-linear-to-br from-emerald-500 to-emerald-600",
    subtitleColor: "text-emerald-600",
  },
  purple: {
    bgColor: "bg-linear-to-br from-purple-500 to-purple-600",
    subtitleColor: "text-purple-600",
  },
  orange: {
    bgColor: "bg-linear-to-br from-orange-500 to-orange-600",
    subtitleColor: "text-orange-600",
  },
  gray: {
    bgColor: "bg-linear-to-br from-gray-500 to-gray-600",
    subtitleColor: "text-gray-600",
  },
};

const StatCard = memo(
  ({ icon, title, value, subtitle, color = "gray" }: StatCardProps) => {
    const { bgColor, subtitleColor } = colorMap[color];

    return (
      <SurfaceCard className="group block gap-0 rounded-xl border border-border bg-card p-6 py-0 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center justify-center transition-all duration-300 shadow-xs w-14 h-14 ${bgColor} rounded-2xl group-hover:shadow-md`}
          >
            {icon}
          </div>
          <div className="text-right">
            <Typography
              variant="small"
              weight="regular"
              className="mb-1 text-muted-foreground"
            >
              {title}
            </Typography>
            <Typography variant="h2" weight="bold" className="text-foreground">
              {value}
            </Typography>
            <Typography
              variant="small"
              weight="regular"
              className={subtitleColor}
            >
              {subtitle}
            </Typography>
          </div>
        </div>
      </SurfaceCard>
    );
  },
);

export default StatCard;
