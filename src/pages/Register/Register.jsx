import { Container, Row, Col, } from 'react-bootstrap';
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Register() {
    
    return (
        <Container className='h-100 d-flex align-items-center justify-content-center'>
            <Row className='w-100 h-75  d-flex align-items-center justify-content-center mb-5 mb-sm-0'>
                <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                    <div className='w-100 h-100 pic'></div>
                </Col>
                <Col xs={12} sm={7} lg={5} className="h-100 d-flex flex-column justify-content-between">
                    <h2>Registrarse</h2>
                    <div className="d-flex align-items-center"  style={{height: "auto", minHeight: "80%",}}>
                        <RegisterForm formularioUsuario={true} ></RegisterForm>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}

export default Register;
