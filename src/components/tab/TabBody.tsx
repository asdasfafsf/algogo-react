interface TabBodyProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties
}

export default function TabBody({ style, children, className = '' }: TabBodyProps) {
  return <div style={style} className={`${className} h-full bg-gray-900`}>{children}</div>;
}
