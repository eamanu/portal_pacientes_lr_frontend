import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import usePatient from '../../hooks/usePatient'
import * as FaIcon from 'react-icons/fa'
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';

function UserHeader() {
    // useLocation
    const location = useLocation();
    const thisLocation = location.pathname

    // Paciente
    const p = usePatient();
    const [dniPatient, setDniPatient] = useState(p.patient.identification_number);
    function handleChange() {
        p.getPatient(dniPatient)
    }
    useEffect(() => {
        handleChange();
    }, [dniPatient]);

    // console.log(p.patient)

    return (
        <>
            <div className='user-header'>
                <div className='w-100 d-flex align-items-center user-header__name justify-content-between justify-content-sm-start pe-2'>
                    <p className='mb-0 ms-3'>Paciente: <span className='fw-bold'>{p.patient.name} {p.patient.surname} </span></p>
                    <div className='d-flex align-items-center'>
                        <NavLink activeClassName="" to={"/usuario/notificaciones"}>
                            <div className='icon_container'><FaIcon.FaRegBell className='notification_icon' />{p.patient.mensajes?.length > 0 && <div className='notification_circle in'></div>}</div>
                        </NavLink>
                        {thisLocation != '/usuario/grupo-familiar' &&
                         <NavDropdown title="Cambiar paciente" id="basic-nav-dropdown">
                            {p.allPatients.map((patient) => {
                                return (
                                    <NavDropdown.Item className='p-2' key={patient.identification_number} onClick={() => { setDniPatient(patient.identification_number) }} >{patient.name} {patient.surname}</NavDropdown.Item>
                                )
                            })}
                        </NavDropdown>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHeader;
