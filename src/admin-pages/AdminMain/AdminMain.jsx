import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';


const AdminMain = () => {

    const links = [
        { id: 1, path: "/admin/alta-de-pacientes/pacientes-pendientes", namePath: "Alta de pacientes", icon: <FaIcon.FaUserCheck className="main__icon" /> },
        { id: 2, path: "/admin/mensajeria/mensajes-enviados", namePath: "Mensajería", icon: <MdIcon.MdOutlineMessage className="main__icon" /> },
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

export default AdminMain;
