import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import { ModalMensaje } from './ModalMensaje/ModalMensaje';

export const Mensaje = (props) => {

    const { asunto, from, mensaje} = props
    // Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    // Icon
    const [open, setOpen] = useState(false);

    const abrirMensaje = () =>{
        handleShow();
        setOpen(true);
    }


    return <Container className={`mensaje_container py-2 mb-2 in ${!open? "shadow-sm fw-bold" : "shadow-none bg-secondary bg-opacity-10 fw-normal" }`} onClick={abrirMensaje}>
        <Row className='mensaje_row justify-content-end'>
            <Col className="mensaje_icon">{open ? <MdIcon.MdMailOutline />: <MdIcon.MdOutlineMarkEmailUnread className="text-danger"/>}</Col>
            <Col xs={10} sm={11} lg={6} className="d-flex align-items-center"><p className="mensaje_text asunto">{asunto}</p></Col>
            <Col xs={10} sm={11} lg={5} className="d-flex align-items-center"><p className="mensaje_text mensaje">{mensaje}</p></Col>
        </Row>

        <ModalMensaje asunto={asunto} mensaje={mensaje} from={from} show={show} handleShow={handleShow} />
    </Container>;

};
