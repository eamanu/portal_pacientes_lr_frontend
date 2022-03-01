import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from '../../components/Sidebar/SidebarData';
import InstitucionesRouter from "./InstitucionesRouter";


export default function Instituciones() {
    const routes = SidebarData.instituciones;
    

    return (
        <Container className='p-3' >
            <Row>
                <Col className='switch-container'>
                {routes.map((route) => {
                    return(
                        <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                    )
                })}
                </Col>
            </Row>
            <InstitucionesRouter></InstitucionesRouter>
        </Container>
    )
}
