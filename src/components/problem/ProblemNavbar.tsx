import { Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import useModal from '@plugins/modal/useModal';
import { IconButton } from '@components/Button/index';
import CompilerInfoModal from './CompilerInfoModal';
import CodeEditorSettingsModal from './CodeEditorSettingsModal';

export default function ProblemNavbar() {
  const modal = useModal();
  return (
    <nav className="flex w-full">
      <div className="flex items-center justify-end w-full h-full gap-1 p-0 px-4 text-white">
        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            className="w-10 h-10 text-white bg-gray-900"
            onClick={() => {
              modal.push('CompilerInfo', CompilerInfoModal, {});
            }}
          >
            <DocumentTextIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>

        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            // ripple
            className="w-10 h-10 text-white bg-gray-900"
            onClick={async () => {
              modal.push('CODE_EDITOR_SETTINGS', CodeEditorSettingsModal, {});
            }}
          >
            <Cog6ToothIcon
              className="text-white w-7 h-7"
              color="white"
            />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
