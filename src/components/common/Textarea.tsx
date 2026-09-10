import { forwardRef, useId, type ComponentProps } from "react";
import { Textarea as ShadcnTextarea } from "@components/ui/textarea";
import { cn } from "@lib/utils";
const variants = {
  static: "rounded-none border-x-0 border-t-0",
  standard: "rounded-none border-x-0 border-t-0",
  outlined: "",
};
const sizes = {
  medium: "min-h-[100px] text-sm",
  large: "min-h-[150px] text-base",
};
const colors = {
  gray: "focus-visible:border-gray-900",
  purple: "focus-visible:border-purple-500",
  red: "focus-visible:border-red-500",
  green: "focus-visible:border-green-500",
};
interface TextAreaProps extends ComponentProps<"textarea"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  label?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      color = "gray",
      label = "",
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generated = useId();
    const fieldId = id ?? generated;
    return (
      <div className="relative w-full min-w-[200px]">
        {label && (
          <label
            htmlFor={fieldId}
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            {label}
          </label>
        )}
        <ShadcnTextarea
          ref={ref}
          id={fieldId}
          disabled={disabled}
          className={cn(
            "resize-none text-blue-gray-700",
            variants[variant],
            sizes[size],
            colors[color],
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
export default Textarea;
