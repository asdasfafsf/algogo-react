import { PlusIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

interface DropUpProps {
  children: React.ReactNode;
  className?: string
}

export default function DropUp({
  children,
  className = '',
} : DropUpProps) {
  const [isOpen, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={`${className} fixed transition-[height]`}>
      <div className="flex items-center justify-end transition-[height] ease-in-out duration-500">
        <ul
          className={`${isOpen ? '' : 'h-0'} list-none overflow-y-hidden transition-[height] ease-in-out duration-500 pr-1`}
        >
          {children}
        </ul>
      </div>
      <div className="flex justify-end">
        <div
          onClick={handleClickOpen}
          className="z-30 items-center justify-center block bg-blue-500 rounded-full sm:hidden w-14 h-14 cursor-crosshair"
        >
          <div className="flex items-center justify-center w-full h-full">
            <PlusIcon className="w-6 h-6 text-white" />

          </div>
        </div>
      </div>

    </div>
  );
}
