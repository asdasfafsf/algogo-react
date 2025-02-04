interface LoadingModalProps {
  message?: string;
  isFullScreen?: boolean;
}

export default function LoadingModal({
  message = 'Loading',
  isFullScreen = false,
}: LoadingModalProps) {
  return (
    <div
      className={`
        fixed inset-0 z-50 
        flex items-center justify-center 
        ${isFullScreen ? 'bg-white' : 'bg-black/80'}
      `}
    >
      <div className="flex flex-col items-center p-8">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin" />
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin" />
          </div>
        </div>

        <div className="flex items-center gap-1 mt-6 text-lg font-medium text-gray-700">
          <span>{message}</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}
