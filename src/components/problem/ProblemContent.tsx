import React from 'react';
import MathJax from 'react-mathjax';

interface ProblemContentProps {
  content: string;
  scale?: number;
}

export default function ProblemContent({ content, scale = 1 }: ProblemContentProps) {
  return (
    <>
      <style>
        {`
          .problem-content p {
            border-radius: 0px;
            box-sizing: border-box;
            color: rgb(85, 85, 85);
            display: block;
            font-family: "Open Sans", -apple-system, "system-ui", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans CJK KR", "Noto Sans KR", 나눔바른고딕, 나눔고딕, 맑은고딕, "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 16px;
            line-height: 30px;
            margin: 0px 0px 10px 0px;
            padding: 0px;
            text-size-adjust: 100%;
          }
          
          .problem-content pre {
            display: block;
            padding: 9.5px;
            margin: 0 0 10px;
            font-size: 13px;
            line-height: 1.42857143;
            color: #333;
            word-break: break-all;
            word-wrap: break-word;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        `}
      </style>

      <MathJax.Provider>
        <div
          className="w-full problem-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </MathJax.Provider>
    </>
  );
}
