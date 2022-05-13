import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// import { Col, Container, Row } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import Swal from 'sweetalert2';
import { receiverCategory } from '../../../components/ComponentsData';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader';
import SelectType from '../../../components/SelectType';
import { confirm, error, success, warning } from '../../../components/SwalAlertData';
import { createMessage, getMessage, sendMessage, updateMessage } from '../../../services/messagesServices';

export const CreateMessage = (props) => {

    const [loading, setLoading] = useState(true)
    const { show, handleClose, idMessage, action } = props
    const [newMessageId, setNewMessageId] = useState(idMessage ? idMessage : null)
    const [idCategoryReceiver, setIdCategoryReceiver] = useState(null)
    const [valuesCreate, setValuesCreate] = useState({
        header: "",
        body: "",
    });
    const { register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitted }, } = useForm();

    // set valuesCreate 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValuesCreate({
                ...valuesCreate,
                [targetName]: e.target?.value,
            })
        }
    }
    const getMessageModal = useCallback(
        (id) => {
            getMessage(id)
                .then((res) => {
                    if (res) {
                        setValuesCreate(res)
                        setValueUseForm(res)
                        setLoading(false)
                    } else {
                        Swal.fire(error('Error al cargar mensaje'))
                        handleClose();
                    }
                })
        },
        [],
    )
    const setValueUseForm = (msg) => {
        Object.entries(msg).forEach(([key, value]) => {
            setValue(`${key}`, value)
        })
    }
    useEffect(() => {
        if (newMessageId) {
            getMessageModal(idMessage)
        } else {
            setLoading(false)
        }
    }, [])

    const onSubmit = (action) => {
        let body = valuesCreate
        if (action === 'create') {
            create(body.header, body.body, false)
        }
        if (action === 'edit') {
            edit(body)
        }
    }

    const create = useCallback(
        (header, body, isFormatted) => {
            createMessage(header, body, isFormatted)
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            setNewMessageId(readeble.value)
                            Swal.fire(success('El mensaje ha sido creado con éxito'))
                        })
                    } else {
                        Swal.fire(error('Ocurrió un error al crear mensaje'))
                    }
                })

        },
        [],
    )

    const edit = useCallback(
        (body) => {
            updateMessage(body)
                .then((res) => {
                    if (res.ok) {
                        Swal.fire(success('El mensaje ha sido editado con éxito'))
                    } else {
                        Swal.fire(error('Ocurrió un error al editar mensaje'))
                    }
                })
        },
        [],
    )

    const editAndSend = useCallback(
        (body, id, category_id, isForAll) => {
            updateMessage(body)
                .then((res) => {
                    if (res.ok) {
                        send(newMessageId, category_id, isForAll)
                    } else {
                        Swal.fire(error('Ocurrió un error al editar mensaje'))
                    }
                })
        },
        [],
    )

    const send = useCallback(
        (message_id, category_id, is_for_all_categories) => {
            sendMessage(message_id, category_id, is_for_all_categories)
                .then((res) => {
                    if (res.ok) {
                        Swal.fire(success('El mensaje ha sido enviado con éxito'))
                        handleClose();
                    } else {
                        Swal.fire(error('Ocurrió un error al enviar mensaje'))
                        handleClose();
                    }
                })

        },
        [],
    )

    const handleSend = () => {
        if (idCategoryReceiver) {
            let category_id = parseInt(idCategoryReceiver)
            let receiverMessage = receiverCategory.find(r => r.id === parseInt(idCategoryReceiver))
            let isForAll = category_id === 0 ? true : false
            Swal.fire(confirm(`¿Enviar mensaje a ${receiverMessage.description}?`)).then((result) => {
                if (result.isConfirmed) {
                    if(action === 'create'){
                        send(newMessageId, category_id, isForAll)
                    } else {
                        let body = valuesCreate
                        editAndSend(body, newMessageId, category_id, isForAll)
                    }
                }
            })
        } else {
            Swal.fire(warning('Debes ingresar un destinatario.'))
        }
    }

    useEffect(() => {
        setValue('receiver', idCategoryReceiver)
    }, [idCategoryReceiver])


    return <Modal
        show={show}
        onHide={handleClose}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {action === 'create' ? 'Crear' : 'Editar'} mensaje
            </Modal.Title>
        </Modal.Header>
        {loading
            ? <Loader isActive={loading} />
            : <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit(() => onSubmit(action))}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Destinatario:</Form.Label>
                            <SelectType
                                name="receiver"
                                variants={receiverCategory}
                                selectValue={idCategoryReceiver}
                                {...register('receiver', {
                                    required: {
                                        value: false,
                                        message: "El campo es requerido."
                                    }
                                })}
                                handleChange={(e) => setIdCategoryReceiver(e.target.value)}
                            />
                            {errors.receiver && <ErrorMessage><p>{errors.receiver.message}</p></ErrorMessage>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Asunto:</Form.Label>
                            <Form.Control
                                name="header"
                                type="text"
                                value={valuesCreate.header}
                                className="form-control"
                                {...register('header', {
                                    required: {
                                        value: true,
                                        message: "El campo es requerido."
                                    }
                                })}
                                onChange={(e) => { handleChange(e) }}
                            />
                            {errors.header && <ErrorMessage><p>{errors.header.message}</p></ErrorMessage>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mensaje:</Form.Label>
                            <Form.Control
                                name="body"
                                type="text"
                                as="textarea"
                                rows={3}
                                value={valuesCreate.body}
                                className="form-control"
                                {...register('body', {
                                    required: {
                                        value: true,
                                        message: "El campo es requerido."
                                    }
                                })}
                                onChange={(e) => { handleChange(e) }}
                            />
                            {errors.body && <ErrorMessage><p>{errors.body.message}</p></ErrorMessage>}
                        </Form.Group>
                        <div className="d-flex w-100 justify-content-end">
                            <Button variant="primary" type="submit" disabled={newMessageId ? true : false} className={`me-2 ${action === 'create' ? 'd-block' : 'd-none'}`}>Crear Mensaje </Button>
                            <Button variant="primary" type="submit" disabled={!isDirty ? true : false} className={`me-2 ${action === 'edit' ? 'd-block' : 'd-none'}`}>Guardar cambios </Button>
                        </div>
                    </Form>
                </Container>
            </Modal.Body>

        }
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={() => handleSend()} disabled={newMessageId && idCategoryReceiver ? false : true}>Enviar <MdIcon.MdSend /></Button>
        </Modal.Footer>
    </Modal>
};
