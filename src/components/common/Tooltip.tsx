import React, { useState, cloneElement, ReactElement } from 'react';

export function Tooltip(props: {
  children: ReactElement;
  content: string;
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  animation?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const {
    children,
    content,
    placement = 'top',
    animation = true,
    isOpen: controlledIsOpen,
    onOpenChange,
  } = props;

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleMouseEnter = () => {
    if (!isControlled) {
      setInternalIsOpen(true);
    }
    if (onOpenChange) {
      onOpenChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isControlled) {
      setInternalIsOpen(false);
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    'left-start': 'right-full top-0 mr-2',
    'left-end': 'right-full bottom-0 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    'right-start': 'left-full top-0 ml-2',
    'right-end': 'left-full bottom-0 ml-2',
  };

  const animationClasses = animation
    ? 'transition-all duration-200 ease-in-out'
    : '';

  const childElement = cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(e);
      }
      handleMouseEnter();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(e);
      }
      handleMouseLeave();
    },
  });

  return (
    <div className="relative">
      {childElement}
      {isOpen && (
        <div
          className={`absolute z-50 whitespace-nowrap rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white ${positions[placement]} ${animationClasses}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default React.memo(Tooltip);
