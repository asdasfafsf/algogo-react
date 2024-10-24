/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable-next-line */
import EnterIcon from '/public/assets/enter.svg?react';
/* eslint-disable-next-line */
import SpaceIcon from '/public/assets/space.svg?react';
import Typography from '@material-tailwind/react/components/Typography';
import Line from '../atom/Line';
import ClipboardWithTooltip from '../atom/ClipboardWithTooltip';
import ProblemImage from '../atom/ProblemImage';
import ProblemCategoryViewer from '../molecule/ProblemCategoryViewer';
import ProblemLevelViewer from '../molecule/ProblemLevelViewer';
import {
  useRef,
} from 'react';
import useProblemSidebar from '../hook/useProblemSidebar';
import { useScreenSize } from '../context/ScreenSizeContext';
import MathJax from 'react-mathjax';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

interface ProblemSidebarProps {
  problem: ResponseProblem
}

const decodeHtmlEntities = (str: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
};
const parseMathAndText = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/); // $ 또는 $$로 감싸진 수식을 추출
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const formula = part.slice(2, -2); // $$를 제거하고 수식으로 처리
      return <MathJax.Node key={`formula-${index}`} formula={formula} />;
    } if (part.startsWith('$') && part.endsWith('$')) {
      const formula = part.slice(1, -1); // $를 제거하고 인라인 수식으로 처리
      return <MathJax.Node inline key={`inline-formula-${index}`} formula={formula} />;
    }
    return <span key={`text-${index}`}>{decodeHtmlEntities(part)}</span>; // 일반 텍스트 처리
  });
};

export default function ProblemSidebar({ problem }: ProblemSidebarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [problemWidth, handleMouseDown] = useProblemSidebar();
  const { isMobile } = useScreenSize();
  const {
    title, levelText, submitCount, typeList, contentList,
    input, output, inputOutputList, answerRate, timeout,
    memoryLimit, answerCount, answerPeopleCount,
  } = problem;

  const { setSelectedIndex } = useCodeResultPanelStore(
    ({ setSelectedIndex }) => ({ setSelectedIndex }),
  );

  return (
    <MathJax.Provider>
      <aside
        style={isMobile
          ? { height: 'calc(100vh - 96px)' }
          : {
            height: 'calc(100vh - 96px)',
            width: `${problemWidth}px`,
            gridRow: 'span 2',
            gridColumn: 1,
          }}
        className="relative z-30 flex bg-white sm:w-screen"
      >
        <div className="w-full px-5 py-8 overflow-y-auto">
          <Typography variant="h4">{title}</Typography>
          <Line className="my-2" />

          <div className="my-2 min-h-4">
            <div className="flex flex-wrap items-center gap-1 jus">
              <ProblemLevelViewer intialState="hide" level={levelText as ProblemLevel} />
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold">제출 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">
                  {submitCount}
                </Typography>
              </div>
              &nbsp;

              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold">정답 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">{answerCount}</Typography>
              </div>
              &nbsp;
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold">맞힌 사람 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">{answerPeopleCount}</Typography>
              </div>
              &nbsp;
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold">정답률 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">
                  {answerRate}
                  %
                </Typography>
              </div>
              &nbsp;
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold">시간 제한 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">
                  {timeout}
                  {' '}
                  ms
                </Typography>
              </div>
              &nbsp;
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold"> 메모리 제한 : </Typography>
                &nbsp;
                <Typography variant="small" className="font-medium">
                  {memoryLimit}
                  {' '}
                  MB
                </Typography>
              </div>
              &nbsp;
            </div>
          </div>

          <ProblemCategoryViewer initialState={typeList && typeList.length === 0 ? 'none' : 'hide'} categoryList={typeList.map((elem) => elem.name)} />

          {contentList.map((elem, index) => (
            elem.type === 'image' ? (
              <ProblemImage className="mt-1" alt={elem.content} key={`image-${index}`} src={elem.content} />
            ) : (
              <Typography key={`content-${index}`} variant="paragraph" className="mt-1 font-normal">
                {parseMathAndText(elem.content)}
              </Typography>
            )
          ))}

          <Line className="my-4 opacity-0" />
          <Typography variant="h5">입력</Typography>
          <Line className="mt-2 mb-4" />

          <Typography variant="paragraph" className="font-normal">{parseMathAndText(input)}</Typography>

          <Line className="my-4 opacity-0" />
          <Typography variant="h5">출력</Typography>
          <Line className="mt-2 mb-4" />

          <Typography variant="paragraph" className="font-normal">{parseMathAndText(output)}</Typography>

          <Line className="my-4 opacity-0" />
          <Typography variant="h5">입출력 예시</Typography>
          <Line className="mt-2 mb-4" />

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-6 h-6 text-blue-500 bg-black rounded-sm">
                <EnterIcon />
              </div>
              &nbsp;
              <Typography variant="small" className="font-medium">: 다음 줄</Typography>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-6 h-6 text-blue-500 bg-black rounded-sm">
                <SpaceIcon />
              </div>
              &nbsp;
              <Typography variant="small" className="font-medium">: 스페이스</Typography>
            </div>
          </div>
          <Line className="my-4 opacity-0" />

          {inputOutputList.map((elem, index) => (
            <div key={`example-${index}`}>
              <Typography variant="h6" className="pt-2 font-bold">
                예시
                {index + 1}
              </Typography>
              <Typography variant="small" className="font-medium">입력</Typography>
              <ClipboardWithTooltip
                handleCopyCallback={() => { setSelectedIndex(0); }}
                content={elem.input}
              />
              <Typography variant="small" className="mt-1 font-medium">출력</Typography>
              <ClipboardWithTooltip content={elem.output} />
            </div>
          ))}

          <Line className="my-4 opacity-0" />
          <Typography variant="h5">출처</Typography>
          <Line className="my-2" />
        </div>
        <div
          ref={draggableRef}
          onMouseDown={handleMouseDown}
          className="z-10 h-[calc(100vh-96px)]  text-white -right-5 absolute w-5 cursor-col-resize"
        />
      </aside>
    </MathJax.Provider>
  );
}
