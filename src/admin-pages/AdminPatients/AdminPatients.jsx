import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminPatientsRouter from "./AdminPatientsRouter";

export default function AdminPatients() {
    const data = SidebarData.admin.find(d => d.id === 14);
    const routes = data.options

    return (
        <Container className='p-3'>
            <h5 className='section-title'>Alta de pacientes</h5>
            <Row>
                <Col className='switch-container p-3'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <p className='admin-patients_text'>Para dar el alta a un paciente, haz click en el nombre y corrobora que los datos ingresados de Nombre, Apellido, DNI y Fecha de nacimiento, coinciden con la información que figura en la imagen del documento.</p>
            <AdminPatientsRouter></AdminPatientsRouter>
        </Container>
    )
}
