import Chip from './Chip';

interface ProblemLevelChipProps {
  level: ProblemLevel
  className?: string
}

export function getBackgroundClassName(level: ProblemLevel) {
  if (level.indexOf('브론즈') > -1) {
    return 'bg-bronze';
  }
  if (level.indexOf('실버') > -1) {
    return 'bg-silver';
  }
  if (level.indexOf('골드') > -1) {
    return 'bg-gold';
  }
  if (level.indexOf('플래티넘') > -1) {
    return 'bg-platinum';
  }
  if (level.indexOf('다이아') > -1) {
    return 'bg-diamond';
  }
  if (level.indexOf('루비') > -1) {
    return 'bg-ruby';
  }
  if (level.indexOf('숨김') > -1) {
    return 'bg-gray-900';
  }

  return 'bg-gray-900';
}

export default function ProblemLevelChip({ level, className = '' }: ProblemLevelChipProps) {
  return (
    <Chip
      variant="ghost"
      className={`${className} ${'text-white'} ${getBackgroundClassName(level)}`}
      value={level === '숨김' ? '난이도 숨김' : level}
    />
  );
}
