import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import usePatient from '../../hooks/usePatient';


function GrupoFamiliar() {
    
    const p = usePatient()
    const [idPatient, setIdPatient] = useState(p.patient.id)

    useEffect(() => {
        p.getPatient(idPatient)
    }, [p, idPatient])


    return (
        <Container>
            <h1 className='text-center mt-5'>Grupo familiar</h1>
            <div className='mt-5'>
            {p.allPatients.map((patient) => {
                return (
                    <Row  key={patient.id} className='patient'>
                        <Col xs={8}  onClick={() => { setIdPatient(patient.id) }} className='patient-name'>
                            <h6 className='mb-0'>{`${patient.nombre} ${patient.apellido}`}</h6>                     
                        </Col>
                        <Col xs={4} className='patient-actions'>
                            <p className={`mb-0 me-1 ${patient.id === p.patient.id ? 'badge bg-success' : 'badge bg-light text-dark'}` }>{patient.id === p.patient.id ? 'Activo' : 'Inactivo'}</p>
                            <button className='btn btn-primary ms-1'>Editar</button>
                            <button className='btn btn-danger ms-1'>Eliminar</button>
                        </Col>
                    </Row>
                )
            })}
            </div>
        </Container>
    )
}

export default GrupoFamiliar;
