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
            ? "h-screen max-w-none rounded-none border-0"
            : "max-w-sm"
        }
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">{message}</DialogTitle>
        <DialogDescription className="sr-only">
          잠시만 기다려주세요
        </DialogDescription>
        <div
          className="flex flex-col items-center p-8"
          role="status"
          aria-live="polite"
        >
          <div className="relative">
            <div className="size-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">{message}</p>
          <p className="mt-2 text-sm text-gray-500">잠시만 기다려주세요</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
