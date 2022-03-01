import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ModalMensaje = (props) => {

    const { asunto, from, mensaje,  show, handleShow } = props

    return <Modal
            show={show}
            onHide={handleShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mensaje
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{asunto}</h4>
                <h6>De: {from}</h6>
                <p>{mensaje}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleShow}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
};
