import { IconButton } from '@material-tailwind/react';
import { Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ProblemNavbar() {
  return (
    <nav className="flex w-full">
      <div className="flex text-white w-full h-full justify-end items-center p-0 px-4 gap-1">
        <div className="h-full w-10 flex justify-center items-center">
          <IconButton
            ripple
            className="text-white w-10 h-10"
          >
            <DocumentTextIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>

        <div className="h-full w-10 flex justify-center items-center">
          <IconButton
            ripple
            className="text-white w-10 h-10"
          >
            <Cog6ToothIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
