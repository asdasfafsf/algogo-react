type ExecuteResult = {
  input: string;
  output: string;
  expected: string;
  state: ExecuteState;
};

type ExecuteState = '일치' | '불일치' | '실행 전';
