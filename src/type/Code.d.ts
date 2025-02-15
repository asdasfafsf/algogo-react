type RequestSaveCode = {
  problemUuid: string;
  content: string;
  language: Language
};

type ResponseCode = {
  content: string;
};

type ResponseSetting = {
  fontSize: number;
  problemContentRate: number;
  theme: 'vs-dark' | 'light'
  tabSize: number;
  lineNumber: 'on' | 'off' | 'relative',
  defaultLanguage: Language
};

type RequestSetting = {
  fontSize?: number;
  problemContentRate?: number;
  theme?: 'vs-dark' | 'light';
  tabSize?: number;
  lineNumber?: 'on' | 'off' | 'relative',
  defaultLanguage?: Language
};
