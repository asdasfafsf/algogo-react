import React, { useCallback } from 'react';
import { Typography, Button, Tooltip } from '@material-tailwind/react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
/* eslint-disable-next-line */
import EnterIcon from '/public/assets/enter.svg?react';
/* eslint-disable-next-line */
import SpaceIcon from '/public/assets/space.svg?react';

interface ClipboardWithTooltipProps {
  content: string;
  handleCopyCallback?: (copied: string) => void | Promise<void>
}

export default function ClipboardWithTooltip(
  { content, handleCopyCallback = () => {} }: ClipboardWithTooltipProps,
) {
  const [copied, setCopied] = React.useState(false);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCopied(false);
    e.currentTarget.blur();
  }, []);

  return (
    <Tooltip content={copied ? '복사됨' : '복사'}>
      <Button
        onMouseLeave={handleMouseLeave}
        onClick={async () => {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          handleCopyCallback(content);
        }}
        className="flex justify-start items-center gap-x-3 px-4 py-2.5 lowercase w-full"
      >
        <div className="w-full">

          {
            content
              .split(/\n/)
              .map((elem, contentIndex, contentArr) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`${elem}-${contentIndex}`} className="flex flex-wrap whitespace-normal break-words w-[calc(100%-10px)]">
                  {elem
                    .split(' ')
                    .map((text, index, arr) => (
                      <React.Fragment key={`${text}-${index}`}>
                        <Typography
                          className="font-D2Coding"
                          variant="small"
                        >
                          {text}
                        </Typography>

                        {index < arr.length - 1
                          ? (
                            <div className="text-blue-500 ">
                              <SpaceIcon />
                            </div>
                          )
                          : ''}
                      </React.Fragment>
                    ))}
                  {contentIndex < contentArr.length - 1
                    ? (
                      <div className="w-4 h-4 text-blue-500">
                        <EnterIcon />
                      </div>
                    ) : ''}

                </div>
              ))
          }

        </div>
        {copied ? (
          <CheckIcon className="w-4 h-4 text-white" />
        ) : (
          <DocumentDuplicateIcon className="w-4 h-4 text-white" />
        )}
      </Button>
    </Tooltip>
  );
}
