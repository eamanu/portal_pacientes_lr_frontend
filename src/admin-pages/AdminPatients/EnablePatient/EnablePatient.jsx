import { useCallback, useEffect, useState } from 'react';
import Loader from '../../../components/Loader'
import { Modal, Button, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ImgRotate from '../../../components/ImgRotate';
import { confirm, error, success } from '../../../components/SwalAlertData';
import identificationsTypeServices from '../../../services/parametricServices';
import { getAdminStatus, getPersonById, setAdminStatusToPerson } from '../../../services/personServices';
import { downloadIdentificationImagesService, getImageService } from '../../../services/registerServices';
import { variantsGender } from '../../../components/ComponentsData';
import useAuth from '../../../hooks/useAuth';
import institutionsServices from '../../../services/institutionsServices';

export default function EnablePatient({ show, handleClose, id, action }) {

    const [loading, setLoading] = useState(true);
    const auth = useAuth()
    const [patient, setPatient] = useState(null);
    const [idnType, setIdnType] = useState(1);
    const [genderType, setGenderType] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [adminStatus, setAdminStatus] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [imgFront, setImgFront] = useState("")
    const [imgBack, setImgBack] = useState("")


    const getPatient = useCallback(
        (id) => {
            getPersonById(id)
                .then((res) => {
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
        [id],
    )
    const getBirthdate = (birthdate) => {
        let date = birthdate.split('-')
        let y = date[0]
        let m = date[1]
        let d = date[2].split('T')[0]
        setBirthdate(`${d} / ${m} / ${y}`)
    }
    const getDNIVariants = useCallback(
        (idType) => {
            identificationsTypeServices()
                .then((res) => {
                    if (res?.length > 0) {
                        const type = res.find(t => t.id === idType)
                        setIdnType(type)
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
    const getGender = (id_gender) => {
        let gender = variantsGender.find(g => g.id === id_gender)
        setGenderType(gender)
    }
    const downloadImage = useCallback(
        (id, is_front) => {
            downloadIdentificationImagesService(id, is_front)
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                if (is_front) {
                                    getImage(readeble.value, is_front)
                                    downloadImage(id, false)
                                } else {
                                    getImage(readeble.value, is_front)
                                }
                            } else {
                                throw new Error(text)
                            }
                        })
                    } else {
                        console.log('error', res)
                        throw new Error(res)
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    setLoading(false)
                })
        },
        [],
    )

    const getImage = useCallback(
        (imgName, is_front) => {
            getImageService(imgName, auth.tokenUser)
                .then((res) => {
                    if(res && is_front) {
                        setImgFront(res)
                    } else if (res && !is_front) {
                        setImgBack(res)
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        [],
    )

    const getAdminStatusToSetPerson = useCallback(
        () => {
            getAdminStatus()
                .then((res) => {
                    setAdminStatus(res)
                })
                .catch((err) => {
                    console.log('Error', err)
                    Swal.fire(error('Error al obtenter estados'))
                    handleClose()
                })

        }, []
    )

    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    const allInstitutions = res
                    setInstitutions(allInstitutions);
                    return allInstitutions;
                })
                .catch((err) => { console.log(err) })
        },
        [institutions],
    )

    useEffect(() => {
        if (show) {
            getPatient(id)
        }
    }, [show, id, getPatient])

    useEffect(() => {
        if (show && patient) {
            getAdminStatusToSetPerson();
            getInstitutions();
            getDNIVariants(patient.id_identification_type)
            getBirthdate(patient.birthdate);
            getGender(patient.id_gender);
            downloadImage(patient.id, true);
        }
    }, [show, patient, getDNIVariants])

    const changeAdminStatusToPerson = useCallback(
        (id, status) => {
            setAdminStatusToPerson(id, status.id) //note  1: pending , 2: validated , 3: refused api_endpoint /getadminstatus
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                Swal.fire(success(`Estado ${status.name}`))
                                action()
                                handleClose()
                            } else {
                                Swal.fire(error('Hubo un error al intentar cambiar el estado'))
                                throw new Error(text)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Hubo un error al intentar cambiar el estado'));
                    handleClose()
                })
        },
        [],
    )

    const handleValidate = (id) => {
        Swal.fire(confirm('¿Validar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                let status = adminStatus.find(s => s.name === "VALIDADO")
                changeAdminStatusToPerson(id, status)
            }
        })
    }

    const handleReject = (id) => {
        Swal.fire(confirm('¿Rechazar solicitud?')).then((result) => {
            if (result.isConfirmed) {
                let status = adminStatus.find(s => s.name === "RECHAZADO")
                changeAdminStatusToPerson(id, status)
            }
        })
    }

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
                                        <li>Nombre: <strong>{patient.name || ' - '}</strong></li>
                                        <li>Apellido: <strong>{patient.surname || ' - '}</strong></li>
                                        <li>Tipo de documento: <strong>{idnType?.description || ' - '}</strong></li>
                                        <li>Número de documento: <strong>{patient.identification_number || ' - '}</strong></li>
                                        <li>Fecha de nacimiento: <strong>{birthdate || ' - '}</strong></li>
                                        <li>Sexo: <strong>{genderType?.name || ' - '}</strong></li>
                                        <li>Domicilio: <strong>{patient.address_street || ' - '} {patient.address_number || ' - '} , {patient.department || ' - '} , {patient.locality || ' - '} </strong></li>
                                        <li>Email: <strong>{patient.email || ' - '}</strong></li>
                                        <li>Teléfono: <strong>{patient.phone_number || ' - '}</strong></li>
                                    </ul>
                                    <h5>Grupo familiar </h5>
                                    <ul className="admin-patient__list">
                                        <li>ID grupo familiar: <strong>{patient.identification_number_master || ' - '}</strong> </li>
                                    </ul>
                                    <h5>Establecimiento </h5>
                                    <ul className="admin-patient__list">
                                        <li>{institutions.find((item) => item.id === patient.id_usual_institution)?.name || ' - '}</li>
                                    </ul>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <h5>Imagen de documento </h5>
                                    <ImgRotate img={imgFront}></ImgRotate>
                                    <ImgRotate img={imgBack}></ImgRotate>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleReject(patient.id)}>
                            Rechazar solicitud
                        </Button>
                        <Button variant="primary" onClick={() => handleValidate(patient.id)}>
                            Validar solicitud
                        </Button>
                    </Modal.Footer>
                </>
            }
        </Modal >
    )
}
