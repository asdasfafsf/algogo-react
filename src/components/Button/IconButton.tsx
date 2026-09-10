import { forwardRef, type ComponentProps } from "react";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
export interface IconButtonProps extends Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
> {
  color?:
    "blue" | "red" | "green" | "amber" | "slate" | "gray" | "white" | "black";
  variant?: "filled" | "gradient" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  rounded?: "default" | "full";
}
const colors = {
  blue: "text-blue-600",
  red: "text-red-600",
  green: "text-green-600",
  amber: "text-amber-600",
  slate: "text-slate-700",
  gray: "text-gray-600",
  white: "text-white",
  black: "text-black",
};
const sizes = { small: "size-8", medium: "size-10", large: "size-12" };
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = "black",
      variant = "filled",
      size = "medium",
      rounded = "default",
      className,
      ...props
    },
    ref,
  ) => (
    <Button
      ref={ref}
      variant={
        variant === "filled"
          ? "default"
          : variant === "outlined"
            ? "outline"
            : "ghost"
      }
      size="icon"
      className={cn(
        colors[color],
        sizes[size],
        rounded === "full" && "rounded-full",
        className,
      )}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";
export default IconButton;
