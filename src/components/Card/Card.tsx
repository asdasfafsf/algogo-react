import type { ComponentProps } from "react";
import { Card as ShadcnCard } from "@components/ui/card";
import { cn } from "@lib/utils";
type CardProps = ComponentProps<typeof ShadcnCard>;
export default function Card({
  children,
  className,
  onClick,
  ...props
}: CardProps) {
  return (
    <ShadcnCard
      className={cn("border border-border bg-card shadow-none", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </ShadcnCard>
  );
}
