import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { variantsSpecialties } from '../../../components/ComponentsData';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader';
import SelectType from '../../../components/SelectType';
import { confirm, error, success } from '../../../components/SwalAlertData';
import usePatient from '../../../hooks/usePatient'
import { sendApplicationEmailService } from '../../../services/applicactionService';
import institutionsServices from '../../../services/institutionsServices';

function ApplicationModal({ show, handleClose, }) {


    const [loading, setLoading] = useState(false)
    //patient
    const p = usePatient()
    //form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [weekdays, setWeekdays] = useState({
        lunes: true,
        martes: true,
        miercoles: true,
        jueves: true,
        viernes: true,
        sabado: true,
        domingo: true
    })
    const [values, setValues] = useState({
        person: p.patient.name + ' ' + p.patient.surname,
        identification_number: p.patient.identification_number,
        specialty: "",
        weekly_availability: "",
        time_availability: "",
        details: "",
        email: p.patient.email,
        phone_number: p.patient.phone_number,
        establishment: p.patientInstitution
    })

    const [institutions, setInstitutions] = useState([]);

    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    const allInstitutions = res
                    return allInstitutions;
                })
                .then((res) => {
                    if(res.length > 0){
                        setInstitutions(res);
                        return institutions
                    } 
                })
                .catch((err) => { console.log(err) })
        },
        [institutions]
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    let days = []
    Object.keys(weekdays).forEach((key) => {
        let k = key.toString()
        days.push(k)
    })

    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            });
        }
    }

    const handleWeekdays = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setWeekdays({
                ...weekdays,
                [targetName]: e.target?.checked,
            });
        }
    }

    const buildApplication = (days, specialty) => {
        setLoading(true)
        let body = values
        let patientInstitution = institutions.find((item) => item.id === body.establishment)?.name ?? 'Sin datos'
        let subject = `Solicitud de turno: ${specialty || ''} - ${patientInstitution} - Paciente ${body.person}, DNI ${body.identification_number}`
        body.weekly_availability = days.toString()
        body.specialty = specialty
        let application =
            `\r 
        DATOS DE PACIENTE\r 
        Nombre y apellido: ${body.person} \r 
        Número de documento: ${body.identification_number} \r
        Email: ${body.email} \r
        Teléfono: ${body.phone_number} \r\n
        Estableciemitno de atención usual: ${patientInstitution} \r\n
        TURNO SOLICITADO \r
        Especialidad médica: ${body.specialty ? body.specialty : '-'} \r
        Disponibilidad semanal: ${body.weekly_availability} \r
        Disponibilidad horaria: ${body.time_availability ? body.time_availability : '-'} \r
        Detalle de solicitud: ${body.details ? body.details : '-'}
        `
        Swal.fire(confirm(`¿Enviar solicitud de turno?`)).then((result) => {
            if (result.isConfirmed) {
                send(p.patient.id, subject, application)
            }
        })
    }

    const send = useCallback(
        (id, subject, body) => {
            sendApplicationEmailService(id, subject, body)
                .then((res) => {
                    if(res.ok){
                        Swal.fire(success('La solicitud fue enviada con éxito'))
                        setLoading(false)
                        handleClose()
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Hubo un error al enviar la solicitud'))
                    handleClose()
                })
        },
        [],
    )


    const onSubmit = () => {
        let daysSelected = []
        let specialtySelected = variantsSpecialties.find(s => s.id === parseInt(values.specialty))
        Object.entries(weekdays).forEach(([key, value], i, obj) => {
            if (value) {
                let k = key.toString()
                daysSelected.push(k)
                if (Object.is(obj.length - 1, i)) {
                    buildApplication(daysSelected, specialtySelected?.name)
                }
            } else {
                if (Object.is(obj.length - 1, i)) {
                    buildApplication(daysSelected, specialtySelected?.name)
                }
            }
        })
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="perfil-usuario"
        >
            <Modal.Header closeButton>
                <Modal.Title>Solicitar turno médico</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '300px'}}>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                            <Col xs={12} className="d-flex">
                                <p className='datos-paciente__label me-3'>Paciente:
                                    <span className='ps-1 text-uppercase fw-normal'>
                                        {values.person}
                                    </span>
                                </p>
                                <p className='datos-paciente__label me-3'>Dni:
                                    <span className='ps-1 text-uppercase fw-normal'>
                                        {values.identification_number}
                                    </span>
                                </p>
                            </Col>
                            <Row className="d-flex">
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Especialidad médica</Form.Label>
                                        <SelectType
                                            name='specialty'
                                            variants={variantsSpecialties}
                                            selectValue={values.specialty}
                                            handleChange={e => handleChange(e)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <Form.Group className="mb-3 d-flex flex-column">
                                        <Form.Label>Disponibilidad semanal</Form.Label>
                                        {days.map((d, i) => {
                                            return (
                                                <Form.Label key={d + i} className="text-capitalize">
                                                    <input
                                                        name={d}
                                                        type='checkbox'
                                                        checked={weekdays[d]}
                                                        onChange={(e) => handleWeekdays(e)}
                                                    /> {d}
                                                </Form.Label>
                                            )
                                        })
                                        }
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Disponibilidad horaria</Form.Label>
                                        <Form.Control
                                            name="time_availability"
                                            type="text"
                                            placeholder='Por ej.: de 8 a 13'
                                            value={values.time_availability}
                                            className="form-control"
                                            onChange={e => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="text"
                                            value={values.email}
                                            className="form-control"
                                            {...register('email', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                pattern: {
                                                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                                    message: "El formato ingresado no es válido"
                                                }
                                            })}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            name="phone_number"
                                            type="text"
                                            value={values.phone_number}
                                            className="form-control"
                                            {...register('phone_number', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.phone_number && <ErrorMessage><p>{errors.phone_number.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Detalles de la solicitud</Form.Label>
                                        <Form.Control
                                            name="details"
                                            type="text"
                                            as='textarea'
                                            rows={3}
                                            placeholder='Por ej.: Consulta médica con traumatólogo especialista en columna vertebral'
                                            value={values.details}
                                            className="form-control"
                                            onChange={e => handleChange(e)}
                                        />
                                    </Form.Group>
                                </Col>
                                <div className='d-flex justify-content-end'>
                                    <Button variant='outline-secondary' className="me-2" onClick={() => handleClose()}>Cancelar</Button>
                                    <Button variant='primary' className="me-2" type="submit">Enviar solicitud</Button>
                                </div>
                            </Row>
                        </Form>
                    </Container>
                }
            </Modal.Body>
        </Modal>
    )
}

export default ApplicationModal;
