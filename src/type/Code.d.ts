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
  theme: CodeEditorTheme
  tabSize: number;
  lineNumber: CodeEditorLineNumber;
  defaultLanguage: Language;
};

type RequestSetting = {
  fontSize?: number;
  problemContentRate?: number;
  theme?: CodeEditorTheme
  tabSize?: number;
  lineNumber?: CodeEditorLineNumber;
  defaultLanguage?: Language;
};
