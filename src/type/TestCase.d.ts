type TestCase = {
  input: string;
  output: string;
  expected: string;
  state: '실행 전' | '일치' | '불일치',
  readOnly?: boolean;
};
