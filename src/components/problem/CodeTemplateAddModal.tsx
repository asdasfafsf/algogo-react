import { useCallback, useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';
import { Button } from '@components/Button/index';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import { languageList } from '@constant/Language';

interface CodeTemplateAddModalProps {
  title?: string;
  language?: Language;
}

export default function CodeTemplateAddModal({
  title = '코드 템플릿 추가',
  language = 'Python',
}: CodeTemplateAddModalProps) {
  const code = useCodeEditorStore((state) => state.code);
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateLanguage, setTemplateLanguage] = useState<Language>(language); // 기본값 설정
  const [templateContent, setTemplateContent] = useState(code);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    modal.remove('CODE_TEMPLATE_ADD_MODAL');
  }, [modal]);

  useEffect(() => {
    setIsVisible(true);

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (modal?.top()?.key === 'CODE_TEMPLATE_ADD_MODAL') {
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleSubmit = () => {
    if (!templateName.trim() || !templateContent.trim()) return;

    modal.top().resolve({
      name: templateName,
      description: templateDescription,
      language: templateLanguage,
      content: templateContent,
    });
    setIsVisible(false);
  };

  return (
    <TranslucentOverlay
      className={`z-50 flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        role="dialog"
        aria-labelledby="template-title"
        className="w-[500px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200"
      >
        <div className="flex items-center justify-between py-5 px-7">
          <h2 id="template-title" className="text-[17px] font-semibold text-gray-800">
            {title}
          </h2>
        </div>

        <div className="space-y-4 px-7 pb-7">
          <div>
            <label htmlFor="templateName" className="block text-[15px] text-gray-700 mb-2">
              템플릿 이름
            </label>
            <input
              id="templateName"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[14px]"
              placeholder="템플릿 이름을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="templateDescription" className="block text-[15px] text-gray-700 mb-2">
              설명
            </label>
            <input
              id="templateDescription"
              type="text"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[14px]"
              placeholder="템플릿 설명을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="templateLanguage" className="block text-[15px] text-gray-700 mb-2">
              언어
            </label>
            <select
              id="templateLanguage"
              value={templateLanguage}
              onChange={(e) => setTemplateLanguage(e.target.value as Language)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[14px]"
            >
              {
                    languageList.map((elem) => <option value={elem}>{elem}</option>)
                }
            </select>
          </div>

          <div>
            <label htmlFor="templateContent" className="block text-[15px] text-gray-700 mb-2">
              템플릿 코드
            </label>
            <textarea
              id="templateContent"
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[14px] h-[200px]"
              placeholder="코드를 입력하세요"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 px-4 pb-4">
          <Button
            onClick={handleClose}
            color="gray"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            color="blue"

          >
            추가
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
