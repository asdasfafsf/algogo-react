import Chip, { ChipProps } from './Chip';

type ChipWithSelectecdProps = Omit<ChipProps, 'color' | 'variant'> & {
  isSelected: boolean
  onClick: (e: React.MouseEvent<HTMLElement>) => Promise<void> | void;
};

export default function ChipWithSelected({
  isSelected,
  onClick,
  ...props
}: ChipWithSelectecdProps) {
  const color = isSelected ? 'blue' : 'gray';
  return (
    <div
      onClick={onClick}
      className="flex gap-2 cursor-pointer"
    >
      <Chip
        {...props}
        variant={`${isSelected ? 'filled' : 'ghost'}`}
        color={color}
      />

    </div>
  );
}
