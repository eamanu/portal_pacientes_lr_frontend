import React, { useCallback, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import usePatient from '../../hooks/usePatient';
import { setMessageRead } from '../../services/messagesServices';
import { ModalMensaje } from './ModalMensaje/ModalMensaje';

export const Mensaje = (props) => {

    //Person
    const p = usePatient();
    const idPerson = p.patient.id 
    //Message
    const { asunto, from, mensaje, isRead, idMessage, action} = props
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        action()
    }
    const handleShow = () => setShow(true);
    // Icon
    const [open, setOpen] = useState(false);

    const abrirMensaje = () => {
        handleShow();
        setOpen(true);
        if(!isRead){
            read(idPerson, idMessage) 
        }
    }

    const read = useCallback(
      (person_id, message_id) => {
        setMessageRead(person_id, message_id)
        .then((res) => {
            return res
        })
        .catch(err => console.log(err))
      },
      [],
    )
    
    return <>
        <Container className={`mensaje_container py-2 mb-2 in ${isRead ? "shadow-none bg-secondary bg-opacity-10 fw-normal" : "shadow-sm fw-bold"}`} onClick={abrirMensaje}>
            <Row className='mensaje_row justify-content-end'>
                <Col className="mensaje_icon">{isRead ? <MdIcon.MdMailOutline className="text-secondary" /> : <MdIcon.MdOutlineMarkEmailUnread className="text-danger" />}</Col>
                <Col xs={10} sm={11} lg={5} className="d-flex align-items-center"><p className="mensaje_text asunto">{asunto}</p></Col>
                <Col xs={10} sm={11} lg={6} className="d-flex align-items-center"><p className="mensaje_text mensaje">{mensaje}</p></Col>
            </Row>

        </Container>
        <ModalMensaje asunto={asunto} mensaje={mensaje} from={from} show={show} handleClose={handleClose} />
    </>

};
