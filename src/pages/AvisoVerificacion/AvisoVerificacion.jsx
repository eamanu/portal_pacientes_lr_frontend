import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AvisoVerificacion() {
    const auth = useAuth();

    // Background
    const number = Math.floor(Math.random() * (6 - 0)) + 1;

    return (
        <div className={`bg-container bg${number} h-100 w-100 d-flex align-items-center justify-content-center position-relative`}>
            <div className="circle"></div>
            <Container className='h-100 d-flex align-items-center justify-content-center z-index-1 mb-5 mb-sm-0'>
                <Row className='w-100 h-75 d-flex align-items-center justify-content-center'>
                    <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                        <div className='w-100 h-100 pic'></div>
                    </Col>
                    <Col xs={8} sm={7} lg={5}>
                        {auth.newUser ? <>
                            <h2>Confirmá tu correo electrónico</h2>
                            <p className='mb-5'>Hemos enviado un correo a la casilla <b>{auth.newUser.email}</b>. Haz click en el link que figura en el correo para confirmar tu usuario.</p>
                            <p>Si no encuentras el correo en tu bandeja de entrada, no olvides verificar en la carpeta de spam.</p>
                            <Link to="/login">¿Ya tenés una cuenta? ¡Iniciá sesión!</Link>
                        </> :
                            <>
                                <h2 className='mb-5'>Hubo un error en la registración.</h2>
                                <Link to="/register">Haz click aquí para intentarlo nuevamente</Link>
                                <br></br>
                                <Link to="/login">¿Ya tienes una cuenta? ¡Iniciá sesión!</Link>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AvisoVerificacion;
