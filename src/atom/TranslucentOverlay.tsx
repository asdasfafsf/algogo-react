interface TranslucentOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function TranslucentOverlay({ children, className = '' }: TranslucentOverlayProps) {
  return (
    <div className={`${className} w-screen min-h-screen flex max-h-full justify-center fixed z-50 bg-black bg-opacity-50 overflow-y-auto scroll-m-0`}>
      {children}
    </div>
  );
}
