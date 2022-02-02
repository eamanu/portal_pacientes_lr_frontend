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
    }, [mql.matches])
    // Paciente
    const p = usePatient();
    const [idPatient, setIdPatient] = useState(p.patient.id);
    function handleChange() {
        p.getPatient(idPatient)
    }
    useEffect(() => {
        handleChange();
    }, [idPatient]);

    return (
        // <>
        //     <Container fluid className='user-header'>
        //         <Row className='w-100 d-flex justify-content-between'>
        //             <Col xs={2} className='d-flex d-lg-none align-items-center'>
        //                 <button className='btn menu-btn' onClick={showSidebar}>
        //                     <div className={p.patient.notificacion ? 'icon_container' : 'd-inline-block'}>
        //                         <MdIcon.MdViewHeadline className='menu-icon' />
        //                         <div className='icon_notification'></div>
        //                     </div>
        //                 </button>
        //             </Col>
        //             <Col xs={10} className='d-flex align-items-center user-header__name'>
        //                 <p className='mb-0 ms-3'>Paciente: <span className='fw-bold'>{p.patient.nombre} {p.patient.apellido}</span></p>
        //                 {thisLocation !== "/usuario/grupo-familiar" &&
        //                     <NavDropdown title="Cambiar paciente" id="basic-nav-dropdown">
        //                         {p.allPatients.map((patient) => {
        //                             return (
        //                                 <NavDropdown.Item className='p-2' key={patient.id} onClick={() => { setIdPatient(patient.id) }} >{patient.nombre} {patient.apellido}</NavDropdown.Item>
        //                             )
        //                         })}
        //                     </NavDropdown>
        //                 }
        //             </Col>
        //         </Row>
        //     </Container>
        //     <Sidebar isActive={sidebar ? 'show' : 'close'} action={showSidebar} notificacion={p.patient.notificacion ? p.patient.notificacion : false}></Sidebar>
        // </>
        <>
            <div className='user-header'>
                <div className='w-100 d-flex justify-content-sm-between justify-content-start'>
                    <div className='d-flex d-lg-none align-items-center'>
                        <button className='btn menu-btn' onClick={showSidebar}>
                            <div className={p.patient.notificacion ? 'icon_container' : 'd-inline-block'}>
                                <MdIcon.MdViewHeadline className='menu-icon' />
                                <div className='icon_notification'></div>
                            </div>
                        </button>
                    </div>
                    <div className='d-flex flex-column flex-sm-row align-items-sm-center align-items-start user-header__name justify-content-center pe-2'>
                        <p className='mb-0 ms-3 fz-'>Paciente: <span className='fw-bold'>{p.patient.nombre} {p.patient.apellido} </span></p>
                        {thisLocation !== "/usuario/grupo-familiar" &&
                            <NavDropdown title="Cambiar paciente" id="basic-nav-dropdown">
                                {p.allPatients.map((patient) => {
                                    return (
                                        <NavDropdown.Item className='p-2' key={patient.id} onClick={() => { setIdPatient(patient.id) }} >{patient.nombre} {patient.apellido}</NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                        }
                    </div>
                </div>
            </div>
            <Sidebar isActive={sidebar ? 'show' : 'close'} action={showSidebar} notificacion={p.patient.notificacion ? p.patient.notificacion : false}></Sidebar>
        </>
    )
}

export default UserHeader;
