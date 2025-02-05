import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { Tooltip, Toggle } from '../common';

export default function ProblemListLevelHiddenToggle() {
  const problemHidden = useProblemTableFilterStore((state) => state.problemHidden);
  const setProblemHidden = useProblemTableFilterStore((state) => state.setProblemHidden);

  const handleToggle = () => {
    setProblemHidden((prev) => {
      prev['난이도'] = !prev['난이도'];
      return { ...prev };
    });
  };

  return (
    <Tooltip content={problemHidden['난이도'] ? '난이도 보이기' : '난이도 숨기기'}>
      <Toggle
        onClick={handleToggle}
        className="w-10 bg-white h-9"
      >
        {problemHidden['난이도'] ? (
          <EyeSlashIcon className="w-9 h-9" />
        ) : (
          <EyeIcon className="w-9 h-9" />
        )}
      </Toggle>
    </Tooltip>
  );
}
