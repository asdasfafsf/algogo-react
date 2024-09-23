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

interface ProblemSidebarProps {
  problem: ResponseProblem
}

export default function ProblemSidebar({ problem }: ProblemSidebarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [problemWidth, handleMouseDown] = useProblemSidebar();
  const { isMobile } = useScreenSize();
  const {
    title, levelText, submitCount, typeList, contentList, input, output, inputOutputList,
  } = problem;
  return (
    <aside
      // style={{
      //   width: isMobile ? '100vw' : `${problemWidth}px`,
      // }}
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
          <div className="flex flex-wrap items-center gap-4 jus">
            <ProblemLevelViewer intialState="hide" level={levelText as ProblemLevel} />
            <div className="flex flex-wrap items-center">
              <Typography variant="small" className="font-bold">제출 : </Typography>
              &nbsp;
              <Typography variant="small" className="font-medium">{submitCount}</Typography>
            </div>
            <div className="flex flex-wrap items-center">
              <Typography variant="small" className="font-bold">정답률 : </Typography>
            &nbsp;
              <Typography variant="small" className="font-medium">33.12%</Typography>
            </div>
          </div>
        </div>

        <ProblemCategoryViewer initialState={typeList && typeList.length === 0 ? 'none' : 'hide'} categoryList={typeList.map((elem) => elem.name)} />

        {
          contentList.map((elem) => (
            elem.type === 'image' ? (
              <ProblemImage alt={elem.content} key={elem.content} src={elem.content} />
            ) : (
              <Typography key={elem.content} variant="paragraph" className="font-normal">
                {elem.content}
              </Typography>
            )
          ))
        }

        <Line className="my-4 opacity-0" />
        <Typography variant="h5">입력</Typography>
        <Line className="mt-2 mb-4" />

        <Typography variant="paragraph" className="font-normal">
          {input}
        </Typography>

        <Line className="my-4 opacity-0" />
        <Typography variant="h5">출력</Typography>
        <Line className="mt-2 mb-4" />

        <Typography variant="paragraph" className="font-normal">
          {output}
        </Typography>

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

        {
          inputOutputList.map((elem, index) => (
            <div key={`예시 ${index + 1}`}>
              <Typography variant="h6" className="pt-2 font-bold">
                예시
                {index + 1}
              </Typography>
              <Typography variant="small" className="font-medium">입력</Typography>
              <ClipboardWithTooltip content={elem.input} />
              <Typography variant="small" className="mt-1 font-medium">출력</Typography>
              <ClipboardWithTooltip content={elem.output} />
            </div>
          ))
        }

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
  );
}
