import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";

interface LoadingModalProps {
  message?: string;
  isFullScreen?: boolean;
}

export default function LoadingModal({
  message = "Loading",
  isFullScreen = false,
}: LoadingModalProps) {
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className={
          isFullScreen
            ? "h-dvh w-screen max-w-none gap-0 rounded-none border-0 p-0"
            : "max-w-sm gap-0 overflow-hidden p-0"
        }
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">{message}</DialogTitle>
        <div
          className="flex h-full min-h-48 flex-col items-center justify-center px-6 py-10 text-center"
          role="status"
          aria-live="polite"
        >
          <div
            aria-hidden
            className="size-12 animate-spin rounded-full border-4 border-muted border-t-primary"
          />
          <p className="mt-5 max-w-full break-words text-base font-semibold text-foreground">
            {message}
          </p>
          <DialogDescription className="mt-1.5">
            잠시만 기다려주세요
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
