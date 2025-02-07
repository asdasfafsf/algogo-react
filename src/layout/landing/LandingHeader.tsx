import { Bars3Icon } from '@heroicons/react/24/outline';
import { Typography, Logo } from '@components/common';
import { Button } from '@components/Button/index';

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1 justify-center">
            <Logo size="large" className="relative top-1" />
            <Typography
              color="blue"
              className="relative top-1 font-WavvePADO-Regular"
              variant="h2"
            >
              <a href="/">
                알고고
              </a>
            </Typography>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Button color="blue" size="medium">
              시작하기
            </Button>
          </nav>
          <Button className="md:hidden bg-white hover:bg-gray-50" size="small">
            <Bars3Icon className="w-6 h-6 text-gray-900" />
          </Button>
        </div>
      </div>
    </header>
  );
}
