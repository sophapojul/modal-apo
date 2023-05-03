import React from "react";
import { PropsWithChildren, ReactNode, useRef } from "react";

import useCloseOnOverlay from "../hooks/useCloseOnOverlay";
import useCloseOnEscapeKey from "../hooks/useCloseOnEscapeKey";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Content = styled.div`
  position: relative;
  max-width: 400px;
  width: 90%;
  background-color: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;

const Section = styled.div`
  margin: 0;
`;

const Body = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  color: #fff;
  background-color: #000;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2em;
`;

const Title = styled.h2`
  margin: 0;
`;

interface ModalProps {
  isOpen: boolean;
  title?: ReactNode | string;
  onClose: () => void;
  footer?: ReactNode | string;
}

/**
 * React component for a modal dialog
 * @param isOpen - boolean
 * @param title - ReactNode | string
 * @param onClose - function
 * @param children - ReactNode
 * @param footer - ReactNode | string
 * @returns React component
 */
export function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: PropsWithChildren<ModalProps>) {
  const overlayRef = useRef(null);
  useCloseOnOverlay(onClose, overlayRef);
  useCloseOnEscapeKey(onClose);
  if (!isOpen) {
    return null;
  }
  return (
    <StyledModal role="dialog">
      <Overlay ref={overlayRef} />
      <Content
        role="dialog"
        aria-modal="true"
        aria-labelledby="successDialog"
        aria-describedby="dialog_desc"
      >
        <Section>
          <Title id="successDialog" className="modal__title">
            {title}
          </Title>
          <Button type="button" className="modal__button" onClick={onClose}>
            X
          </Button>
        </Section>
        <Body id="dialog_desc">{children}</Body>
        <Section>{footer}</Section>
      </Content>
    </StyledModal>
  );
}
Modal.defaultProps = {
  title: null,
  footer: null,
};
