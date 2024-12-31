import { Typography } from '@components/common';
import { SelectBox, SelectBoxItem } from '@components/SelectBox';
import { useCallback, useState } from 'react';

export default function CodeEditorProblemResizer() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleSelect = useCallback((_: unknown, index: number) => {
    setSelectedIndex(index);
  }, []);
  return (
    <div className="flex">
      <div className="flex w-20 py-2">
        <Typography
          weight="semibold"
          variant="medium"
        >
          글자 크기
        </Typography>
      </div>
      <SelectBox className="h-24 w-36">
        {[80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200].map((elem, index) => (
          <SelectBoxItem
            onClick={(e) => handleSelect(e, index)}
            className={`${selectedIndex === index ? 'bg-blue-300 text-white' : ''} cursor-pointer`}
            key={elem}
          >
            <Typography
              weight="semilight"
              variant="medium"
            >
              {elem}
              %
            </Typography>
          </SelectBoxItem>
        ))}
      </SelectBox>
      {/* <MagnifyingGlassMinusIcon className="w-6 h-6" />
      <Typography variant="small">100%</Typography>
      <MagnifyingGlassPlusIcon className="w-6 h-6" /> */}
    </div>
  );
}
