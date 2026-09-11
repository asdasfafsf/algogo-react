import { Children, type ReactNode, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
interface DropdownProps {
  className?: string;
  open?: boolean;
  handler?: () => void | Promise<void>;
  children: ReactNode;
  showArrow?: boolean;
  align?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "left"
    | "left-top"
    | "left-bottom"
    | "right"
    | "right-top"
    | "right-bottom";
}
const placement = {
  top: { side: "top", align: "center" },
  "top-left": { side: "top", align: "start" },
  "top-right": { side: "top", align: "end" },
  bottom: { side: "bottom", align: "center" },
  "bottom-left": { side: "bottom", align: "start" },
  "bottom-right": { side: "bottom", align: "end" },
  left: { side: "left", align: "center" },
  "left-top": { side: "left", align: "start" },
  "left-bottom": { side: "left", align: "end" },
  right: { side: "right", align: "center" },
  "right-top": { side: "right", align: "start" },
  "right-bottom": { side: "right", align: "end" },
} as const;
export default function Dropdown({
  className = "",
  open = false,
  handler,
  children,
  showArrow = true,
  align = "bottom",
}: DropdownProps) {
  const [header, ...content] = Children.toArray(children);
  const position = placement[align];
  const [uncontrolledOpen, setUncontrolledOpen] = useState(open);
  const displayedOpen = handler ? open : uncontrolledOpen;
  const rootProps = handler
    ? {
        open,
        onOpenChange: (next: boolean) => {
          if (next !== open) void handler();
        },
      }
    : { defaultOpen: open, onOpenChange: setUncontrolledOpen };
  return (
    <Popover.Root {...rootProps}>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="h-auto cursor-pointer p-0 font-normal normal-case hover:bg-transparent"
        >
          {header}
          {showArrow && (
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 transition-transform",
                displayedOpen && "rotate-180",
              )}
            />
          )}
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={position.side}
          align={position.align}
          sideOffset={6}
          className={cn(
            "z-50 rounded-md border border-gray-300 bg-white shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            className,
          )}
        >
          {content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
