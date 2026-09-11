import { useCallback, useEffect, useState } from "react";
import { getTemplate } from "@api/code";
import useAlertModal from "@hook/useAlertModal";
import useModal from "@plugins/modal/useModal";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import { groupTemplatesByLanguage } from "@/domain/editor/templates";
import { templateLoadFailureMessage } from "@/domain/editor/templateForm";
import type { FunctionComponent } from "react";
import type { CodeTemplateAddModalProps } from "@components/problem/CodeTemplateAddModal";

const emptyLanguageMap = <T>(value: T): Record<Language, T> => ({
  "Node.js": value,
  "C++": value,
  Java: value,
  Python: value,
});

export default function useCodeTemplateDropdown(
  templateModal: FunctionComponent<CodeTemplateAddModalProps>,
) {
  const language = useCodeEditorStore((state) => state.language);
  const templates = useCodeEditorStore((state) => state.templates);
  const setCode = useCodeEditorStore((state) => state.setCode);
  const modal = useModal();
  const [alert] = useAlertModal();
  const [open, setOpen] = useState(false);
  const [templateMap, setTemplateMap] = useState<
    Record<string, ResponseTemplate>
  >({});
  const [templateListByLanguage, setTemplateListByLanguage] = useState<
    Record<Language, ResponseSummaryTemplate[]>
  >(emptyLanguageMap([]));
  const [templateList, setTemplateList] = useState<ResponseSummaryTemplate[]>(
    [],
  );
  const [titleByLanguage, setTitleByLanguage] = useState<
    Record<Language, string>
  >(emptyLanguageMap(""));

  useEffect(() => {
    setTemplateMap({});
    setTitleByLanguage({
      "Node.js":
        templates.defaultList.find((item) => item.language === "Node.js")
          ?.name ??
        templates.summaryList.find((item) => item.language === "Node.js")
          ?.name ??
        "",
      "C++":
        templates.defaultList.find((item) => item.language === "C++")?.uuid ??
        templates.summaryList.find((item) => item.language === "C++")?.uuid ??
        "",
      Java:
        templates.defaultList.find((item) => item.language === "Java")?.uuid ??
        templates.summaryList.find((item) => item.language === "Java")?.uuid ??
        "",
      Python:
        templates.defaultList.find((item) => item.language === "Python")
          ?.uuid ??
        templates.summaryList.find((item) => item.language === "Python")
          ?.uuid ??
        "",
    });
    const grouped = groupTemplatesByLanguage(templates.summaryList);
    setTemplateListByLanguage(grouped);
    setTemplateList(grouped[language]);
  }, [templates]);

  useEffect(
    () => setTemplateList(templateListByLanguage[language]),
    [language],
  );

  const loadTemplate = useCallback(
    async (uuid: string) => {
      const cached = templateMap[uuid];
      if (cached) return cached;
      try {
        const response = await getTemplate(uuid);
        if (response.statusCode !== 200) {
          await alert(templateLoadFailureMessage);
          return null;
        }
        setTemplateMap((previous) => ({ ...previous, [uuid]: response.data }));
        return response.data;
      } catch {
        await alert(templateLoadFailureMessage);
        return null;
      }
    },
    [alert, templateMap],
  );

  const handleChangeTemplate = useCallback(
    async (uuid: string) => {
      const template = await loadTemplate(uuid);
      if (!template) return;
      setCode(`${template.content}`);
      setTitleByLanguage((previous) => ({
        ...previous,
        [language]: template.name,
      }));
      setOpen(false);
    },
    [language, loadTemplate, setCode],
  );

  const handleEditTemplate = useCallback(
    async (uuid: string) => {
      const template = await loadTemplate(uuid);
      if (!template) return;
      await modal.push("CODE_TEMPLATE_EDIT_MODAL", templateModal, {
        language,
        uuid,
        isEdit: true,
        title: "코드 템플릿 수정/삭제",
        description: template.description,
        content: template.content,
        name: template.name,
      });
    },
    [language, loadTemplate, modal, templateModal],
  );

  const handleAddTemplate = useCallback(() => {
    const { code } = useCodeEditorStore.getState();
    void modal.push("CODE_TEMPLATE_ADD_MODAL", templateModal, {
      language,
      content: code,
    });
  }, [language, modal, templateModal]);

  return {
    language,
    open,
    handleOpenChange: setOpen,
    templateList,
    title: titleByLanguage[language] || "템플릿 선택",
    handleChangeTemplate,
    handleEditTemplate,
    handleAddTemplate,
  };
}
