import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as MdIcon from 'react-icons/md';

const Main = () => {

    return (
        <Container className="main">
            <h1 className='text-center mt-5'>Te damos la bienvenida al Portal de Pacientes de La Rioja</h1>
            <Row className="mt-5 d-flex justify-content-center p-3">
                <Col xs={12} md={5} className='main-card'><Link to="/usuario/grupo-familiar"><MdIcon.MdFamilyRestroom className="main-icon"/><h5>Grupo Familiar</h5></Link></Col>
                <Col xs={12} md={5} className='main-card'><Link to="/usuario/historia-clinica"><MdIcon.MdFolderShared className="main-icon"/><h5>Historia Clinica</h5></Link></Col>
                <Col xs={12} md={5} className='main-card'><Link to="/usuario/calendario-vacunacion"><MdIcon.MdEditCalendar className="main-icon"/><h5>Calendario de Vacunación</h5></Link></Col>
                <Col xs={12} md={5} className='main-card'><Link to="/usuario/programa-sumar"><MdIcon.MdAddCircleOutline className="main-icon"/><h5>Programa Sumar</h5></Link></Col>
            </Row>
        </Container>
    )
}

export default Main;
