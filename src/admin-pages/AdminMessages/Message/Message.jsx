import React, { useCallback, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import Swal from 'sweetalert2';
import { receiverCategory } from '../../../components/ComponentsData';
import { confirm, error, success } from '../../../components/SwalAlertData';
import { deleteMessage } from '../../../services/messagesServices';
import CreateMessage from '../CreateMessage';
import ModalMessage from './ModalMessage';

export const Message = (props) => {

    const { header, body, idMessage, initMessages, status } = props
    // Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    //Create Modal
    const [edit, setEdit] = useState(false);
    const handleEdit = () => setEdit(!edit);
    // const receiverMessage = receiverCategory.find(r => r.id === parseInt(receiver))

    const deleteMsg = useCallback(
        (id) => {
            deleteMessage(id)
                .then((res) => {
                    if (res.ok) {
                        Swal.fire(success('El mensaje ha sido eliminado.'))
                        initMessages();
                    } else {
                        Swal.fire(error('Error al eliminar mensaje.'))
                    }
                }
                )
                .catch((err) => {
                    console.log(err)
                    Swal.fire(error('Error al eliminar mensaje.'))
                })
        },
        [],
    )

    const handleDeleteMessage = (id) => {
        Swal.fire(confirm('¿Desea eliminar el mensaje?')).then((result) => {
            if (result.isConfirmed) {
                deleteMsg(id)
            }
        })
    }

    return <>
        <Row className='admin-message__message message_container'>
            <Col xs={12} sm={12} className="d-flex align-items-center" onClick={handleShow}>
                <p className="message_text"> Asunto: <strong>"{header}"</strong></p>
            </Col>
            <Col xs={6} sm={9} className="d-flex align-items-center" onClick={handleShow}>
                <p className="message_text receiver">Mensaje: <span>{body}</span></p>
            </Col>
            {status ?
                <Col xs={6} sm={3} className="d-flex flex-sm-row justify-content-end align-items-center">
                    <div className='d-flex flex-column align-items-end'>
                    <span style={{fontSize: '0.6rem'}}>Enviado:</span>
                    <span style={{fontSize: '0.6rem'}}>{status}</span>
                    </div>
                    <div className="my-tooltip" >
                        <button className='btn text-danger btn-icon ms-0' onClick={() => { handleDeleteMessage(idMessage) }}><MdIcon.MdDeleteForever style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Eliminar
                        </span>
                    </div>
                </Col>
                :
                <Col xs={6} sm={3} className="d-flex flex-sm-row justify-content-end align-items-center">
                    <div className="my-tooltip">
                        <button className='btn text-secondary btn-icon' onClick={() => { handleEdit() }} ><MdIcon.MdEditNote style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Editar
                        </span>
                    </div>
                    <div className="my-tooltip" >
                        <button className='btn text-danger btn-icon ms-0 me-1' onClick={() => { handleDeleteMessage(idMessage) }}><MdIcon.MdDeleteForever style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Eliminar
                        </span>
                    </div>
                </Col>
            }
        </Row>

        {show && <ModalMessage idMessage={idMessage} show={show} handleShow={handleShow} />}
        {edit && <CreateMessage show={edit} handleClose={handleEdit} idMessage={idMessage} action={'edit'} />}
    </>;

};
