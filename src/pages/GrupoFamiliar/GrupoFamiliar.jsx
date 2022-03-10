import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import usePatient from '../../hooks/usePatient';
import * as FaIcon from 'react-icons/fa';
import { Paciente } from './Paciente/Paciente';


function GrupoFamiliar() {

    const p = usePatient();
    const [idPatient, setIdPatient] = useState(p.patient.id);

    const handlePatient = (id) => {
        setIdPatient(id)
    }

    const history = useHistory();
    const verHistoriaClinica = (id) => {
        setIdPatient(id);
        setTimeout(() => {
            history.push('/usuario/historia-clinica');
        }, 300);
    }

    useEffect(() => {
        p.getPatient(idPatient)
    }, [p, idPatient]);

    return (
        <Container className='p-3'>
            <h5 className='section-title mb-3'>Grupo familiar</h5>
            {p.allPatients.map((patient) => {
                return (
                    <Paciente
                        key={patient.id}
                        patientId={patient.id}
                        patientNombre={patient.nombre}
                        patientApellido={patient.apellido}
                        verHistoriaClinica={verHistoriaClinica}
                        handlePatient={handlePatient}
                    />
                )
            })}
            <Row className="w-100 mb-3 ms-0">
                <Col className="w-100 d-flex justify-content-end pe-0">
                    <Link to="/usuario/agregar-paciente">
                        <button className='btn btn-danger'><FaIcon.FaUserPlus className='me-2' style={{ fontSize: '1.5rem' }} />Agregar miembro</button>
                    </Link>
                </Col>
            </Row>
        </Container >
    )
}

export default GrupoFamiliar;
