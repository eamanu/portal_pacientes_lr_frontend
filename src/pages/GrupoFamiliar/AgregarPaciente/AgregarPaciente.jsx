import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';

export default function AgregarPaciente() {
    return (
        <Container className="p-3 h-100">
            <h5 className='section-title mb-3'>Agregar paciente a grupo familiar</h5>
            <Row className="h-100 d-flex flex-column justify-content-between">
                <Col xs={12} sm={6} >
                    <RegisterForm formularioUsuario={false}></RegisterForm>
                </Col>
            </Row>
            <div className="d-flex flex-column align-items-end mt-3">
                <Link to="/usuario/grupo-familiar">
                    <button className="btn btn-outline-secondary">Cancelar</button>
                </Link>
            </div>
        </Container>
    )
}
