import React, { useCallback, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import Swal from 'sweetalert2';
import { receiverCategory } from '../../../components/ComponentsData';
import { confirm, error, success } from '../../../components/SwalAlertData';
import ModalMessage from './ModalMessage';

export const Message = (props) => {

    const { receiver, subject, message, idMessage } = props
    // Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    //
    const receiverMessage = receiverCategory.find(r => r.id === parseInt(receiver))

    const deleteMessage = useCallback(
      (id) => {
          console.log(id)
        //deleteMessage(id)
        if(id){
            Swal.fire(error('Error al eliminar mensaje.'))
        } else {
            Swal.fire(success('El mensaje ha sido eliminado.'))
        }
      },
      [],
    )
    
    const handleDeleteMessage = (id) => {
        Swal.fire(confirm('¿Desea eliminar el mensaje?')).then((result) => {
            if (result.isConfirmed) {
                deleteMessage(id)
            }
        })
    }

    return <>
        <Row className='admin-message__message'>
            <Col xs={10} md={11} className="d-flex align-items-center" onClick={handleShow}><p className="message_text">Asunto: <strong>"{subject}"</strong></p></Col>
            <Col xs={10} md={11} className="d-flex align-items-center" onClick={handleShow}><p className="message_text receiver">Destinatario: <span> {receiverMessage.description}</span></p></Col>
            <Col xs={2} sm={1}>
                <div className="my-tooltip" >
                <button className='btn text-danger btn-icon ms-0 me-1' onClick={() => {handleDeleteMessage(idMessage)}}><MdIcon.MdDeleteForever style={{ fontSize: '1.5rem' }} /></button>
                <span className="tiptext">
                    Eliminar
                </span>
                </div>
            </Col>
        </Row>

        <ModalMessage idMessage={idMessage} show={show} handleShow={handleShow} />
    </>;

};
