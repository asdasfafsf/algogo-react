import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../organism/CodeResultPannel';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';
import useProblemSection from '../hook/useCodeEditorResizer';
import { PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import { useScreenSize } from '../context/ScreenSizeContext';
import ProblemSidebar from './ProblemSidebar';
import { useProblemScreenStore } from '../zustand/ProblemScreenStore';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';
import CodeEditorResizer from '../molecule/CodeEditorResizer';

export default function ProblemSection() {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const problemHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);

  return (
    <section
      className="gap-0 m-0 p-0 h-full"
      style={{
        height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
        width: '100vw',
        display: 'grid',
        gridTemplateColumns: `${problemWidth}px calc(100vw - ${problemWidth})`, // 왼쪽에 1열, 오른쪽에 1열 설정
        gridTemplateRows: `${problemHeight}px calc(100vh - ${problemHeight - 10}px)`, // 왼쪽에 1행, 오른쪽에 3행 설정
      }}
    >

      <ProblemSidebar />
      <CodeEditor />
      <CodeResultPannel />

    </section>
  );
}
