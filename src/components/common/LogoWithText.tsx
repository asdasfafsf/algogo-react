import Logo from './Logo';
import Typography from './Typography';

interface LogoWithTextProps {
  size: 'small' | 'medium' | 'large'
}
type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'small' | 'medium';

export default function LogoWithText({ size = 'medium' }: LogoWithTextProps) {
  const textVarient = {
    small: 'h3',
    medium: 'h2',
    large: 'h1',
  };

  return (
    <a href="/" className="inline-flex items-center min-w-fit">
      <div className="flex items-center">
        <Logo color="black" size={size} className="relative" />
        <Typography
          color="black"
          className="relative p-0 m-0 font-Tenada top-1"
          variant={textVarient[size] as Variant}
        >
          알고고
        </Typography>
      </div>
    </a>
  );
}
