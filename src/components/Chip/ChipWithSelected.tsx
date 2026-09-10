import Chip, { ChipProps } from "./Chip";
import { Button } from "@components/ui/button";

type ChipWithSelectecdProps = Omit<ChipProps, "color" | "variant"> & {
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => Promise<void> | void;
};

export default function ChipWithSelected({
  isSelected,
  onClick,
  ...props
}: ChipWithSelectecdProps) {
  const color = isSelected ? "blue" : "gray";
  return (
    <Button
      variant="ghost"
      aria-pressed={isSelected}
      onClick={onClick}
      className="h-auto cursor-pointer p-0 font-normal hover:bg-transparent"
    >
      <Chip
        {...props}
        variant={`${isSelected ? "filled" : "ghost"}`}
        color={color}
      />
    </Button>
  );
}
