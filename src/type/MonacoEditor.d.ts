type MonacoEditorLanguage
= 'javascript'
| 'cpp'
| 'python'
| 'java';

type Language
= 'Node.js'
| 'C++'
| 'Java'
// | 'Java 17'
| 'Python';
// | 'C++(Clang)';

type LanguageView = {
  [key in Language]: Language;
};

type CodeFromLanguage = {
  [key in Language]: string;
};

type LangugeToMonacoEditorLanguage = {
  [key in Language]: MonacoEditorLanguage;
};
