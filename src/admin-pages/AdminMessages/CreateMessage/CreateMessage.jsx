import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// import { Col, Container, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import Swal from 'sweetalert2';
import { receiverCategory } from '../../../components/ComponentsData';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import SelectType from '../../../components/SelectType';
import { confirm, error, success } from '../../../components/SwalAlertData';

export const CreateMessage = (props) => {

    const { show, handleClose } = props
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [values, setValues] = useState({
        receiver: "",
        subject: "",
        message: "",
    }); //Get and set values form
    // set values 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            })
        }
    }

    const create = useCallback(
      (body) => {
          console.log('new message', body)
        //hago el post del mensaje y se envía
        if(body){
            Swal.fire(success('El mensaje ha sido enviado con éxito'))
            handleClose();
        } else {
            Swal.fire(error('Ha osurrido un error'))
            handleClose();
        }
        
      },
      [],
    )
    
    const onSubmit = () => {
        let body = values
        let receiverMessage = receiverCategory.find(r => r.id === parseInt(values.receiver))
        Swal.fire(confirm(`¿Enviar mensaje a ${receiverMessage.description}?`)).then((result) => {
            if (result.isConfirmed) {
                create(body)
            }
        })
    }

    useEffect(() => {
        setValue('receiver', values.receiver)
    }, [values.receiver])
    

    return <Modal
        show={show}
        onHide={handleClose}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Crear mensaje
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Destinatario:</Form.Label>
                        <SelectType
                            name="receiver"
                            variants={receiverCategory}
                            selectValue={values.receiver}
                            {...register('receiver', {
                                required: {
                                    value: true,
                                    message: "El campo es requerido."
                                }
                            })}
                            handleChange={(e) => handleChange(e)}
                        />
                        {errors.receiver && <ErrorMessage><p>{errors.receiver.message}</p></ErrorMessage>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Asunto:</Form.Label>
                        <Form.Control
                            name="subject"
                            type="text"
                            value={values.subject}
                            className="form-control"
                            {...register('subject', {
                                required: {
                                    value: true,
                                    message: "El campo es requerido."
                                }
                            })}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.subject && <ErrorMessage><p>{errors.subject.message}</p></ErrorMessage>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mensaje:</Form.Label>
                        <Form.Control
                            name="message"
                            type="text"
                            value={values.message}
                            as="textarea"
                            rows={3}
                            className="form-control"
                            {...register('message', {
                                required: {
                                    value: true,
                                    message: "El campo es requerido."
                                }
                            })}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.message && <ErrorMessage><p>{errors.message.message}</p></ErrorMessage>}
                    </Form.Group>
                    <div className="d-flex flex-column align-items-center align-items-sm-end mt-3">
                        <Button variant="success" type="submit">Enviar <MdIcon.MdSend /></Button>
                    </div>
                </Form>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>Cancelar</Button>
        </Modal.Footer>
    </Modal>
};
