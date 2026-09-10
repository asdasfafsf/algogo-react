import type { MouseEvent } from "react";
import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage,
} from "@components/ui/avatar";
import { cn } from "@lib/utils";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  variant?: "circular" | "rounded" | "square";
  borderColor?:
    | "blue"
    | "red"
    | "green"
    | "amber"
    | "slate"
    | "gray"
    | "white"
    | "black"
    | "none";
  withBorder?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}
const sizes = { small: "size-8", medium: "size-10", large: "size-12" };
const variants = {
  circular: "rounded-full",
  rounded: "rounded-md",
  square: "rounded-none",
};
const borders = {
  blue: "border-blue-600",
  red: "border-red-600",
  green: "border-green-600",
  amber: "border-amber-600",
  slate: "border-slate-600",
  gray: "border-gray-600",
  white: "border-white",
  black: "border-black",
  none: "border-transparent",
};

export default function Avatar({
  src,
  alt = "avatar",
  size = "medium",
  variant = "circular",
  borderColor = "none",
  withBorder = false,
  className,
  onClick,
}: AvatarProps) {
  return (
    <AvatarRoot
      className={cn(
        sizes[size],
        variants[variant],
        withBorder && "border",
        withBorder && borders[borderColor],
        className,
      )}
      onClick={onClick}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback aria-label={alt}>
        {alt.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </AvatarRoot>
  );
}
