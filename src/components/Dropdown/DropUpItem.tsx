import { Typography } from '@material-tailwind/react';

interface DropUpItemProps {
  children: React.ReactNode;
  content: string;

}

export default function DropUpItem({ children, content }: DropUpItemProps) {
  return (
    <li className="flex items-center justify-end gap-2 my-2 list-none h-14">
      <Typography
        color="white"
      >
        {content}
      </Typography>
      {children}
    </li>
  );
}
