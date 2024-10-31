import { Chip, ChipProps } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/chip';

type ChipWithSelectecdProps = Omit<ChipProps, 'color' | 'variant'> & {
  isSelected: boolean
  onClick: (e: React.MouseEvent) => Promise<void> | void;
};

export default function ChipWithSelected({
  isSelected,
  onClick,
  ...props
}: ChipWithSelectecdProps) {
  const color = isSelected ? 'blue' : undefined;
  return (
    <div
      onClick={onClick}
      className="flex gap-2 cursor-pointer"
    >
      <Chip
        {...props}
        variant={`${isSelected ? 'filled' : 'ghost'}`}
        color={color as color}
      />

    </div>
  );
}
