interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
  color?: string;
}

const sizeMap = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-16 h-16",
};

export default function Logo({ size = "medium", className = "" }: LogoProps) {
  return (
    <div
      className={`relative ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute left-[15%] h-[70%] w-[30%] rounded-l-md border-2 border-r-0 border-current" />
        <div className="absolute right-[15%] h-[70%] w-[30%] rounded-r-md border-2 border-l-0 border-current" />
        <div className="h-[25%] w-[25%] rounded-full bg-current" />
      </div>
    </div>
  );
}
