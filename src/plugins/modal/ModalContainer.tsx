/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useModal from './useModal';

const MODAL_ID = 'modal-container';

export default function ModalContainer() {
  const modal = useModal();

  useEffect(() => {
    if (document.getElementById(MODAL_ID)) {
      return;
    }

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_ID;
    modalDOM.style.position = 'fixed';
    document.body.append(modalDOM);
  }, []);

  return ReactDOM.createPortal(
    <>
      {/* 토스트 영역 */}
      <div className="fixed bottom-0 right-0 z-50 p-4 pointer-events-none">
        {modal.list()
          .filter((elem) => elem.Component !== null && elem.key?.startsWith('Toast-'))
          .map((elem, index) => {
            const Component = elem.Component as React.ComponentType<any>;
            return (
              <Component
                key={index}
                resolve={elem.resolve}
                reject={elem.reject}
                {...(elem?.props ?? {})}
              />
            );
          })}
      </div>

      {/* 일반 모달 영역 */}
      {modal.list()
        .filter((elem) => elem.Component !== null && !elem.key?.startsWith('Toast-'))
        .map((elem, index) => {
          const Component = elem.Component as React.ComponentType<any>;
          return (
            <Component
              key={index}
              resolve={elem.resolve}
              reject={elem.reject}
              {...(elem?.props ?? {})}
            />
          );
        })}
    </>,
    window.document.getElementById(MODAL_ID)!,
  );
}
