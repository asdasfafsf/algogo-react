import Chip, { ChipProps } from './Chip';

interface ProblemChipProps extends ChipProps {
  state: number;
}

export default function ProblemStateChip({ state, ...props }: ProblemChipProps) {
  const chipValue = ['실패', '성공', '미제출', '미확인'];
  const { className } = props;
  return (
    <Chip
      variant="ghost"
      color={`${state === 0 ? 'red' : state === 1 ? 'green' : 'blue'}`}
      {...props}
      value={chipValue[state] ?? '미제출'}
      className={`${className}`}
    />
  );
}
