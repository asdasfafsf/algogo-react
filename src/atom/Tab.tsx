import Typography from '@material-tailwind/react/components/Typography';

interface TabProps {
  text: string;
  isSelected: boolean;
  handleClick: (e: React.MouseEvent) => Promise<void> | void;
  className: string
}

export default function Tab({
  text, isSelected, handleClick, className,
}: TabProps) {
  return (
    <li
      onClick={handleClick}
      className={`${isSelected ? 'bg-gray-900 text-white' : 'text-blue-gray-500'} ${className} text-blue-gray-500 cursor-pointer h-full min-w-12 p-4 flex items-center relative z-10 w-auto`}
    >
      {isSelected ? <div className="w-full bg-blue-500 h-1 absolute top-0 left-0" /> : ''}
      <Typography
        variant="small"
        className="pt-1 flex items-center justify-center font-bold cursor-pointer"
      >
        {text}
      </Typography>
    </li>
  );
}
