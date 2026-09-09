const languages: readonly Language[] = ["Node.js", "C++", "Java", "Python"];

export const groupTemplatesByLanguage = (
  templates: readonly ResponseSummaryTemplate[],
) =>
  Object.fromEntries(
    languages.map((language) => [
      language,
      templates.filter((template) => template.language === language),
    ]),
  ) as Record<Language, ResponseSummaryTemplate[]>;

export const getDefaultTemplateContent = (
  templates: readonly ResponseDefaultTemplate[],
  language: Language,
) => templates.find((template) => template.language === language)?.content;
