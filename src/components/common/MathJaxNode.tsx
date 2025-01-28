import React from 'react';
import MathJax from 'react-mathjax';

const decodeHtmlEntities = (str: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
};
const parseMathAndText = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/); // $ 또는 $$로 감싸진 수식을 추출
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const formula = part.slice(2, -2); // $$를 제거하고 수식으로 처리
      return <MathJax.Node key={`formula-${index}`} formula={formula} />;
    } if (part.startsWith('$') && part.endsWith('$')) {
      const formula = part.slice(1, -1); // $를 제거하고 인라인 수식으로 처리
      return <MathJax.Node inline key={`inline-formula-${index}`} formula={formula} />;
    }
    return <span key={`text-${index}`}>{decodeHtmlEntities(part)}</span>; // 일반 텍스트 처리
  });
};

interface MathJaxProps {
  children: string;
}
export default function MathJaxNode({ children }: MathJaxProps) {
  return (parseMathAndText(children));
}
