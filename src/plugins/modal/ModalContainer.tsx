/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useModal from './useModal';

const MODAL_ID = 'modal-container';
export default function ModalContainer() {
  const modal = useModal();
  const topComponentInfo = modal.top();

  useEffect(() => {
    if (document.getElementById(MODAL_ID)) {
      return;
    }

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_ID;
    modalDOM.style.position = 'fixed';
    document.body.append(modalDOM);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          modal.top()?.reject(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  if (!topComponentInfo) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <topComponentInfo.Component
      resolve={topComponentInfo.resolve}
      reject={topComponentInfo.reject}
      {...(topComponentInfo?.props ?? {})}
    />,
    window.document.getElementById(MODAL_ID)!,

  );
}
