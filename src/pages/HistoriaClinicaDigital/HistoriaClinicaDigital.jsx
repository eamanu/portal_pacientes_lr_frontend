import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../../components/Sidebar/SidebarData'
import HCDRouter from './HCDRouter';

const HistoriaClinicaDigital = () => {

    const routes = SidebarData.perfilDelPaciente[4].options;

    return (
        <Container className='historia-clinica p-3'>
            <h5 className='section-title'>Historia Clínica Digital</h5>
            <Row>
                <Col className='switch-container'>
                {routes.map((route) => {
                    return(
                        <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                    )
                })}
                </Col>
            </Row>
            <Row>
                <Col className='switch-container__hc'>
                    <HCDRouter></HCDRouter>
                </Col>
            </Row>

        </Container>
    )
}

export default HistoriaClinicaDigital;
