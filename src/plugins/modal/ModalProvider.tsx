/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState } from 'react';
import ModalController from './ModalController';
import ModalContext from './ModalContext';
import ModalContainer from './ModalContainer';

interface ModalProvider {
  children: React.ReactNode
}

export default function ModalProvider({ children }: ModalProvider) {
  const flagState = useState(1);
  const [modalController] = useState(() => new ModalController(flagState));

  return (
    <ModalContext.Provider value={modalController}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}
