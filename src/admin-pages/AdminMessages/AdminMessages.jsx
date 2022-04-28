import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminMessagesRouter from "./AdminMessagesRouter";

export default function AdminMessages() {
    const data = SidebarData.admin.find(d => d.id === 15);
    const routes = data.options

    return (
        <Container className='p-3'>
            <h5 className='section-title'>Mensajería</h5>
            <Row>
                <Col className='switch-container p-3'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <AdminMessagesRouter></AdminMessagesRouter>
        </Container>
    )
}
