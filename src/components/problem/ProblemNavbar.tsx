import { Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import useAlertModal from '@hook/useAlertModal';
import useModal from '@plugins/modal/useModal';
import { IconButton } from '@components/Button/index';
import CompilerInfoModal from './CompilerInfoModal';

export default function ProblemNavbar() {
  const modal = useModal();
  const [alert] = useAlertModal();
  return (
    <nav className="flex w-full">
      <div className="flex items-center justify-end w-full h-full gap-1 p-0 px-4 text-white">
        <div className="flex items-center justify-center w-10 h-full">
          <IconButton
            className="w-10 h-10 text-white"
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
            className="w-10 h-10 text-white"
            onClick={async () => {
              await alert('준비 중 입니다');
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
