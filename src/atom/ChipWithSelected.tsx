/* eslint-disable react/jsx-props-no-spreading */
import { Chip, ChipProps } from '@material-tailwind/react';

type ChipWithSelectecdProps = Omit<ChipProps, 'color'> & {
  isSelected: boolean
};

export default function ChipWithSelected({ isSelected, ...props }: ChipWithSelectecdProps) {
  return (
    <div className="flex gap-2 cursor: pointer">
      <Chip
        {...props}
        color={`${isSelected ? 'blue' : 'gray'}`}
      />

    </div>
  );
}
