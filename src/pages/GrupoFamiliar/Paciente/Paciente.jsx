import React, { useState } from 'react';
import usePatient from '../../../hooks/usePatient';
import * as FaIcon from 'react-icons/fa';
import * as MdIcon from 'react-icons/md';
import Profile from '../../../components/Profile/Profile';
import { Row, Col } from 'react-bootstrap';

export const Paciente = (props) => {

    const p = usePatient();
    const { patientIdn, patientNombre, patientApellido, verHistoriaClinica, handlePatient } = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Row className={`patient in`}>
            <Col xs={12} md={8} className='patient-name'>
                <h6 className='mb-0 text-capitalize'>{`${patientNombre} ${patientApellido}`}</h6>
            </Col>
            <Col xs={12} md={4} className='patient-actions'>
                <div className={`status-container ${patientIdn === p.patient.identification_number ? 'bg-primary' : 'bg-secondary'}`} onClick={() => { handlePatient(patientIdn) }}>
                    <p className="mb-0 text-ligth">{patientIdn === p.patient.identification_number ? 'Perfil activo' : 'Activar perfil'}</p>
                </div>
                <div className="my-tooltip">
                    <button className='btn text-secondary btn-icon' onClick={() => { verHistoriaClinica(patientIdn) }}><MdIcon.MdFolderShared style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Ver historia clínica
                    </span>
                </div>
                <div className="my-tooltip">
                    <button className='btn text-secondary btn-icon' onClick={() => { handleShow() }} ><FaIcon.FaUserEdit style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Editar
                    </span>
                </div>
                {show && <Profile type={'patient'} show={show} handleClose={handleClose} />}
            </Col>
        </Row>
    )
}
