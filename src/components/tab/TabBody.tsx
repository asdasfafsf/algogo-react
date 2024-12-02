interface TabBodyProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties
}

export default function TabBody({ style, children, className = 'h-full bg-gray-900' }: TabBodyProps) {
  return <div style={style} className={className}>{children}</div>;
}
