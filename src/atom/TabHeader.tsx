/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-tailwind/react';
import { useState } from 'react';

interface TabHeaderProps {
  selectedIndex: number;
  headerList: string[];
  handleClick: (e: React.MouseEvent) => void
}

export default function TabHeader({ headerList, selectedIndex, handleClick }: TabHeaderProps) {
  return (
    <ul
      className="list-none flex items-center h-10 z-0"
    >
      {headerList.map((elem, index) => (
        <li
          onClick={handleClick}
          className={`${index === selectedIndex ? 'bg-gray-900 text-white' : 'text-blue-gray-500'} text-blue-gray-500 cursor-pointer h-full min-w-12 p-4 flex items-center relative z-10`}
        >
          {index === selectedIndex ? <div className="w-full bg-blue-500 h-0.5 absolute top-0 left-0" /> : ''}
          <Typography
            variant="small"
            className="pt-1 flex items-center justify-center font-bold cursor-pointer"
          >
            {elem}
          </Typography>
        </li>
      ))}

    </ul>
  );
}
