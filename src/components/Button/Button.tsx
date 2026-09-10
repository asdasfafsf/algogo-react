import { forwardRef, type MouseEvent, type ReactNode } from "react";
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "@components/ui/button";
import { cn } from "@lib/utils";
type LegacyVariant = "filled" | "gradient" | "outlined" | "text";
type LegacySize = "xsmall" | "small" | "medium" | "large" | "xlarge";
type Color =
  | "blue"
  | "red"
  | "green"
  | "amber"
  | "slate"
  | "gray"
  | "black"
  | "yellow"
  | "white";
interface ButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: LegacyVariant;
  color?: Color;
  size?: LegacySize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  ripple?: boolean;
}
const variants: Record<LegacyVariant, Record<Color, string>> = {
  filled: {
    blue: "bg-primary text-primary-foreground hover:bg-primary/90",
    red: "bg-red-600 text-white hover:bg-red-700",
    green: "bg-green-600 text-white hover:bg-green-700",
    amber: "bg-amber-600 text-white hover:bg-amber-700",
    slate: "bg-slate-800 text-white hover:bg-slate-700",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
    black: "bg-black text-white hover:bg-gray-800",
    yellow: "bg-yellow-400 text-gray-900 hover:bg-yellow-500",
    white: "bg-white text-black hover:bg-gray-100",
  },
  gradient: {
    blue: "bg-linear-to-tr from-blue-600 to-blue-700 text-white",
    red: "bg-linear-to-tr from-red-600 to-red-700 text-white",
    green: "bg-linear-to-tr from-green-600 to-green-700 text-white",
    amber: "bg-linear-to-tr from-amber-600 to-amber-700 text-white",
    slate: "bg-linear-to-tr from-slate-800 to-slate-700 text-white",
    gray: "bg-linear-to-tr from-gray-600 to-gray-700 text-white",
    black: "bg-linear-to-tr from-black to-gray-800 text-white",
    yellow: "bg-linear-to-tr from-yellow-500 to-yellow-600 text-white",
    white: "bg-linear-to-tr from-white to-gray-200 text-black",
  },
  outlined: {
    blue: "border-primary text-primary hover:bg-accent",
    red: "border-red-600 text-red-600 hover:bg-red-50",
    green: "border-green-600 text-green-600 hover:bg-green-50",
    amber: "border-amber-600 text-amber-600 hover:bg-amber-50",
    slate: "border-slate-800 text-slate-800 hover:bg-slate-50",
    gray: "border-gray-500 text-gray-600 hover:bg-gray-50",
    black: "border-black text-black hover:bg-gray-50",
    yellow: "border-yellow-500 text-yellow-600 hover:bg-yellow-50",
    white: "border-white/30 bg-transparent text-white hover:bg-white/10",
  },
  text: {
    blue: "text-primary hover:bg-accent",
    red: "text-red-600 hover:bg-red-50",
    green: "text-green-600 hover:bg-green-50",
    amber: "text-amber-600 hover:bg-amber-50",
    slate: "text-slate-800 hover:bg-slate-100",
    gray: "text-gray-600 hover:bg-gray-100",
    black: "text-black hover:bg-gray-100",
    yellow: "text-yellow-600 hover:bg-yellow-50",
    white: "text-white hover:bg-white/10",
  },
};
const sizes = {
  xsmall: "h-7 px-2 text-xs",
  small: "h-8 px-3 text-xs",
  medium: "h-10 px-6 text-xs",
  large: "h-11 px-7 text-xs",
  xlarge: "h-12 px-8 text-xs",
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      size = "medium",
      color = "black",
      icon,
      iconPosition = "left",
      children,
      className,
      onClick,
      ripple: _,
      ...props
    },
    ref,
  ) => (
    <ShadcnButton
      ref={ref}
      variant={variant === "outlined" ? "outline" : "ghost"}
      className={cn(
        "font-bold uppercase",
        variants[variant][color],
        sizes[size],
        className,
      )}
      onClick={(e: MouseEvent<HTMLButtonElement>) => onClick?.(e)}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </ShadcnButton>
  ),
);
Button.displayName = "Button";
export default Button;
