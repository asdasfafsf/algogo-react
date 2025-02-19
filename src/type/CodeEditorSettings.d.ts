type CodeEditorTheme = 'vs-dark' | 'light';
type CodeEditorLineNumber = 'relative' | 'on' | 'off';
type CodeEditorSettings = {
  fontSize: number
  theme: CodeEditorTheme
  lineNumber: CodeEditorLineNumber,
  tabSize: number;
  defaultLanguage: Language;
};
