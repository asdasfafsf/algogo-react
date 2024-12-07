interface TabHeaderProps {
  children: React.ReactNode[];
  className: string;
  style?: React.CSSProperties
}

export default function TabHeader({ children, className = '', style }: TabHeaderProps) {
  return (
    <div style={style} className="w-full overflow-hidden">
      <ul
        className={`list-none flex items-center h-10 bg-black ${className}`}
      >
        {children}
      </ul>
    </div>
  );
}
