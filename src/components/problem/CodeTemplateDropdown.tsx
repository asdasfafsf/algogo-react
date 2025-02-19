import { ChevronDownIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '@components/Dropdown/index';
import { Typography } from '@components/common/index';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import useAlertModal from '@hook/useAlertModal';
import { getTemplate } from '@api/code';
import useModal from '@plugins/modal/useModal';
import CodeTemplateAddModal from './CodeTemplateAddModal';

export default function CodeTemplateDropdown() {
  const language = useCodeEditorStore((state) => state.language);
  const [templateMap, setTemplateMap] = useState<Record<string, ResponseTemplate>>({});
  const [templateListByLanguage, setTemplateListByLanguage] = useState<
  Record<Language, ResponseSummaryTemplate[]>
  >({
    'Node.js': [],
    'C++': [],
    Java: [],
    Python: [],
  });
  const modal = useModal();
  const [alert] = useAlertModal();
  const setCode = useCodeEditorStore((state) => state.setCode);
  const [open, setOpen] = useState(false);
  const handler = useCallback(() => setOpen((open) => !open), [setOpen]);
  const [templateList, setTemplateList] = useState<ResponseSummaryTemplate[]>([]);

  const [titleByLanguage, setTitleByLanguage] = useState<Record<Language, string>>({
    'Node.js': '',
    'C++': '',
    Java: '',
    Python: '',
  });

  const templates = useCodeEditorStore((state) => state.templates);

  useEffect(() => {
    const fetchTemplates = async () => {
      setTitleByLanguage({
        'Node.js': templates.defaultList.find((template) => template.language === 'Node.js')?.name
          ?? templates.summaryList.find((template) => template.language === 'Node.js')?.name ?? '',
        'C++': templates.defaultList.find((template) => template.language === 'C++')?.uuid
          ?? templates.summaryList.find((template) => template.language === 'C++')?.uuid ?? '',
        Java: templates.defaultList.find((template) => template.language === 'Java')?.uuid
          ?? templates.summaryList.find((template) => template.language === 'Java')?.uuid ?? '',
        Python: templates.defaultList.find((template) => template.language === 'Python')?.uuid
          ?? templates.summaryList.find((template) => template.language === 'Python')?.uuid ?? '',
      });

      setTemplateListByLanguage({
        'Node.js': templates.summaryList.filter((template) => template.language === 'Node.js'),
        'C++': templates.summaryList.filter((template) => template.language === 'C++'),
        Java: templates.summaryList.filter((template) => template.language === 'Java'),
        Python: templates.summaryList.filter((template) => template.language === 'Python'),
      });

      setTemplateList(templates.summaryList.filter((template) => template.language === language));
    };

    fetchTemplates();
  }, [templates, setTemplateListByLanguage]);

  useEffect(() => {
    setTemplateList(templateListByLanguage[language]);
  }, [language]);

  const handleChangeTemplate = useCallback(async (uuid: string) => {
    if (!templateMap[uuid]) {
      const response = await getTemplate(uuid);

      if (response.statusCode !== 200) {
        await alert(response.errorMessage);
        return;
      }
      setTemplateMap((prev) => ({ ...prev, [uuid]: response.data }));
      setCode(`${response.data.content}`);
      setTitleByLanguage((prev) => ({ ...prev, [language]: response.data.name }));
    } else {
      setCode(`${templateMap[uuid].content}`);
      setTitleByLanguage((prev) => ({ ...prev, [language]: templateMap[uuid].name }));
    }

    setOpen(false);
  }, [language, templateMap, setTitleByLanguage]);

  const handleEditTemplate = useCallback(async (uuid: string) => {
    let template = templateMap[uuid];

    if (!template) {
      const response = await getTemplate(uuid);

      if (response.statusCode !== 200) {
        await alert(response.errorMessage);
        return;
      }
      setTemplateMap((prev) => ({ ...prev, [uuid]: response.data }));
      template = response.data;
    }

    await modal.push('CODE_TEMPLATE_EDIT_MODAL', CodeTemplateAddModal, {
      language,
      uuid,
      isEdit: true,
      modalKey: 'CODE_TEMPLATE_EDIT_MODAL',
      title: '코드 템플릿 수정/삭제',
      description: template.description,
      content: template.content,
      name: template.name,
    });
  }, [modal, language, templateMap]);

  const handleAddTemplate = useCallback(() => {
    const { code } = useCodeEditorStore.getState();
    modal.push('CODE_TEMPLATE_ADD_MODAL', CodeTemplateAddModal, {
      language,
      modalKey: 'CODE_TEMPLATE_ADD_MODAL',
      content: code,
    });
  }, [modal, language]);

  return (
    <Dropdown
      handler={handler}
      open={open}
      className="p-0 bg-gray-900 border-gray-800 rounded-md"
      showArrow={false}
    >
      <div
        className="flex w-36 h-10 items-center justify-between border-gray-800 rounded-md border-solid border-[1px] py-2 px-4 cursor-pointer"
      >
        <Typography
          className="text-gray-400 truncate max-w-[80px]"
          weight="semilight"
          variant="medium"
        >
          {titleByLanguage[language] || '템플릿 선택'}
        </Typography>
        <ChevronDownIcon
          strokeWidth={2.5}
          className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <ul className="p-0 bg-gray-900 rounded-sm w-36">
        {[
          templateList.map((elem) => (
            <li
              key={elem.uuid}
              onClick={() => handleChangeTemplate(elem.uuid)}
              className="flex items-center justify-between w-full gap-1 p-3 bg-gray-900 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <Typography
                className="text-gray-400 truncate max-w-[100px]"
                weight="semilight"
                variant="medium"
              >
                {elem.name}
              </Typography>
              <div
                className="w-4 cursor-context-menu hover:text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTemplate(elem.uuid);
                }}
              >
                <PencilIcon className="size-4" />
              </div>
            </li>
          )),
          <li
            onClick={handleAddTemplate}
            key="추가하기"
            className="flex items-center w-full gap-1 p-3 bg-gray-900 rounded-md cursor-crosshair hover:bg-gray-600"
          >
            <PlusIcon className="size-4" />
            <Typography
              className="text-gray-400"
              weight="semilight"
              variant="medium"
            >
              추가하기
            </Typography>
          </li>,
        ]}
      </ul>
    </Dropdown>
  );
}
