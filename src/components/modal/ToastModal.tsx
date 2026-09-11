import { useCallback, useEffect, useRef, useState } from "react";
import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { CircleAlert, CircleCheck, CircleX, X } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";

interface ToastModalProps extends ModalComponentProps<boolean> {
  content: string;
  duration?: number;
  variant?: "default" | "success" | "fail";
}

export default function ToastModal({
  content,
  duration = 3000,
  variant = "default",
  resolve,
}: ToastModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isClosing = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;

    isClosing.current = true;
    setIsVisible(false);
    closeTimer.current = setTimeout(() => resolve(true), 300);
  }, [resolve]);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(handleClose, duration);
    return () => {
      clearTimeout(timer);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [duration, handleClose]);

  let iconElement;
  let iconContainerClass = "";
  let iconLabel = "Warning icon";

  switch (variant) {
    case "success":
      iconElement = <CircleCheck className="size-5" />;
      iconContainerClass =
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      iconLabel = "Check icon";
      break;
    case "fail":
      iconElement = <CircleX className="size-5" />;
      iconContainerClass =
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive";
      iconLabel = "Error icon";
      break;
    default:
      iconElement = <CircleAlert className="size-5" />;
      iconContainerClass =
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary";
      break;
  }

  if (!isVisible) return null;

  return (
    <Card
      role={variant === "fail" ? "alert" : "status"}
      aria-live={variant === "fail" ? "assertive" : "polite"}
      className="pointer-events-auto relative z-30 mb-3 flex w-[min(calc(100vw-2rem),24rem)] items-start gap-3 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg animate-[toast-enter_0.3s_ease-out]"
    >
      <div className={iconContainerClass}>
        {iconElement}
        <span className="sr-only">{iconLabel}</span>
      </div>
      <div className="min-w-0 flex-1 break-words pt-1 text-sm leading-5">
        {content}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="-mr-1 -mt-1 size-8 shrink-0 text-muted-foreground hover:bg-accent hover:text-foreground"
        aria-label="닫기"
      >
        <X aria-hidden className="size-3" />
      </Button>
    </Card>
  );
}
