import { ChevronDownIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '@components/Dropdown/index';
import { Typography } from '@components/common/index';
import {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import useAlertModal from '@hook/useAlertModal';
import { getTemplate } from '@api/code';
import useModal from '@plugins/modal/useModal';
import CodeTemplateAddModal from './CodeTemplateAddModal';

export default function CodeTemplateDropdown() {
  const language = useCodeEditorStore((state) => state.language);
  const templateMap = useRef<Record<string, ResponseTemplate>>({});
  const templateListByLanguage = useRef<Record<Language, ResponseSummaryTemplate[]>>({
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

  const [uuidByLanguage, setUuidByLanguage] = useState<Record<Language, string>>({
    'Node.js': '',
    'C++': '',
    Java: '',
    Python: '',
  });

  const templates = useCodeEditorStore((state) => state.templates);

  useEffect(() => {
    const fetchTemplates = async () => {
      setUuidByLanguage({
        'Node.js': templates.summaryList.find((template) => template.language === 'Node.js')?.uuid ?? '',
        'C++': templates.summaryList.find((template) => template.language === 'C++')?.uuid ?? '',
        Java: templates.summaryList.find((template) => template.language === 'Java')?.uuid ?? '',
        Python: templates.summaryList.find((template) => template.language === 'Python')?.uuid ?? '',
      });

      templateListByLanguage.current['Node.js'] = templates.summaryList.filter((template) => template.language === 'Node.js');
      templateListByLanguage.current['C++'] = templates.summaryList.filter((template) => template.language === 'C++');
      templateListByLanguage.current.Java = templates.summaryList.filter((template) => template.language === 'Java');
      templateListByLanguage.current.Python = templates.summaryList.filter((template) => template.language === 'Python');

      setTemplateList(templateListByLanguage.current[language]);
    };

    fetchTemplates();
  }, [templates]);

  useEffect(() => {
    setTemplateList(templateListByLanguage.current[language]);
  }, [language]);

  const handleChangeTemplate = useCallback(async (uuid: string) => {
    if (!templateMap.current[uuid]) {
      const response = await getTemplate(uuid);

      if (response.statusCode !== 200) {
        await alert(response.errorMessage);
        return;
      }
      templateMap.current[uuid] = response.data;
    }

    setCode(templateMap.current[uuid].content);
    setUuidByLanguage((prev) => ({ ...prev, [language]: uuid }));
    setOpen(false);
  }, [templateMap, setUuidByLanguage]);

  const handleEditTemplate = useCallback((uuid: string) => {
    modal.push('CODE_TEMPLATE_EDIT_MODAL', CodeTemplateEditModal, {
      uuid,
    });
  }, [modal]);

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
          {templateMap.current[uuidByLanguage[language]]?.name || '템플릿 선택'}
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
              className="flex items-center w-full gap-1 p-3 bg-gray-900 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <Typography
                className="text-gray-400 truncate max-w-[100px]"
                weight="semilight"
                variant="medium"
              >
                {elem.name}
              </Typography>
              <div>
                <PencilIcon className="size-4 cursor-context-menu" />
              </div>
            </li>
          )),
          <li
            onClick={() => modal.push('CODE_TEMPLATE_ADD_MODAL', CodeTemplateAddModal, {})}
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
