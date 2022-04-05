import { Container, Row, Col, } from 'react-bootstrap';
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Register() {

    // Background
    const number = Math.floor(Math.random() * (6 - 0)) + 1;

    return (
        <div className={`bg-container bg${number} h-100 w-100 d-flex align-items-center justify-content-center position-relative`}>
            <div className="circle"></div>
            <Container className='h-100 d-flex align-items-center justify-content-center z-index-1 mb-5 mb-sm-0'>
                <Row className='w-100 h-75  d-flex align-items-center justify-content-center mb-5 mb-sm-0'>
                    <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                        <div className='w-100 h-100 pic'></div>
                    </Col>
                    <Col xs={12} sm={7} lg={6} className="d-flex flex-column h-100 justify-content-between bg-third pb-3 pb-sm-0">
                        <h2>Registrarse</h2>
                        <div className="d-flex align-items-center" style={{ height: "auto", minHeight: "80%", }}>
                            <RegisterForm formType={"user"} ></RegisterForm>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Register;
