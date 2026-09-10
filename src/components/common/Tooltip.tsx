import type { ReactElement } from "react";
import {
  Tooltip as Root,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
interface WrappedTooltipProps {
  className?: string;
  children: ReactElement;
  content: string;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
}
export default function Tooltip({
  children,
  content,
  className = "",
  placement = "top",
}: WrappedTooltipProps) {
  const [side, edge] = placement.split("-") as [
    "top" | "bottom" | "left" | "right",
    ("start" | "end")?,
  ];
  return (
    <TooltipProvider delayDuration={300}>
      <Root>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={edge ?? "center"}
          className={className}
        >
          {content}
        </TooltipContent>
      </Root>
    </TooltipProvider>
  );
}
