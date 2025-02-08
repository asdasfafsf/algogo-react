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
    <div className="flex items-center">
      <Logo size={size === 'large' ? size : 'medium'} className="relative top-1" />
      <Typography
        color="blue"
        className="relative top-1 font-Tenada"
        variant={textVarient[size] as Variant}
      >
        <a href="/">
          알고고
        </a>
      </Typography>
    </div>
  );
}
