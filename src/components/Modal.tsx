import React from "react";
import { Modal } from "react-bootstrap";
import { IModal } from "../interfaces";
import "./styles.css";

export default function ModalComponent(props: IModal) {
  const { show, handleClose, body, footer, title } = props;
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="modal-titlebg">
        <Modal.Title>
          <strong>{title}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
}
