import { Fragment, useEffect } from "react";
import useModal from "./useModal";

interface ModalContainerProps {
  renderVersion: number;
}

export default function ModalContainer({ renderVersion }: ModalContainerProps) {
  const modal = useModal();

  useEffect(() => {
    modal.commitRender(renderVersion);
  }, [modal, renderVersion]);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 p-4 pointer-events-none">
        {modal
          .list()
          .filter((modalInfo) => modalInfo.key === "Toast")
          .map((modalInfo) => (
            <Fragment key={modalInfo.id}>{modalInfo.element}</Fragment>
          ))}
      </div>

      {modal
        .list()
        .filter((modalInfo) => modalInfo.key !== "Toast")
        .map((modalInfo) => (
          <Fragment key={modalInfo.id}>{modalInfo.element}</Fragment>
        ))}
    </>
  );
}
