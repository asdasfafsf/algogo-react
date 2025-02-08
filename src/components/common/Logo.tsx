interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  color?: string;
}

const sizeMap = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
};

export default function Logo({ size = 'medium', className = '', color = 'blue-500' }: LogoProps) {
  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <div className="relative flex items-center justify-center w-full h-full rounded-full">
        {/* Left Bracket */}
        <div className={`absolute left-[20%] w-[25%] h-[60%] border-2 border-r-0 border-${color} rounded-l-md animate-pulse`} />
        {/* Right Bracket */}
        <div className={`absolute right-[20%] w-[25%] h-[60%] border-2 border-l-0 border-${color} rounded-r-md animate-pulse`} />
        {/* Center Dot */}
        <div className={`w-[20%] h-[20%] bg-${color} rounded-full animate-bounce`} />
      </div>
    </div>
  );
}
