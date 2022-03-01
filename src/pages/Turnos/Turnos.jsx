import { Col, Container, Row } from "react-bootstrap";
import TurnosRouter from "./TurnosRouter";
import { SidebarData } from '../../components/Sidebar/SidebarData'
import { NavLink } from "react-router-dom";

export default function Turnos() {
    const routes = SidebarData.perfilDelPaciente[2].options;

    return (
        <Container className='p-3'>
            <Row>
                <Col className='switch-container'>
                {routes.map((route) => {
                    return(
                        <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                    )
                })}
                </Col>
            </Row>
            <TurnosRouter></TurnosRouter>
        </Container>
    )
}
