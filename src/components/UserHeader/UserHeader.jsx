import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useAuth from '../../auth/useAuth';
import * as MdIcon from 'react-icons/md'
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function UserHeader() {
    const auth = useAuth();

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const location = useLocation();
    const thisLocation = location.pathname

    return (
        <>
            <Container fluid className='user-header'>
                <Row className='w-100'>
                    <Col xs={3} className='d-flex align-items-center '>
                        <button className='btn' onClick={showSidebar}><MdIcon.MdViewHeadline className='menu-icon' /> </button>
                    </Col>
                    <Col xs={6} className='d-flex align-items-center'>
                        <p className='mb-0'>{`Paciente: ${auth.user.nombre} ${auth.user.apellido}`}</p>
                    </Col>
                    <Col xs={3} className='d-flex align-items-center justify-content-end'>
                        {thisLocation !== "/usuario/grupo-familiar" && <NavLink to="/usuario/grupo-familiar">Cambiar paciente</NavLink>}
                    </Col>
                </Row>
            </Container>
            <Sidebar isActive={sidebar ? 'show' : 'close'} action={showSidebar}></Sidebar>
        </>
    )
}

export default UserHeader;
