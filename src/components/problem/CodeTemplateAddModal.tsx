import { useCallback, useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';
import { Button } from '@components/Button/index';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import { languageList, monocoLanguageMap } from '@constant/Language';
import Editor from '@monaco-editor/react';
import { createTemplate, deleteTemplate, updateTemplate } from '@api/code';
import useAlertModal from '@hook/useAlertModal';
import useConfirmModal from '@hook/useConfirmModal';
import { Checkbox } from '../Checkbox';

interface CodeTemplateAddModalProps {
  title?: string;
  language?: Language;
  uuid?: string;
  isEdit?: boolean;
  modalKey: string;
  description?: string;
  content?: string;
  name?: string;
}

export default function CodeTemplateAddModal({
  title = '코드 템플릿 추가',
  language = 'Python',
  uuid = '',
  isEdit = false,
  modalKey,
  name = '',
  description = '',
  content = '',
}: CodeTemplateAddModalProps) {
  const settings = useCodeEditorStore((state) => state.settings);
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [templateName, setTemplateName] = useState(name);
  const [templateDescription, setTemplateDescription] = useState(description);
  const [templateLanguage, setTemplateLanguage] = useState<Language>(language);
  const [templateContent, setTemplateContent] = useState(content);
  const [isDefault, setIsDefault] = useState(false);
  const loadTemplates = useCodeEditorStore((state) => state.loadTemplates);
  const [confirm] = useConfirmModal();

  const [alert] = useAlertModal();
  const handleClose = useCallback(() => {
    setIsVisible(false);
    modal.remove(modalKey);
  }, [modal]);

  useEffect(() => {
    setIsVisible(true);

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (modal?.top()?.key === modalKey) {
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [handleClose, modal]);

  const handleDelete = useCallback(async () => {
    const isOk = await confirm('정말 삭제하시겠습니까?');

    if (!isOk) return;
    const response = await deleteTemplate(uuid);

    if (response.statusCode !== 200) {
      await alert(response.errorMessage);
      return;
    }

    await loadTemplates();
    await alert('코드 템플릿이 삭제되었습니다.');
    handleClose();
  }, [uuid, handleClose, confirm]);

  const handleSubmit = useCallback(async () => {
    if (!templateName.trim() || !templateContent.trim()) return;

    const dto = {
      name: templateName,
      description: templateDescription,
      language: templateLanguage,
      content: templateContent,
      isDefault,
    };

    if (!templateName.trim()) {
      await alert('템플릿 이름을 입력해주세요.');
      return;
    }

    if (!templateContent.trim()) {
      await alert('템플릿 코드를 입력해주세요.');
      return;
    }

    if (!templateContent.trim()) {
      await alert('템플릿 코드를 입력해주세요.');
      return;
    }

    if (isEdit) {
      const response = await updateTemplate({ ...dto, uuid });
      if (response.statusCode === 200) {
        await alert(response.errorMessage);
        handleClose();

        return;
      }

      await alert('코드 템플릿이 수정되었습니다.');
    } else {
      const response = await createTemplate(dto);
      if (response.statusCode !== 200) {
        await alert(response.errorMessage);
        handleClose();

        return;
      }

      await alert('코드 템플릿이 생성되었습니다.');
    }
    await loadTemplates();
    handleClose();
  }, [handleClose,
    templateName,
    templateContent,
    templateLanguage,
    templateDescription,
    isDefault]);

  return (
    <TranslucentOverlay
      className={`z-50 flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        role="dialog"
        aria-labelledby="template-title"
        className="w-[560px] bg-white rounded-2xl shadow-xl animate-in fade-in duration-200"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 id="template-title" className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>

        <div className="px-8 py-6 space-y-5">
          <div>
            <label htmlFor="templateName" className="block mb-2 text-sm font-medium text-gray-700">
              템플릿 이름
            </label>
            <input
              id="templateName"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] transition-all duration-200"
              placeholder="템플릿 이름을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="templateDescription" className="block mb-2 text-sm font-medium text-gray-700">
              설명
            </label>
            <input
              id="templateDescription"
              type="text"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] transition-all duration-200"
              placeholder="템플릿 설명을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="templateLanguage" className="block mb-2 text-sm font-medium text-gray-700">
              언어
            </label>
            <select
              id="templateLanguage"
              value={templateLanguage}
              onChange={(e) => setTemplateLanguage(e.target.value as Language)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] transition-all duration-200 bg-white"
            >
              {languageList.map((elem) => (
                <option key={elem} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="templateContent" className="block mb-2 text-sm font-medium text-gray-700">
              템플릿 코드
            </label>
            <div className="relative h-[300px] border border-gray-200 rounded-xl overflow-hidden">
              <Editor
                height="100%"
                language={monocoLanguageMap[templateLanguage]}
                className="h-full"
                theme="vs-dark"
                value={templateContent}
                onChange={(value) => value && setTemplateContent(value)}
                options={{
                  insertSpaces: true,
                  lineNumbers: settings.lineNumber,
                  contextmenu: false,
                  fontSize: settings.fontSize,
                  tabSize: settings.tabSize,
                  minimap: { enabled: false },
                  scrollbar: { vertical: 'auto', horizontal: 'auto' },
                  codeLens: false,
                  autoIndent: 'advanced',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
            <label htmlFor="isDefault" className="text-sm font-medium text-gray-700 cursor-pointer">
              기본 템플릿으로 설정
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-4 pb-4 mx-4">
          <Button onClick={handleClose} color="gray">
            취소
          </Button>
          {isEdit
          && <Button onClick={handleDelete} color="red">삭제</Button>}
          <Button onClick={handleSubmit} color="blue">
            {isEdit ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
