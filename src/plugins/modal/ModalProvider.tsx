/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useState } from 'react';
import { AlertModal } from '@components/modal';
import ModalController from './ModalController';
import ModalContext from './ModalContext';
import ModalContainer from './ModalContainer';

interface ModalProvider {
  children: React.ReactNode
}

// eslint-disable-next-line import/no-mutable-exports
export let showAlert: undefined | ((content: string) => Promise<unknown>);

export default function ModalProvider({ children }: ModalProvider) {
  const flagState = useState(1);
  const [modalController] = useState(() => new ModalController(flagState));

  useEffect(() => {
    showAlert = async (content: string) => modalController.push('Alert', AlertModal, { content });
  }, [modalController]);

  return (
    <ModalContext.Provider value={modalController}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}
