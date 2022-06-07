import React, { useState, useEffect, useCallback } from 'react';
import { Container, NavDropdown } from 'react-bootstrap';
import usePatient from '../../hooks/usePatient'
import * as FaIcon from 'react-icons/fa'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
import { getMessagesByPerson } from '../../services/messagesServices';
import Swal from 'sweetalert2';
import { error } from '../SwalAlertData';

function UserHeader() {
    // useLocation
    const location = useLocation();
    const thisLocation = location.pathname
    // Person
    const p = usePatient();
    const idPerson = p.patient.id
    const [dniPatient, setDniPatient] = useState(p.patient.identification_number);
    function handleChange() {
        p.getPatient(dniPatient)
    }
    useEffect(() => {
        if(dniPatient !== p.patient.identification_number){
            handleChange();
        }
    }, [dniPatient]);

    useEffect(() => {
        setDniPatient(p.patient.identification_number);
    }, [p.patient]);

    useEffect(() => {
        p.getPatient(p.patient.identification_number);
    }, []);

    //are there messages?
    const [messages, setMessages] = useState([])
    const getMessages = useCallback(
        (person_id, only_unread) => {
            getMessagesByPerson(person_id, only_unread)
                .then((res) => {
                    if (res) {
                        setMessages(res);
                        return messages
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire(error('Error al cargar los mensajes'))
                })
        },
        [],
    )

    useEffect(() => {
        getMessages(idPerson, true)
    }, [idPerson])

    return (
        <>
            <div className='user-header'>
                <div className='user-header__name  pe-2'>
                    <div className='d-flex align-items-center w-100 w-md-0 justify-content-between '>
                        <p className='mb-0 ms-3 fw-lighter'>Paciente: <span className='fw-normal text-uppercase'>{p.patient.name} {p.patient.surname} </span></p>
                        <NavLink to={"/usuario/notificaciones"}>
                            <div className='icon_container me-4 me-md-0'><FaIcon.FaRegBell className='notification_icon' />{messages.length > 0 && <div className='notification_circle in'></div>}</div>
                        </NavLink>
                    </div>
                    <div className='d-flex align-items-center  me-4'>
                        {thisLocation !== '/usuario/grupo-familiar' &&
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
