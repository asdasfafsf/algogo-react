import { Bars3Icon } from '@heroicons/react/24/outline';
import { LogoWithText } from '@components/common';
import { Button } from '@components/Button/index';

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 shadow-sm bg-white/80 backdrop-blur-md">
      <div className="container max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <LogoWithText size="medium" />
          <nav className="items-center hidden space-x-8 md:flex">
            <Button color="blue" size="medium">
              시작하기
            </Button>
          </nav>
          <Button color="white" className="md:hidden" size="small">
            <Bars3Icon className="w-6 h-6 text-black" />
          </Button>
        </div>
      </div>
    </header>
  );
}
