import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface WrappedTooltipProps {
  className?: string;
  children: React.ReactElement;
  content: string;
  placement?:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';
}

function Tooltip({
  children,
  content,
  className = '',
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
      <ReactTooltip
        id={id}
        className={className}
        style={{
          position: 'absolute', // 부모 overflow 무시
          zIndex: 10, // 다른 요소 위에 렌더링
        }}
        {...props}
      />
    </>
  );
}

export default React.memo(Tooltip);
