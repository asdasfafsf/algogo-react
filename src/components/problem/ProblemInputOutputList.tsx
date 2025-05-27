/* eslint-disable-next-line */
import EnterIcon from '/public/assets/enter.svg?react';
/* eslint-disable-next-line */
import SpaceIcon from '/public/assets/space.svg?react'
import React from 'react';
import {
  Typography, Line, ClipboardWithTooltip,
} from '@components/common/index';
import useCodeResultPanelStore from '@zustand/CodeResultPanelStore';
import ProblemContent from './ProblemContent';
import { ProblemInputOutput } from '@/type/Problem.type';

interface ProblemInputOutputProps {
  inputOutputList: ProblemInputOutput[];
}

export function ProblemInputOutputList({ inputOutputList }: ProblemInputOutputProps) {
  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);
  return (
    <>
      <Typography variant="h5">입출력 예시</Typography>
      <Line className="mt-2 mb-4" />

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-6 h-6 text-blue-500 bg-gray-900 rounded-sm">
            <EnterIcon />
          </div>
          &nbsp;
          <Typography variant="medium" className="font-medium">: 다음 줄</Typography>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-6 h-6 text-blue-500 bg-gray-900 rounded-sm">
            <SpaceIcon />
          </div>
          &nbsp;
          <Typography variant="medium" className="font-medium">: 스페이스</Typography>
        </div>
      </div>
      <Line className="my-4 opacity-0" />

      {inputOutputList.map((elem, index) => (
        <div key={`example-${index}`}>
          <Typography variant="h5" className="pt-2 font-bold">
            예시
            {index + 1}
          </Typography>
          <Line className="relative my-2">
            <div className="absolute w-12 h-[2px] bg-blue-500" />
          </Line>
          <Typography variant="h6" className="my-2 font-medium">입력</Typography>
          <ClipboardWithTooltip
            handleCopyCallback={() => { setSelectedIndex(0); }}
            content={elem.input}
          />
          <Typography variant="h6" className="my-2 font-medium">출력</Typography>
          <ClipboardWithTooltip content={elem.output} />

          {elem.content && (
            <>
              <div className="my-4 opacity-0" />
              <ProblemContent content={elem.content} />
            </>
          )}
        </div>
      ))}

    </>
  );
}

export default React.memo(ProblemInputOutputList);
