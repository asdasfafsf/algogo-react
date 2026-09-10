import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Input as ShadcnInput } from "@components/ui/input";
import { cn } from "@lib/utils";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, icon, ...props }, ref) => {
    const generated = useId();
    const fieldId = id ?? generated;
    return (
      <div className="relative w-full">
        <ShadcnInput
          ref={ref}
          id={fieldId}
          className={cn(
            "peer h-11 px-3 text-center text-xs md:text-left",
            label && "placeholder:text-transparent",
            icon && "pr-10",
            className,
          )}
          placeholder={label ? " " : props.placeholder}
          {...props}
        />
        {label && (
          <label
            htmlFor={fieldId}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-background px-1 text-sm text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-foreground peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            {label}
          </label>
        )}
        {icon && (
          <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
export default Input;
