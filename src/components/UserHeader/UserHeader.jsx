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
    const [idPatient, setIdPatient] = useState(p.patient.id);
    function handleChange() {
        p.getPatient(idPatient)
    }
    useEffect(() => {
        handleChange();
    }, [idPatient]);

    // console.log(p.patient)

    return (
        <>
            <div className='user-header'>
                <div className='w-100 d-flex align-items-center user-header__name justify-content-between justify-content-sm-start pe-2'>
                    <p className='mb-0 ms-3'>Paciente: <span className='fw-bold'>{p.patient.nombre} {p.patient.apellido} </span></p>
                    <div className='d-flex align-items-center'>
                        <NavLink activeClassName="" to={"/usuario/notificaciones"}>
                            <div className='icon_container'><FaIcon.FaRegBell className='notification_icon' />{p.patient.mensajes?.length > 0 && <div className='notification_circle in'></div>}</div>
                        </NavLink>
                        <NavDropdown title="Cambiar paciente" id="basic-nav-dropdown">
                            {p.allPatients.map((patient) => {
                                return (
                                    <NavDropdown.Item className='p-2' key={patient.id} onClick={() => { setIdPatient(patient.id) }} >{patient.nombre} {patient.apellido}</NavDropdown.Item>
                                )
                            })}
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHeader;
