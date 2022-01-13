import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import usePatient from '../../hooks/usePatient';
import * as FaIcon from 'react-icons/fa';


function GrupoFamiliar() {

    const p = usePatient();
    const [idPatient, setIdPatient] = useState(p.patient.id);

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
        <Container className='p-5'>
            <h1 className='text-center'>Grupo familiar</h1>
            <div className='mt-5'>
                {p.allPatients.map((patient) => {
                    return (
                        <Row key={patient.id} className={`patient ${patient.id === p.patient.id ? 'border border-3 border-success' : 'border-none'}`}>
                            <Col xs={12} md={7} onClick={() => { setIdPatient(patient.id) }} className='patient-name'>
                                <h6 className='mb-0'>{`${patient.nombre} ${patient.apellido}`}</h6>
                            </Col>
                            <Col xs={12} md={5} className='patient-actions'>
                                <p className={`mb-0 me-1 ${patient.id === p.patient.id ? 'badge bg-success' : 'badge bg-light text-dark'}`}>{patient.id === p.patient.id ? 'Activo' : 'Inactivo'}</p>
                                <button className='btn p-0' onClick={() => {verHistoriaClinica(patient.id)}}>Ver Historia Clínica</button>
                                <button className='btn text-primary ms-1 btn-icon primary'><FaIcon.FaUserEdit style={{ fontSize: '1.5rem' }}/></button>
                                <button className='btn text-danger ms-1 btn-icon dangger'><FaIcon.FaTrashAlt style={{ fontSize: '1.5rem' }}/></button>
                            </Col>
                        </Row>
                    )
                })}
            </div>
            <button className='btn btn-success mb-5'><FaIcon.FaUserPlus className='me-2' style={{ fontSize: '1.5rem' }}/>Agregar miembro</button>
        </Container >
    )
}

export default GrupoFamiliar;
