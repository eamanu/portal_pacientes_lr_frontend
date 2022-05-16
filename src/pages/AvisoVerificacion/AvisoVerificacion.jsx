import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as MdIcon from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import validateEmailServices from '../../services/validateEmailServices';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';

function AvisoVerificacion() {

    // get token
    const [loading, setLoading] = useState(false)
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
                        setIsValidated(true)
                        setLoading(false)
                    } else {
                        setIsValidated(false)
                        throw new Error(res.message)
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                    setIsValidated(false)
                    setLoading(false)
                })
        },
        [],
    )

    useEffect(() => {
        if (token) {
            setLoading(true)
            validate(token)
        }
    }, [token])


    // Background
    const number = Math.floor(Math.random() * (5 - 0)) + 1;

    return (
        <div className={`bg-container bg${number}`}>
            <Container className='z-index-1 cont'>
                <Row className='w-100'>
                    {token ?
                        <>
                            {loading
                                ? <Loader isActive={loading} />
                                : <Col >
                                    <h2>Validación de correo electrónico</h2>
                                    {isValidated ?
                                        <>
                                            <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                                <MdIcon.MdOutlineCheckCircleOutline className="text-success" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineCheckCircleOutline>
                                                <p className="m-0 ms-2">El email ha sido verificado con éxito.</p>
                                            </div>
                                            <p className="m-0 ms-2">Tu solicicitud está pendiente de alta. Una vez que sea aprobada por el Ministerio de Salud, podrás ingresar en el Portal.</p>
                                        </>
                                        :
                                        <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                            <MdIcon.MdOutlineErrorOutline className="text-danger" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineErrorOutline>
                                            <p className="m-0 ms-2">Error en la validación de email.</p>
                                        </div>
                                    }
                                </Col>
                            }
                        </>
                        :
                        <Col >
                            {auth.newUser ?
                                <>
                                    <div className="w-100 d-flex flex-column flex-sm-row align-items-center mb-5">
                                        <MdIcon.MdOutlineCheckCircleOutline className="text-success me-3" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineCheckCircleOutline>
                                        <p className='mb-0'>Hemos enviado un correo a la casilla <b>{auth.newUser.email}</b>. Haz click en el link que figura en el correo para confirmar tu usuario.</p>
                                    </div>
                                    <p>Si no encuentras el correo en tu bandeja de entrada, <strong>no olvides verificar en la carpeta de spam.</strong></p>
                                    <Link to="/login">¿Ya tenés una cuenta? ¡Iniciá sesión!</Link>
                                </>
                                :
                                <>
                                    <div className="w-100 d-flex flex-column flex-sm-row align-items-center mb-5">
                                        <MdIcon.MdOutlineErrorOutline className="text-danger me-3" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineErrorOutline>
                                        <h2 className='mb-0'>Hubo un error en la registración.</h2>
                                    </div>
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
