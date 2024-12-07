import React, { useCallback } from 'react';
import { Typography, Tooltip } from '@components/common/index';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
/* eslint-disable-next-line */
import EnterIcon from '/public/assets/enter.svg?react';
/* eslint-disable-next-line */
import SpaceIcon from '/public/assets/space.svg?react';

interface ClipboardWithTooltipProps {
  content: string;
  handleCopyCallback?: (copied: string) => void | Promise<void>;
  className?: string; // 추가적인 Tailwind 클래스명을 전달받기 위한 props
}

export default function ClipboardWithTooltip({
  content,
  handleCopyCallback = () => {},
  className = '',
}: ClipboardWithTooltipProps) {
  const [copied, setCopied] = React.useState(false);

  const handleMouseLeave = useCallback(() => {
    setCopied(false);
  }, []);

  const handleClick = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    handleCopyCallback(content);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      await handleClick();
    }
  };

  return (
    <Tooltip content={copied ? '복사됨' : '복사'}>
      <div
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={`flex justify-start items-center gap-x-3 px-4 py-2.5 lowercase w-full cursor-pointer focus:outline-none bg-black text-white border rounded-md${className}`}
      >
        <div className="w-full">
          {content
            .split(/\n/)
            .map((elem, contentIndex, contentArr) => (
              <div
                key={`${elem}-${contentIndex}`}
                className="flex flex-wrap whitespace-normal break-words w-[calc(100%-10px)]"
              >
                {elem.split(' ').map((text, index, arr) => (
                  <React.Fragment key={`${text}-${index}`}>
                    <Typography
                      className="text-base text-white font-D2Coding"
                      variant="medium"
                    >
                      {text}
                    </Typography>

                    {index < arr.length - 1 ? (
                      <div className="text-blue-500">
                        <SpaceIcon />
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
                {contentIndex < contentArr.length - 1 ? (
                  <div className="w-4 h-4 text-blue-500">
                    <EnterIcon />
                  </div>
                ) : null}
              </div>
            ))}
        </div>
        {copied ? (
          <CheckIcon className="w-4 h-4 text-white" />
        ) : (
          <DocumentDuplicateIcon className="w-4 h-4 text-white" />
        )}
      </div>
    </Tooltip>
  );
}
