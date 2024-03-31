export const LANGUAGE_LIST: Language[] = ['C++', 'Node.js', 'Java 11', 'Python 3'] as const;
export const LANGUAGE_MAP: LanguageView = Object.freeze({
  'Node.js': 'javascript',
  'C++': 'cpp',
  'Java 11': 'java',
  'Python 3': 'python',
});
