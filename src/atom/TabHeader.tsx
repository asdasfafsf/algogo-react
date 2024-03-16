interface TabHeaderProps {
  children: React.ReactNode[];
}

export default function TabHeader({ children }: TabHeaderProps) {
  return (
    <div className="w-full">
      <ul
        className="list-none flex items-center h-10 bg-gray-900 overflow-hidden"
      >
        {children}
      </ul>
    </div>
  );
}
