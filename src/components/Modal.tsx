import React from "react";
import { Modal } from "react-bootstrap";
import { IModal } from "../interfaces";
import "./styles.css";

export default function ModalComponent({
  show,
  handleClose,
  body,
  footer,
  title
}: IModal): JSX.Element {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="modal-titlebg test-modal">
        <Modal.Title>
          <strong>{title}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className="test-modal-footer">{footer}</Modal.Footer>
    </Modal>
  );
}
