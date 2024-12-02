import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface WrappedTooltipProps {
  children: React.ReactElement;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

function Tooltip({
  children,
  content,
  placement = 'top',
  ...props
}: WrappedTooltipProps) {
  const id = React.useId();

  return (
    <>
      {React.cloneElement(children, {
        'data-tooltip-id': id,
        'data-tooltip-content': content,
        'data-tooltip-place': placement,
      })}
      <ReactTooltip id={id} {...props} />
    </>
  );
}

export default Tooltip;
