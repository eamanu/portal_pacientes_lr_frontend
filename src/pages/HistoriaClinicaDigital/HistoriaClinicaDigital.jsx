import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import DatosPaciente from './components/DatosPaciente';
import HCDRouter from './HCDRouter';

const HistoriaClinicaDigital = () => {
    return (
        <Container className='historia-clinica'>
            <h1 className='mt-5'>Historia Clinica Digital</h1>
            <div className='mt-3'>
                <DatosPaciente />
                <Row className='mt-3 d-flex justify-content-between'>
                    <Col className='switch p-0 me-2'><NavLink activeClassName='active-switch' to='/usuario/historia-clinica/signos-vitales'>Signos vitales</NavLink></Col>
                    <Col className='switch p-0 me-2'><NavLink activeClassName='active-switch' to='/usuario/historia-clinica/estudios'>Estudios</NavLink></Col>
                    <Col className='switch p-0'><NavLink activeClassName='active-switch' to='/usuario/historia-clinica/prestaciones'>Prestaciones</NavLink></Col>
                </Row>
                <Row className='switch-container'>
                    <HCDRouter></HCDRouter>
                </Row>
            </div>
        </Container>
    )
}

export default HistoriaClinicaDigital;
