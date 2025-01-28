import { Typography } from '@components/common';

interface DropUpItemProps {
  children: React.ReactNode;
  content: string;

}

export default function DropUpItem({ children, content }: DropUpItemProps) {
  return (
    <li className="flex items-center justify-end gap-2 my-2 list-none h-14">
      <Typography
        variant="medium"
        className="text-white"
      >
        {content}
      </Typography>
      {children}
    </li>
  );
}
