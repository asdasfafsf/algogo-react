import BrandLogo from "@components/brand/Logo";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
  color?: string;
}

const sizeMap = {
  small: "sm",
  medium: "md",
  large: "lg",
} as const;

export default function Logo({ size = "medium", className = "" }: LogoProps) {
  return (
    <BrandLogo size={sizeMap[size]} showText={false} className={className} />
  );
}
