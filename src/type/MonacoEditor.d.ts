type MonacoEditorLanguage
= 'javascript'
| 'cpp'
| 'java'
| 'python';

type Language
= 'Node.js'
| 'C++'
| 'Java 11'
| 'Python 3';

type LanguageView = {
  [key in Language]: MonacoEditorLanguage;
};
