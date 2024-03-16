interface TabPanelProps {
  children: React.ReactNode
  isSelected: boolean;
  style?: React.CSSProperties
}

export default function TabPanel({ children, isSelected, style }: TabPanelProps) {
  return <div style={style} className={`${isSelected ? '' : 'hidden'} w-full h-full bg-gray-900 p-2`}>{children}</div>;
}
