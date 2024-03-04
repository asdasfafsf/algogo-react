/* eslint-disable jsx-a11y/control-has-associated-label */
import { Typography, IconButton } from '@material-tailwind/react';

export default function Footer() {
  return (
    <footer className="px-8 py-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <Typography className="!text-sm font-medium text-gray-500 lg:text-left text-center">
            All rights reserved. Copyright &copy;
            {' '}
            {new Date().getFullYear()}
          </Typography>
          <div className="flex lg:ml-auto place-content-center gap-2">
            <a href="#buttons-with-link1">
              <IconButton variant="text" size="sm">
                <i className="fa-brands fa-twitter text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link2">
              <IconButton variant="text" size="sm">
                <i className="fa-brands fa-youtube text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link3">
              <IconButton variant="text" size="sm">
                <i className="fa-brands fa-instagram text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
              </IconButton>
            </a>
            <a href="#buttons-with-link4">
              <IconButton variant="text" size="sm">
                <i className="fa-brands fa-github text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
              </IconButton>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
