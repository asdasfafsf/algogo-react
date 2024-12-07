import { LightBulbIcon, BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Typography } from '@components/common';
import { PROBLEM_FOOTER_HEIGHT } from '../../constant/Size';
import { useScreenSize } from '../../context/ScreenSizeContext';
import { useProblemScreenStore } from '../../zustand/ProblemScreenStore';

export default function ProbleFooter() {
  const { isMobile } = useScreenSize();
  const { selectedIndex, setSelectedIndex } = useProblemScreenStore((state) => state);

  return (
    <footer
      style={{
        height: `${PROBLEM_FOOTER_HEIGHT}px`,
      }}
      className="flex items-center justify-center w-screen text-white bg-gray-900"
    >
      {isMobile
        ? (
          <ul className="flex w-full h-full list-none">
            <li
              onClick={() => setSelectedIndex(0)}
              className="flex items-center justify-center w-1/3 cursor-pointer"
            >
              <BookOpenIcon className={`${selectedIndex === 0 ? 'text-white' : 'text-gray-500'} w-6 h-6`} />
            </li>
            <li
              onClick={() => setSelectedIndex(1)}
              className="flex items-center justify-center w-1/3 cursor-pointer"
            >
              <LightBulbIcon className={`${selectedIndex === 1 ? 'text-white' : 'text-gray-500'} w-6 h-6`} />
            </li>
            {' '}
            <li
              onClick={() => setSelectedIndex(2)}
              className="flex items-center justify-center w-1/3 cursor-pointer"
            >
              <DocumentTextIcon className={`${selectedIndex === 2 ? 'text-white' : 'text-gray-500'} w-6 h-6`} />
            </li>
          </ul>
        )
        : <Typography variant="h6">1/1</Typography>}

    </footer>
  );
}
