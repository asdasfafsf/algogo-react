interface TabPanelProps {
  children: React.ReactNode
  isSelected: boolean;
}

export default function TabPanel({ children, isSelected }: TabPanelProps) {
  return <div className={`${isSelected ? '' : 'hidden'} w-full h-full bg-gray-900 p-4`}>{children}</div>;
}
