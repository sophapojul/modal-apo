import React from "react";
import { PropsWithChildren, ReactNode, useRef } from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode | string;
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: PropsWithChildren<ModalProps>) {
  const overlayRef = useRef(null);
  const handleCloseOnOverlay = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal" role="dialog">
      <div
        className="modal__overlay"
        ref={overlayRef}
        onClick={handleCloseOnOverlay}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="successDialog"
        aria-describedby="dialog_desc"
        className="modal__content"
        // onClick={closeOnClickOutsideModalWindow}
      >
        <div className="modal__header">
          <h2 id="successDialog" className="modal__title">
            {title}
          </h2>
          <button type="button" className="modal__button" onClick={onClose}>
            X
          </button>
        </div>
        <div id="dialog_desc" className="modal__body">
          {children}
        </div>
        <div className="modal__footer">{footer}</div>
      </div>
    </div>
  );
}
Modal.defaultProps = {
  footer: null,
};
