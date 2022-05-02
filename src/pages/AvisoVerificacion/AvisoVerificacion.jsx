import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as MdIcon from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import validateEmailServices from '../../services/validateEmailServices';
import { useLocation } from 'react-router-dom';

function AvisoVerificacion() {

    // const history = useHistory();
    // get token
    const location = useLocation();
    const pathname = location.pathname
    const key = pathname.split('/verificacion/')
    const [token, setToken] = useState(key[1]?.length > 15 ? key[1] : null);
    const [isValidated, setIsValidated] = useState(false)
    // email
    const auth = useAuth();

    const validate = useCallback(
        (token) => {
            validateEmailServices(token)
                .then((res) => {
                    if (res.status) {
                        console.log(res.status)
                        setIsValidated(true)
                    } else {
                        setIsValidated(false)
                        throw new Error(res.message)
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                    setIsValidated(false)    
                })
        },
        [],
    )

    useEffect(() => {
        validate(token) 
    }, [token])


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
                    {token ?
                        <>
                            <Col xs={8} sm={7} lg={5}>
                                <h2>Validación de correo electrónico</h2>
                                {isValidated ?
                                    <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                        <MdIcon.MdOutlineCheckCircleOutline className="text-success" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineCheckCircleOutline>
                                        <p className="m-0 ms-2">El email ha sido verificado con éxico.</p>
                                        <p className="m-0 ms-2">Tu solicicitud está pendiente de alta. Una vez que sea aprobada por el Ministerio de Salud, podrás ingresar en el Portal.</p>
                                    </div>
                                    :
                                    <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                        <MdIcon.MdOutlineErrorOutline className="text-danger" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineErrorOutline>
                                        <p className="m-0 ms-2">Error en la validación de email.</p>
                                    </div>
                                }
                            </Col>
                        </>
                        :
                        <Col xs={8} sm={7} lg={5}>
                            {auth.newUser ? <>
                                <p className='mb-5'>Hemos enviado un correo a la casilla <b>{auth.newUser.email}</b>. Haz click en el link que figura en el correo para confirmar tu usuario.</p>
                                <p>Si no encuentras el correo en tu bandeja de entrada, <strong>no olvides verificar en la carpeta de spam.</strong></p>
                                <Link to="/login">¿Ya tenés una cuenta? ¡Iniciá sesión!</Link>
                            </> :
                                <>
                                    <h2 className='mb-5'>Hubo un error en la registración.</h2>
                                    <Link to="/register">Haz click aquí para intentarlo nuevamente</Link>
                                    <br></br>
                                    <Link to="/login">¿Ya tienes una cuenta? ¡Iniciá sesión!</Link>
                                </>
                            }
                        </Col>}
                </Row>
            </Container>
        </div>
    )
}

export default AvisoVerificacion;
