interface TabPanelProps {
  children: React.ReactNode
  isSelected: boolean;
  style?: React.CSSProperties
}

export default function TabPanel({ children, isSelected, style }: TabPanelProps) {
  return <div style={style} className={`${isSelected ? '' : 'hidden'} w-full h-full bg-black p-2 box-border`}>{children}</div>;
}
