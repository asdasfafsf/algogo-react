# ALGOGO-185: 문서 데이터의 React 렌더링

## 문제

수집기가 만든 MathJax HTML/CSS를 주입하는 방식은 수집 비용과 화면 표현이 결합된다.

## 결정

제한된 문서 노드를 React로 만들고 MathJax는 브라우저에서 처리한다.

## 검토한 대안과 이유

Markdown 변환은 표 병합, 중첩 목록, 예제 공백 같은 원본 의미를 잃을 수 있다. 범용 HTML AST 전체를 허용하는 대신 필요한 태그/속성만 받아들이고 텍스트를 React가 이스케이프한다. ui/safe로 TeX가 생성하는 링크도 제한한다. 404만 v2로 폴백해 단계적 수집을 지원한다.

## 참고

- [계약과 적용 순서](../problem-v3.md)
- [MathJax 3.2 safe extension](https://docs.mathjax.org/en/v3.2/options/safe.html)
