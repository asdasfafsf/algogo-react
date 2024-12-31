interface SelectBoxProps {
  className?: string;
  children: React.ReactNode;
}

// eslint-disable-next-line no-empty-pattern
export default function SelectBox({ className = '', children }: SelectBoxProps) {
  return (
    <div className={`border-[1px] border-gray-200 rounded-md ${className} overflow-y-scroll`}>
      <ul className="w-full h-full">
        {children}
      </ul>
    </div>
  );
}
