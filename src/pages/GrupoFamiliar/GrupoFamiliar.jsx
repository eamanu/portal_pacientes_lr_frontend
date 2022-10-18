import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import usePatient from '../../hooks/usePatient';
import * as FaIcon from 'react-icons/fa';
import { Paciente } from './Paciente/Paciente';
import Loader from '../../components/Loader';


function GrupoFamiliar() {

    const [loading, setLoading] = useState(true)
    const p = usePatient();
    const [dniPatient, setDniPatient] = useState(p.patient.identification_number);
    const handlePatient = (idn) => {
        setDniPatient(idn)
    }

    const history = useHistory();
    const verHistoriaClinica = (idn) => {
        setDniPatient(idn);
        setTimeout(() => {
            history.push('/usuario/historia-clinica/alergias');
        }, 300);
    }

    useEffect(() => {
        p.getPatient(dniPatient)
        setLoading(false)
    }, [dniPatient]);

    return (
        <Container className='p-3'>
            <h5 className='section-title mb-3'>Grupo familiar</h5>
            {/* <Row className="w-100 mb-3 ms-0">
                <Col className="w-100 d-flex justify-content-end pe-0">
                    <Link to="/usuario/agregar-paciente">
                        <button className='btn btn-danger'><FaIcon.FaUserPlus className='me-2' style={{ fontSize: '1.5rem' }} />Agregar miembro</button>
                    </Link>
                </Col>
            </Row> */}
            {loading
                ? <Loader isActive={loading} />
                : <Container>
                    {p.allPatients.map((patient, i) => {
                        return (
                            <Paciente
                                key={patient.identification_number + i}
                                patientIdn={patient.identification_number}
                                patientNombre={patient.name}
                                patientApellido={patient.surname}
                                verHistoriaClinica={verHistoriaClinica}
                                handlePatient={handlePatient}
                            />
                        )
                    })}
                </Container>
            }
        </Container >
    )
}

export default GrupoFamiliar;
