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
      className={cn("border-0 bg-white shadow-lg", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </ShadcnCard>
  );
}
