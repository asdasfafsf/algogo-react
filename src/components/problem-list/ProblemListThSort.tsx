import { Typography } from '@components/common';
import { PlayIcon } from '@heroicons/react/24/solid';

interface ProblemThSortProps {
  className?: string;
  sort: 0 | 1 | 2;
  children: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>

}

export default function ProblemThSort({
  sort, children, className = '', onClick = () => {},
}: ProblemThSortProps) {
  return (
    <th onClick={onClick} className={`${className} w-24`}>
      <div className="flex items-center gap-1 cursor-pointer">
        <Typography className="flex items-center" weight="semibold" variant="medium">
          {children}
        </Typography>
        <div className="pb-0.5 relative">
          <PlayIcon
            fill="fill"
            fillOpacity={sort === 1 ? 1 : 0.45}
            opacity={sort === 1 ? 1 : 0.45}
            className="relative w-2 h-2 transform -rotate-90"
          />
          <PlayIcon
            fill="fill"
            fillOpacity={sort === 2 ? 1 : 0.45}
            opacity={sort === 2 ? 1 : 0.45}
            className="relative w-2 h-2 transform rotate-90"
          />
        </div>
      </div>
    </th>
  );
}
