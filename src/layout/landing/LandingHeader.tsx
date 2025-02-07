import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@components/Button';

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              AlgoGo
            </a>
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
