interface TabHeaderProps {
  children: React.ReactNode[];
  className: string;
}

export default function TabHeader({ children, className = '' }: TabHeaderProps) {
  return (
    <div className="w-full overflow-hidden">
      <ul
        className={`list-none flex items-center h-10 bg-gray-900 ${className}`}
      >
        {children}
      </ul>
    </div>
  );
}
