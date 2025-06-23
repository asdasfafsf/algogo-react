import { ProblemState } from '@/type/Problem.type';
import Chip, { ChipProps } from './Chip';
import { PROBLEM_STATE } from '@/constant/problem.state.constant';

interface ProblemChipProps extends ChipProps {
  state: ProblemState;
}

export default function ProblemStateChip({ state, ...props }: ProblemChipProps) {
  const chipValue = {
    [PROBLEM_STATE.FAILED]: '실패',
    [PROBLEM_STATE.SOLVED]: '성공',
    [PROBLEM_STATE.NONE]: '미제출',
  };
  const { className } = props;
  return (
    state === PROBLEM_STATE.NONE ? (
      ''
    ) : (

      <Chip
        variant="ghost"
        color={`${state === PROBLEM_STATE.FAILED ? 'red' : state === PROBLEM_STATE.SOLVED ? 'blue' : 'blue'}`}
        {...props}
        value={chipValue[state] ?? '미제출'}
        className={`${className}`}
      />
    )
  );
}
