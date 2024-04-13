/* eslint-disable jsx-a11y/control-has-associated-label */
import { Typography, IconButton } from '@material-tailwind/react';

export default function Footer() {
  return (
    <footer className="px-8 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Typography className="!text-sm font-medium text-gray-500 lg:text-left text-center">
            All rights reserved. Copyright &copy;
            {' '}
            {new Date().getFullYear()}
          </Typography>
          <div className="flex gap-2 lg:ml-auto place-content-center">
            <a href="#buttons-with-link1">
              <IconButton variant="text" size="sm">
                <i className="text-lg text-gray-500 transition-colors fa-brands fa-twitter hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link2">
              <IconButton variant="text" size="sm">
                <i className="text-lg text-gray-500 transition-colors fa-brands fa-youtube hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link3">
              <IconButton variant="text" size="sm">
                <i className="text-lg text-gray-500 transition-colors fa-brands fa-instagram hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link4">
              <IconButton variant="text" size="sm">
                <i className="text-lg text-gray-500 transition-colors fa-brands fa-github hover:text-blue-gray-900" />
              </IconButton>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
