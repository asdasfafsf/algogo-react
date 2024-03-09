import React from 'react';
import { Typography, Button, Tooltip } from '@material-tailwind/react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Line from './Line';

interface ClipboardWithTooltipProps {
  content: string;
}

export default function ClipboardWithTooltip({ content }: ClipboardWithTooltipProps) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Tooltip content={copied ? '복사됨' : '복사'}>
      <Button
        onMouseLeave={() => setCopied(false)}
        onClick={async () => {
          await navigator.clipboard.writeText(content);
          setCopied(true);
        }}
        className="flex justify-start items-center gap-x-3 px-4 py-2.5 lowercase w-full"
      >
        <div className="w-full">

          {
            content
              .split(/\n/)
              .map((elem, contentIndex, contentArr) => (
                <div className="flex flex-wrap whitespace-normal break-words w-[calc(100%-10px)]">
                  {elem
                    .split(' ')
                    .map((text, index, arr) => (
                      <>
                        <Typography
                          className="font-normal"
                          variant="small"
                        >
                          {text}
                        </Typography>

                        {index < arr.length - 1
                          ? (
                            <Typography
                              className="font-thin text-orange-500"
                              variant="small"
                            >
                              ■
                            </Typography>
                          )
                          : ''}
                      </>
                    ))}
                  {contentIndex < contentArr.length - 1 ? <Line className="opacity-0 py-1" /> : ''}

                </div>
              ))
        }

        </div>
        {copied ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : (
          <DocumentDuplicateIcon className="h-4 w-4 text-white" />
        )}
      </Button>
    </Tooltip>
  );
}
