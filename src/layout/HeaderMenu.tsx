import { Typography } from '@components/common';

import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

type HeaderMenuItem = {
  title: string;
  subTitle: string;
  pathList: string[];
  subMenuList: {
    title: string;
    pathList: string[];
    canAccess: boolean;
  }[];
};

interface HeaderMenuProps {
  menuItem: HeaderMenuItem;
}

export default function HeaderMenu({ menuItem }: HeaderMenuProps) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const isBold = menuItem.pathList.some((path) => currentPath.split('/')[1] === path.split('/')[1]);

  return (
    <div className="relative h-full group">
      <div
        onClick={() => navigate(menuItem.pathList[0])}
        className={`relative flex items-center justify-center h-full px-4 box-content border-transparent transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[3px] after:bg-black hover:font-semibold after:hover:w-full after:transition-[width] after:duration-500 hover:text-black hover:transition-all ${isBold ? 'after:!w-full font-semibold' : ''}`}
      >
        <Typography
          weight={isBold ? 'semibold' : 'semilight'}
          variant="paragraph"
          className={`ph-16 w-full box-border flex items-center justify-center ${isBold ? 'font-semibold' : ''} group-hover:font-semibold`}
        >
          {menuItem.title}
        </Typography>
      </div>
      <div className="fixed left-0 w-screen h-0 overflow-hidden transition-all duration-300 border-t border-gray-300 group-hover:h-64 group-hover:border-b">
        <div className="w-full h-full bg-white">
          <div className="container max-w-screen-xl py-4 mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="px-3" onClick={() => navigate(menuItem.pathList[0])}>
                  <Typography variant="h6" className="mb-2 cursor-pointer hover:text-blue-500">{menuItem.subTitle}</Typography>
                </div>
                <ul className="px-3">
                  {
                        menuItem.subMenuList.map((subMenu, index) => {
                          const isActive = subMenu.pathList.some((path) => path === currentPath);
                          const { canAccess } = subMenu;
                          return (
                            <li
                              onClick={() => canAccess && navigate(subMenu.pathList[0])}
                              key={index}
                              className={`py-2 flex items-center gap-1 ${!canAccess && 'cursor-not-allowed'}`}
                            >
                              <div className="flex items-center gap-2">
                                {isActive && <ArrowRightIcon className="w-5 h-5 text-blue-500" />}
                              </div>
                              <Typography
                                weight={isActive ? 'semibold' : 'semilight'}
                                variant="medium"
                                color={isActive ? 'blue' : 'gray'}
                                className={`${
                                  canAccess
                                    ? `hover:text-blue-500 cursor-pointer hover:font-semibold ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-600'}`
                                    : 'text-gray-400'
                                }`}
                              >
                                {subMenu.title}
                              </Typography>
                            </li>
                          );
                        })
}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
