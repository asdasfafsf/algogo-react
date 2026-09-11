import {
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

const surfaceSizeClass = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

interface ModalSurfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: keyof typeof surfaceSizeClass;
  className?: string;
  contentProps?: Omit<ComponentProps<typeof DialogContent>, "children">;
}

function ModalSurface({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
  className,
  contentProps,
}: ModalSurfaceProps) {
  const { className: contentClassName, ...restContentProps } =
    contentProps ?? {};
  const [opener] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined" &&
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );

  useEffect(() => {
    return () => {
      queueMicrotask(() => {
        if (!opener?.isConnected || opener.matches(":disabled")) return;

        const activeElement = document.activeElement;
        if (
          !activeElement?.isConnected ||
          activeElement === document.body ||
          activeElement === document.documentElement
        ) {
          opener.focus({ preventScroll: true });
        }
      });
    };
  }, [opener]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...restContentProps}
        className={cn(
          "flex max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-h-[min(90dvh,48rem)]",
          surfaceSizeClass[size],
          className,
          contentClassName,
        )}
      >
        <DialogHeader className="shrink-0 border-b border-border px-5 py-4 pr-12 text-left sm:px-6 sm:py-5 sm:pr-12">
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className="break-words leading-5">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function ModalBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6",
        className,
      )}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogFooter
      className={cn(
        "shrink-0 gap-2 border-t border-border bg-muted/20 px-5 py-3 sm:space-x-0 sm:px-6 [&>button]:w-full sm:[&>button]:w-auto",
        className,
      )}
      {...props}
    />
  );
}

export { ModalBody, ModalFooter, ModalSurface, type ModalSurfaceProps };
