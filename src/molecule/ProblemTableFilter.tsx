import { Typography } from '@material-tailwind/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useProblemTableFilterStore } from '../zustand/ProblemTableFilterStore';
import ChipWithSelected from '../atom/ChipWithSelected';

export default function ProblemTableFilter() {
  const { problemOptionList, setProblemOptionList } = useProblemTableFilterStore((
    { problemOptionList, setProblemOptionList },
  ) => ({ problemOptionList, setProblemOptionList }));

  return !!problemOptionList.length
        && (
          <div className="mt-2">
            {/* <Line /> */}
            <div className="flex flex-wrap gap-2 py-2">

              <div
                onClick={() => setProblemOptionList([])}
                className="flex items-center cursor-pointer gap-1"
              >
                <ArrowPathIcon className="w-4 h-4" />
                <Typography
                  variant="small"
                >
                  초기화
                </Typography>
              </div>

              {problemOptionList.map(({ type, isSelected, name }, index) => {
                if (isSelected) {
                  return (
                    <ChipWithSelected
                      key={`${type}_${name}`}
                      size="sm"
                      isSelected
                      value={name}
                      onClick={() => {
                        setProblemOptionList(
                          (prevList) => prevList.slice(0, index)
                            .concat(prevList.slice(index + 1)),
                        );
                      }}
                    />
                  );
                }
                return '';
              })}
            </div>
          </div>
        );
}
