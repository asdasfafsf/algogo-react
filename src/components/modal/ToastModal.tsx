import { useEffect, useState, useCallback } from "react";
import useModal from "@plugins/modal/useModal";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { X } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";

interface ToastModalProps {
  content: string;
  duration?: number;
  variant?: "default" | "success" | "fail";
  modalKey: string;
}

export default function ToastModal({
  content,
  duration = 3000,
  variant = "default",
  modalKey,
}: ToastModalProps) {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    if (modal?.top().key === `Toast-${modalKey}`) {
      setIsVisible(false);
      setTimeout(() => {
        modal.top().resolve(true);
      }, 300);
    }
  }, [modal]);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        modal.remove(`Toast-${modalKey}`);
        setIsVisible(false);
      }, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [modal]);

  let iconElement;
  let iconContainerClass = "";

  switch (variant) {
    case "success":
      iconElement = <CheckCircleIcon className="w-5 h-5" />;
      iconContainerClass =
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200";
      break;
    case "fail":
      iconElement = <XCircleIcon className="w-5 h-5" />;
      iconContainerClass =
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200";
      break;
    default:
      iconElement = <ExclamationCircleIcon className="w-5 h-5" />;
      iconContainerClass =
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200";
      break;
  }

  if (!isVisible) return null;

  return (
    <Card
      role="alert"
      className="relative bottom-4 right-4 z-30 mb-4 flex w-64 max-w-xs animate-[toast-enter_0.3s_ease-out] items-center rounded-lg border-0 bg-white p-4 text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400 pointer-events-auto"
    >
      <div className={iconContainerClass}>
        {iconElement}
        <span className="sr-only">
          {variant === "success"
            ? "Check icon"
            : variant === "fail"
              ? "Error icon"
              : "Warning icon"}
        </span>
      </div>
      <div className="text-sm font-normal ms-3">{content}</div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="-mx-1.5 -my-1.5 ms-auto size-8 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        aria-label="닫기"
      >
        <X aria-hidden className="size-3" />
      </Button>
    </Card>
  );
}
