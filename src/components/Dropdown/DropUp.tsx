import { PlusIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

interface DropUpProps {
  children: React.ReactNode;
  className?: string;
}

export default function DropUp({ children, className = "" }: DropUpProps) {
  const [isOpen, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  return (
    <div className={`${className} fixed transition-height`}>
      <div className="flex items-center justify-end transition-height ease-in-out duration-500">
        <ul
          className={`${isOpen ? "" : "h-0"} list-none overflow-y-hidden transition-height ease-in-out duration-500 pr-1`}
        >
          {children}
        </ul>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleClickOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? "빠른 메뉴 닫기" : "빠른 메뉴 열기"}
          className="z-30 block size-14 rounded-full bg-blue-500 transition-transform hover:bg-blue-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:hidden"
        >
          <div className="flex items-center justify-center w-full h-full">
            <PlusIcon
              className={`size-6 text-white transition-transform ${isOpen ? "rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
