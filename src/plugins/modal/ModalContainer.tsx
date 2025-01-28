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
      {modal.list()
        .filter((elem) => elem.Component !== null)
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
