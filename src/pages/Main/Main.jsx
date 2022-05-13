import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';


const Main = () => {

    const links = [
        { id: 1, path: "/usuario/grupo-familiar", namePath: "Grupo Familiar", icon: <MdIcon.MdOutlineGroup className="main__icon" /> },
        { id: 2, path: "/usuario/historia-clinica/alergias", namePath: "Historia Clínica", icon: <MdIcon.MdOutlineFolderShared className="main__icon" /> },
        // { id: 3, path: "/usuario/calendario-vacunacion", namePath: "Calendario de Vacunación", icon: <MdIcon.MdEditCalendar className="main__icon" /> },
        { id: 4, path: "/usuario/programa-sumar", namePath: "Programa Sumar", icon: <MdIcon.MdAddCircleOutline className="main__icon" /> }
    ]


    return (
        <Container className="main pt-5">
            <Row className="d-flex justify-content-center">
                <Col xs={12} lg={6}>
                    <img className='main__banner' src={logoFondoBlanco} alt="logo fondo rojo - portal del paciente la rioja" />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center p-3 in">
                {links.map((link) =>
                    <Col key={link.id} xs={12} md={5} className='main__card'>
                        <Link className="btn-outline-danger" to={link.path}>
                            {link.icon}
                            <h5>{link.namePath}</h5>
                        </Link>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default Main;
