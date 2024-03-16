interface TabBodyProps {
  children: React.ReactNode[];
  className?: string;
}

export default function TabBody({ children, className = 'h-full bg-gray-900' }: TabBodyProps) {
  return <div className={className}>{children}</div>;
}
