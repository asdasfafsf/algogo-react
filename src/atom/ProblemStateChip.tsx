/* eslint-disable react/jsx-props-no-spreading */
import { Chip, ChipProps } from '@material-tailwind/react';

interface ProblemChipProps extends ChipProps {
  state: number;
}

export default function ProblemStateChip({ state, ...chipProps }: ProblemChipProps) {
  const chipValue = ['실패', '성공', '미제출', '미확인'];
  const { className } = chipProps;
  return (
    <Chip
      variant="ghost"
      color={`${state === 0 ? 'red' : state === 1 ? 'green' : 'blue'}`}
      {...chipProps}
      value={chipValue[state] ?? '미제출'}
      className={className}
    />
  );
}
