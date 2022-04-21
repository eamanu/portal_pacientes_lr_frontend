import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ModalMessage = (props) => {

    const { idMessage, show, handleShow } = props

    // falta desarrollo de servicio
    //hardcode

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
            <h4>Bienvenida</h4>
            <h6>Destinatario: Todos los pacientes</h6>
            <p>Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje

                Un mensaje un mensaje un mensaje unm mensaje
                Un mensaje un mensaje un mensaje unm mensaje
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleShow}>Cerrar</Button>
        </Modal.Footer>
    </Modal>
};
