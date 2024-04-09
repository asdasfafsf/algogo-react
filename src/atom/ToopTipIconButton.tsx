/* eslint-disable react/jsx-props-no-spreading */
import { IconButton, IconButtonProps, Tooltip } from '@material-tailwind/react';
import { Ref } from 'react';

interface TooltipIconButtonProps extends IconButtonProps {
  content: string;
}

export default function TooltipIconButton(props: TooltipIconButtonProps) {
  const {
    children, className, content, ref, ...pickProps
  } = props;

  const convertedRef = ref as Ref<HTMLButtonElement>;
  return (
    <Tooltip content={content}>
      <IconButton
        ref={convertedRef}
        {...pickProps}
        className={className ?? ''}
      >
        {children}
      </IconButton>

    </Tooltip>
  );
}
