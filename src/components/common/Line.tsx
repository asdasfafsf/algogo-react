interface LineProps {
  className?: string;
  children?: React.ReactNode
}

export default function Line({ className, children = '' }: LineProps) {
  const defaultClassName = `${className ?? ''} h-px w-full bg-gray-300`.trim();
  return <div className={defaultClassName}>{children}</div>;
}
