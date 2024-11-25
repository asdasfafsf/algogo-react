interface LineProps {
  className?: string;
}

export default function Line({ className }: LineProps) {
  const defaultClassName = `${className ?? ''} h-px w-full bg-gray-300`.trim();
  return <div className={defaultClassName} />;
}
