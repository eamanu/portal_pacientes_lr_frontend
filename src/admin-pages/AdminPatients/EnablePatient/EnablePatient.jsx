import { useCallback, useEffect, useState } from 'react';
import Loader from '../../../components/Loader'
import { Modal, Button, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ImgRotate from '../../../components/ImgRotate';
import { confirm, error, success } from '../../../components/SwalAlertData';
import identificationsTypeServices from '../../../services/parametricServices';
import { getPersonByIdentificationNumber, setAdminStatusToPerson } from '../../../services/personServices';

export default function EnablePatient({ show, handleClose, idn }) {

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState(null);
    const [idnType, setIdnType] = useState(null);

    const getPatient = useCallback(
        (idn) => {
            getPersonByIdentificationNumber(idn)
                .then((res) => {
                    // console.log('res', res)
                    if (res.id) {
                        setPatient(res)
                    } else {
                        Swal.fire(error('Error al cargar datos de paciente'));
                        handleClose()
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error(err));
                    handleClose()
                })
        },
        [idn],
    )

    const getDNIVariants = useCallback(
        (idType) => {
            identificationsTypeServices()
                .then((res) => {
                    if (res?.length > 0) {
                        const type = res.find(t => t.id === idType)
                        setIdnType(type)
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error(err));
                    handleClose()
                })
        },
        [],
    )

    const validate = useCallback(
        (id) => {
            setAdminStatusToPerson(id, 2) //note  1: pending , 2: validated , 3: refused
                .then((res) => {
                    console.log('res', res)
                    // hardcode falta respuesta
                    Swal.fire(success('El paciente ha sido validado'))
                    Swal.fire(error('Hubo un error al validar paciente'))
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error(err));
                    handleClose()
                })
        },
        [],
    )

    const reject = useCallback(
        (id) => {
            setAdminStatusToPerson(id, 3) //note  1: pending , 2: validated , 3: refused
                .then((res) => {
                    console.log('res', res)
                    // hardcode falta respuesta
                    // hardcode falta Swal
                    handleClose()
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error(err));
                    handleClose()
                })
        },
        [],
    )

    const handleValidate = (id) => {
        Swal.fire(confirm('¿Validar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                validate(id)
            }
        })
    }

    const handleReject = (id) => {
        Swal.fire(confirm('¿Rechazar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                reject(id)
            }
        })
    }


    useEffect(() => {
        if (show) {
            getPatient('violedni')
        }
    }, [show, idn, getPatient])

    useEffect(() => {
        if (show && patient) {
            getDNIVariants(patient.id_identification_type)
        }
    }, [show, patient, getDNIVariants])

    return (
        < Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="admin-patient__modal"
        >
            < Modal.Header closeButton >
                <Modal.Title>Solicitud de alta de paciente</Modal.Title>
            </Modal.Header >

            {loading
                ? <Loader isActive={loading}></Loader>
                : <>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs={12} lg={6}>
                                    <h5>Datos de paciente </h5>
                                    <ul className="ps-0 fw-lighter admin-patient__list">
                                        <li>Nombre: <strong>{patient.name}</strong></li>
                                        <li>Apellido: <strong>{patient.surname}</strong></li>
                                        <li>Tipo de documento: <strong>{idnType.description}</strong></li>
                                        <li>Número de documento: <strong>{patient.identification_number}</strong></li>
                                        <li>Fecha de nacimiento: <strong>{patient.birthdate}</strong></li>
                                        <li>Domicilio: <strong>{patient.address_street} {patient.address_number} , {patient.department} , {patient.locality} </strong></li>
                                        <li>Email: <strong>{patient.email}</strong></li>
                                        <li>Teléfono: <strong>{patient.phone_number}</strong></li>
                                    </ul>
                                    <h5>Grupo familiar </h5>
                                    <ul className="admin-patient__list">
                                        <li>ID grupo familiar: <strong>{patient.identification_number_master}</strong> </li>
                                    </ul>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <h5>Imagen de documento </h5>
                                    <ImgRotate img={''}></ImgRotate>
                                    <ImgRotate img={''}></ImgRotate>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleValidate(patient.id)}>
                            Validar solicitud
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleReject(patient.id)}>
                            Rechazar solicitud
                        </Button>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </>
            }
        </Modal >
    )
}
