import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loader from '../../../../components/Loader';
import { error } from '../../../../components/SwalAlertData';
import { getMessage } from '../../../../services/messagesServices';

export const ModalMessage = (props) => {

    const [loading, setLoading] = useState(true);
    const { idMessage, show, handleShow } = props
    const [message, setMessage] = useState(null)
    const getMessageModal = useCallback(
        (id) => {
            getMessage(id)
                .then((res) => {
                    if(res){
                        setMessage(res)
                        setLoading(false)
                    } else {
                        Swal.fire(error('Error al cargar mensaje'))
                        handleShow()
                        setLoading(false)
                    }
                })
        },
        [],
    )
    useEffect(() => {
        getMessageModal(idMessage)
    }, [])


    return <Modal
        show={show}
        onHide={handleShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        {loading
            ? <Loader isActive={loading} />
            : <>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Mensaje 
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h6>Asunto: <strong>{message.header}</strong></h6>
                    <p>Enviado: {message.sent_datetime ? message.sent_datetime : 'No ha sido enviado'}</p>
                    <p>Mensaje: {message.body}
                    </p>
                </Modal.Body>
            </>
        }
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleShow}>Cerrar</Button>
        </Modal.Footer>
    </Modal>
};
