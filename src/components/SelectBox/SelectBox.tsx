interface SelectBoxProps {
  className?: string;
  children: React.ReactNode;
}

export default function SelectBox({
  className = "",
  children,
}: SelectBoxProps) {
  return (
    <div
      className={`overflow-y-auto rounded-lg border border-input bg-background ${className}`}
    >
      <ul className="h-full w-full p-1" role="listbox">
        {children}
      </ul>
    </div>
  );
}
