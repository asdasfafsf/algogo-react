interface SelectBoxProps {
  className?: string;
  children: React.ReactNode;
}

export default function SelectBox({ className = '', children }: SelectBoxProps) {
  return (
    <div className={`border border-gray-200 rounded-md ${className} overflow-y-scroll`}>
      <ul className="w-full h-full">
        {children}
      </ul>
    </div>
  );
}
