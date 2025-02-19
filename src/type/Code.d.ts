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

type RequestCreateTemplate = {
  name: string;
  description: string;
  language: Language;
  content: string;
  isDefault: boolean;
};

type RequestUpdateTemplate = RequestCreateTemplate & {
  uuid: string;
};

type ResponseTemplate = {
  uuid: string;
  name: string;
  description: string;
  language: Language;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type ResponseTemplates = {
  defaultList: ResponseDefaultTemplate[];
  summaryList: ResponseSummaryTemplate[];
};

type ResponseDefaultTemplate = {
  uuid: string;
  name: string;
  description: string;
  language: Language;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type ResponseSummaryTemplate = {
  uuid: string;
  name: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
};
