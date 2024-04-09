import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import { useScreenSize } from '../context/ScreenSizeContext';
import ProblemBreadcrumbs from '../molecule/ProblemBreadcrumbs';
import ProblemNavbar from '../molecule/ProblemNavbar';

export default function ProblemHeader() {
  const { isMobile } = useScreenSize();

  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="flex bg-gray-900 items-center w-screen"
    >
      <div className="flex">
        <ProblemBreadcrumbs
          pathList={[{ path: '문제', to: '/' }]}
          current={`${isMobile ? '' : '문제이름이 존나길면요'}`}
        />
      </div>
      <ProblemNavbar />
    </header>
  );
}
