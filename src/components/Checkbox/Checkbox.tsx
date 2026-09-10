import { useId, type MouseEvent } from "react";
import { Checkbox as PrimitiveCheckbox } from "@components/ui/checkbox";
import { cn } from "@lib/utils";
type Color =
  | "blue"
  | "indigo"
  | "red"
  | "amber"
  | "green"
  | "teal"
  | "purple"
  | "pink"
  | "gray";
interface CheckboxProps {
  className?: string;
  color?: Color;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  onCheckedChange?: (checked: boolean) => void | Promise<void>;
  onClick?: (e: MouseEvent) => void | Promise<void>;
}
const colors: Record<Color, string> = {
  blue: "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500",
  indigo:
    "data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500",
  red: "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500",
  amber:
    "data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500",
  green:
    "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
  teal: "data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500",
  purple:
    "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500",
  pink: "data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500",
  gray: "data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500",
};
export default function Checkbox({
  className,
  color = "blue",
  checked,
  disabled = false,
  label,
  id,
  onCheckedChange,
  onClick,
}: CheckboxProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <PrimitiveCheckbox
        id={fieldId}
        checked={checked}
        disabled={disabled}
        aria-label={label}
        className={cn(colors[color], className)}
        onClick={onClick}
        onCheckedChange={(next) => void onCheckedChange?.(next === true)}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
