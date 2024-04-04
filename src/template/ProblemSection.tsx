import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../organism/CodeResultPannel';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';
import { CODE_CONTROL_PANEL_HEIGHT, PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import { useScreenSize } from '../context/ScreenSizeContext';
import ProblemSidebar from './ProblemSidebar';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';

export default function ProblemSection() {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const problemHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const { isMobile } = useScreenSize();
  return (
    <section
      className="sm:flex overflow-x-hidden gap-0 m-0 p-0 h-full w-screen"
      style={isMobile
        ? {}
        : {
          display: 'grid',
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
          gridTemplateColumns: `${problemWidth}px calc(100vw - ${problemWidth})`, // 왼쪽에 1열, 오른쪽에 1열 설정
          gridTemplateRows: `${problemHeight}px calc(100vh - ${problemHeight - 10}px)`, // 왼쪽에 1행, 오른쪽에 3행 설정
        }}
    >
      <div
        style={isMobile
          ? { height: 'calc(100vh - 96px)' }
          : {
            height: 'calc(100vh - 96px)',
            width: `${problemWidth}px`,
            gridRow: 'span 2',
            gridColumn: 1,
          }}
        className="inherit"
      >
        <ProblemSidebar />
      </div>
      <div
        style={isMobile ? {} : {
          gridRow: 1,
          gridColumn: 2,
          width: `calc(100vw - ${problemWidth}px`,
          height: `${problemHeight}px`,
        }}
        className="inherit"
      >
        <CodeEditor />
      </div>
      <div
        style={{
          gridRow: 2,
          gridColumn: 2,
          height: `calc(100vh - ${problemHeight
                + PROBLEM_HEADER_HEIGHT
                + CODE_CONTROL_PANEL_HEIGHT
          }px)`,
        }}
        className="inherit"
      >
        <CodeResultPannel />
      </div>

    </section>
  );
}
