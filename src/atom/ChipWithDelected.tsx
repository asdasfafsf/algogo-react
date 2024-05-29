/* eslint-disable react/jsx-props-no-spreading */
import { Chip, ChipProps } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/chip';

type ChipWithDeletedProps = Omit<ChipProps, 'color' | 'variant'> & {
  isSelected: boolean
  onClick: (e: React.MouseEvent) => Promise<void> | void;
};

export default function ChipWithDeleted({
  isSelected,
  onClick,
  ...props
}: ChipWithDeletedProps) {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 cursor-pointer"
    >
      <Chip
        {...props}
        variant={`${isSelected ? 'filled' : 'ghost'}`}
        color={`${isSelected ? 'blue' : '' as color}`}
      />

    </div>
  );
}
