import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useProblemContentSizeStore } from '@zustand/ProblemContentSizeStore';
import { Typography } from '../common';

export default function ProblemContentResizer() {
  const setSize = useProblemContentSizeStore((state) => state.setSize);
  const size = useProblemContentSizeStore((state) => state.size);
  return (
    <div className="flex items-center gap-1 rounded-md border-[1px] w-24">
      <MinusCircleIcon
        onClick={() => { setSize((prev) => Math.max(prev - 10, 100) as ProblemContentSize); }}
        className="w-6 h-6 cursor-zoom-out"
      />
      <Typography variant="medium" weight="semilight">
        {' '}
        {size}
        %
        {' '}
      </Typography>
      <PlusCircleIcon
        onClick={() => { setSize((prev) => Math.min(prev + 10, 200) as ProblemContentSize); }}
        className="w-6 h-6 cursor-zoom-in"
      />
    </div>
  );
}
