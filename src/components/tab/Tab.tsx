import { Typography } from '@components/common/index';

interface TabProps {
  text: string;
  isSelected: boolean;
  handleClick: (e: React.MouseEvent) => Promise<void> | void;
  className?: string
}

export default function Tab({
  text, isSelected, handleClick, className = '',
}: TabProps) {
  return (
    <li
      onClick={handleClick}
      className={`${isSelected ? 'bg-black text-white' : 'text-blue-gray-500'} ${className}  cursor-pointer h-full min-w-12 p-4 flex items-center relative z-10 w-auto`}
    >
      {isSelected ? <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" /> : ''}
      <Typography
        color="white"
        variant="small"
        className="flex items-center justify-center pt-1 font-bold cursor-pointer"
      >
        {text}
      </Typography>
    </li>
  );
}
