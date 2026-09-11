import React, { useEffect, useState } from "react";
import { AlertModal } from "@components/modal";
import ModalController from "./ModalController";
import ModalContext from "./ModalContext";
import ModalContainer from "./ModalContainer";

interface ModalProvider {
  children: React.ReactNode;
}

export let showAlert: undefined | ((content: string) => Promise<unknown>);

export default function ModalProvider({ children }: ModalProvider) {
  const flagState = useState(1);
  const [renderVersion] = flagState;
  const [modalController] = useState(() => new ModalController(flagState));

  useEffect(() => {
    showAlert = async (content: string) =>
      modalController.push("Alert", AlertModal, { content });
  }, [modalController]);

  return (
    <ModalContext.Provider value={modalController}>
      {children}
      <ModalContainer renderVersion={renderVersion} />
    </ModalContext.Provider>
  );
}
