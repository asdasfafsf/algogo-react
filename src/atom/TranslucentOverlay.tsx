interface TranslucentOverlayProps {
  children: React.ReactNode;
}

export default function TranslucentOverlay({ children }: TranslucentOverlayProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
