import { Tooltip } from 'react-tooltip';
import IconButton, { IconButtonProps } from './IconButton';

interface TooltipIconButtonProps extends IconButtonProps {
  content: string;
}

export default function TooltipIconButton(props: TooltipIconButtonProps) {
  const {
    children, className, content, ...pickProps
  } = props;

  return (
    <Tooltip content={content}>
      <IconButton
        {...pickProps}
        className={className ?? ''}
      >
        {children}
      </IconButton>

    </Tooltip>
  );
}
