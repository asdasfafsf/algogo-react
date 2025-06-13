interface ProblemDifficultyChipProps {
  difficulty: string;
  variant?: 'default' | 'selected';
  className?: string;
}

export function ProblemDifficultyChip({
  difficulty,
  variant = 'default',
  className = '',
}: ProblemDifficultyChipProps) {
  const getDifficultyColor = (difficulty: string, variant: 'default' | 'selected') => {
    if (variant === 'selected') {
      return 'bg-white/20 text-white border-white/30';
    }

    switch (difficulty) {
      case '입문': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case '초급': return 'bg-blue-50 text-blue-600 border-blue-200';
      case '중급': return 'bg-amber-50 text-amber-600 border-amber-200';
      case '고급': return 'bg-rose-50 text-rose-600 border-rose-200';
      case '심화': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className={`text-xs px-2 py-1 rounded-full border font-medium ${getDifficultyColor(difficulty, variant)} ${className}`}>
      {difficulty}
    </div>
  );
}
