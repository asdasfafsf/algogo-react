import { Typography } from '@components/common';
import { SelectBox, SelectBoxItem } from '@components/SelectBox';

interface CodeEditorProblemResizerProps {
  handleSelect: (e: unknown, index: number) => void | Promise<void>,
  selectedIndex: number;
}

export default function CodeEditorProblemResizer({
  selectedIndex,
  handleSelect,
} : CodeEditorProblemResizerProps) {
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
        {[100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200].map((elem, index) => (
          <SelectBoxItem
            onClick={(e) => handleSelect(e, elem)}
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
