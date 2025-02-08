interface TranslucentOverlayProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function TranslucentOverlay({ children, className = '', onClick }: TranslucentOverlayProps) {
  return (
    <div
      className={`${className} z-50 w-screen min-h-screen flex max-h-full justify-center fixed bg-black/75 overflow-y-auto scroll-m-0`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
