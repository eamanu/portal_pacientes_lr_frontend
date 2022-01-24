import React, { useState, useEffect } from 'react';
import { Container, Row, Col, NavDropdown } from 'react-bootstrap';
import usePatient from '../../hooks/usePatient'
import * as MdIcon from 'react-icons/md'
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function UserHeader() {
    // useLocation
    const location = useLocation();
    const thisLocation = location.pathname
    // Media query sidebar
    const mql = window.matchMedia("(min-width: 768px)")
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {
        if (mql.matches) {
            setSidebar(true)
        } else {
            setSidebar(!sidebar);
        }
    }
    useEffect(() => {
        if (mql.matches) {
            setSidebar(true)
          } else {
            setSidebar(false)
          }
    }, [])
    // Paciente
    const p = usePatient();
    const [idPatient, setIdPatient] = useState(p.patient.id);
    const handleChange = () => {
        p.getPatient(idPatient)
    }
    useEffect(() => {
        handleChange();
    }, [idPatient]);

    return (
        <>
            <Container fluid className='user-header'>
                <Row className='w-100 d-flex justify-content-between'>
                    <Col xs={2} className='d-flex d-md-none align-items-center'>
                        <button className='btn menu-btn' onClick={showSidebar}><MdIcon.MdViewHeadline className='menu-icon' /> </button>
                    </Col>
                    <Col xs={10} className='d-flex align-items-center user-header__name'>
                        <p className='mb-0 ms-3'>Paciente: <span className='fw-bold'>{p.patient.nombre} {p.patient.apellido}</span></p>
                        {thisLocation !== "/usuario/grupo-familiar" &&
                        <NavDropdown title="Cambiar paciente" id="basic-nav-dropdown">
                            {p.allPatients.map((patient) => {
                                return (
                                    <NavDropdown.Item className='p-2'key={patient.id} onClick={() => { setIdPatient(patient.id) }} >{patient.nombre} {patient.apellido}</NavDropdown.Item>
                                )
                            })}
                        </NavDropdown>
                        }
                    </Col>
                </Row>
            </Container>
            <Sidebar isActive={sidebar ? 'show' : 'close'} action={showSidebar}></Sidebar>
        </>
    )
}

export default UserHeader;
