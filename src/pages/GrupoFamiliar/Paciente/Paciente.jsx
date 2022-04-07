import React from 'react';
import usePatient from '../../../hooks/usePatient';
import * as FaIcon from 'react-icons/fa';
import * as MdIcon from 'react-icons/md';

export const Paciente = (props) => {

    const p = usePatient();
    const { patientId, patientNombre, patientApellido, verHistoriaClinica, handlePatient } = props

    return (
        <div className={`patient in`}>
            <div onClick={() => { handlePatient(patientId) }} className='patient-name'>
                <h6 className='mb-0'>{`${patientNombre} ${patientApellido}`}</h6>
            </div>
            <div className='patient-actions'>
                <p className={`mb-0 me-2 ${patientId === p.patient.id ? 'badge bg-success' : 'badge bg-light text-dark'}`}>{patientId === p.patient.id ? 'Activo' : 'Inactivo'}</p>
                <div className="my-tooltip">
                    <button className='btn text-secondary btn-icon' onClick={() => { verHistoriaClinica(patientId) }}><MdIcon.MdFolderShared style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Ver historia clínica
                    </span>
                </div>
                <div className="my-tooltip">
                    <button className='btn text-secondary btn-icon'><FaIcon.FaUserEdit style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Editar
                    </span>
                </div>

            </div>
        </div>
    )
}
