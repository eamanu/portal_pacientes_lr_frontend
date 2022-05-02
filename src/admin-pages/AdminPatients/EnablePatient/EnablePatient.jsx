import { useCallback, useEffect, useState } from 'react';
import Loader from '../../../components/Loader'
import { Modal, Button, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ImgRotate from '../../../components/ImgRotate';
import { confirm, error, success } from '../../../components/SwalAlertData';
import identificationsTypeServices from '../../../services/parametricServices';
import { getPersonByIdentificationNumber, setAdminStatusToPerson } from '../../../services/personServices';
import { downloadIdentificationImagesService } from '../../../services/registerServices';

export default function EnablePatient({ show, handleClose, idn }) {

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState(null);
    const [idnType, setIdnType] = useState(1); //hardcode

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
    const getImage = useCallback(
      (id, is_front) => {
        downloadIdentificationImagesService(id, is_front)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
      },
      [],
    )
    

    const validate = useCallback(
        (id) => {
            setAdminStatusToPerson(id, 2) //note  1: pending , 2: validated , 3: refused
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                Swal.fire(success('El paciente ha sido validado'))
                                handleClose()
                            } else {
                                Swal.fire(error('Hubo un error al validar paciente'))
                                throw new Error(text)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Hubo un error al validar paciente' ));
                    handleClose()
                })
        },
        [],
    )

    const reject = useCallback(
        (id) => {
            setAdminStatusToPerson(id, 3) //note  1: pending , 2: validated , 3: refused
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            Swal.fire(success('La solicitud ha sido rechazada'))
                            handleClose()
                        } else {
                            Swal.fire(error('Hubo un error al rechazar la solicitud'))
                            throw new Error(text)
                        }
                    })
                }
            })
            .catch((err) => {
                console.log('error', err)
                Swal.fire(error('Hubo un error al rechazar la solicitud'));
                handleClose()
            })
        },
        [],
    )

    const handleValidate = (id) => {
        Swal.fire(confirm('¿Validar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                validate(6) //hardcode id
            }
        })
    }

    const handleReject = (id) => {
        Swal.fire(confirm('¿Rechazar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                reject(6) //hardcode id
            }
        })
    }


    useEffect(() => {
        if (show) {
            // getPatient(idn) //hardcode
            const fake = {
                id: 0,
                surname: "string",
                name: "string",
                identification_number: "string",
                birthdate: "2022-05-02T22:57:51.562Z",
                id_gender: 0,
                id_department: 0,
                id_locality: 0,
                address_street: "string",
                address_number: "string",
                id_usual_institution: 0,
                is_diabetic: true,
                is_hypertensive: true,
                is_chronic_respiratory_disease: true,
                is_chronic_kidney_disease: true,
                identification_number_master: "string",
                id_identification_type: 0,
                id_identification_type_master: 0,
                is_deleted: true,
                id_patient: 0,
                id_admin_status: 0,
                phone_number: "string",
                department: "string",
                locality: "string",
                email: "string",
                identification_front_image: "string",
                identification_back_image: "string",
                identification_front_image_file_type: "string",
                identification_back_image_file_type: "string",
                id_person_status: 0
            }
            setPatient(fake)
            setLoading(false)

        }
    }, [show, idn, getPatient])

    useEffect(() => {
        if (show && patient) {
            // getDNIVariants(patient.id_identification_type)
            getImage(30, true) //hardcode
            getImage(30, false)//hardcode
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
