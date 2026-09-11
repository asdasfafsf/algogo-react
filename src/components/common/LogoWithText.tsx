import BrandLogo from "@components/brand/Logo";

interface LogoWithTextProps {
  size?: "small" | "medium" | "large";
}

const sizeMap = {
  small: "sm",
  medium: "md",
  large: "lg",
} as const;

export default function LogoWithText({ size = "medium" }: LogoWithTextProps) {
  return (
    <a href="/" className="inline-flex items-center min-w-fit">
      <BrandLogo size={sizeMap[size]} className="text-foreground" />
    </a>
  );
}
