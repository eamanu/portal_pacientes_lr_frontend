import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import '../../styles/Transitions.scss';
import * as MdIcon from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { changePassword, recoverPasswordServices } from "../../services/recoverPasswordServices";
import Swal from "sweetalert2";
import { error } from "../../components/SwalAlertData";
import { useHistory } from "react-router-dom";
import Loader from '../../components/Loader'

export default function RecuperarContraseña() {

    const [loading, setLoading] = useState(false)
    const history = useHistory()
    // get token
    const location = useLocation()
    const pathname = location.pathname
    const key = pathname.split('/recuperar-clave/')
    const preToken = key[1] ? key[1].split('/') : []
    const [token, setToken] = useState(preToken[0]?.length > 15 ? preToken[0] : null)
    //useform
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    //form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    //steps and states
    const [step, setStep] = useState(token ? 3 : 1)
    const [number, setNumber] = useState(2) // Background
    const [isSuccess, setIsSuccess] = useState(false)

    const verfyEmail = useCallback(
        (email) => {
            recoverPasswordServices(email)
                .then((res) => {
                    if (res.status) {
                        setStep(2)
                        setLoading(false)
                    } else {
                        Swal.fire(error('Ha ocurrido un error al enviar el email'))
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire(error('Ha ocurrido un error al enviar el email'))
                    setLoading(false)
                })
        },
        [],
    )
    const onSubmitEmail = () => {
        setLoading(true)
        verfyEmail(email)
    }

    const change = useCallback(
        (t, p) => {
            changePassword(t, p)
                .then((res) => {
                    setStep(4)
                    if (res.status) {
                        setIsSuccess(true)
                        setLoading(false)
                    } else {
                        setIsSuccess(false)
                        throw new Error('Error al modificar contraseña')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsSuccess(false)
                    setLoading(false)
                })
        },
        [],
    )
    const onSubmitNewPassword = () => {
        setLoading(true)
        change(token, password)
    }

    const restart = () => {
        setStep(1)
        history.push('/recuperar-clave')
    }

    // Background
    useEffect(() => {
        setNumber(Math.floor(Math.random() * (5 - 0)) + 1);
    }, [])


    return (
        <div className={`bg-container bg${number} `}>
            <Container className='z-index-1 cont'>
                <Row className='w-100'>
                    {loading
                        ? <Loader isActive={loading} />
                        : <Col>
                            <h2>Recuperar contraseña</h2>
                            {step === 1 && <>
                                <p>Ingresá tu correo electrónico.</p>
                                <Form className="form-group in" onSubmit={handleSubmit(onSubmitEmail)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="text"
                                            value={email}
                                            className="form-control"
                                            {...register('email', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                pattern: {
                                                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                                    message: "El formato ingresado no es válido"
                                                }
                                            })}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                        {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <div className="d-flex flex-column align-items-end">
                                        <Button variant="outline-danger" type="submit">
                                            Enviar
                                        </Button>
                                    </div>
                                </Form>
                            </>
                            }
                            {step === 2 &&
                                <>
                                    <p>Hemos enviado un correo electrónico a <strong>{email} </strong>. Haz click en el link que figura en el correo para actualizar tu contraseña.</p>
                                    <p>Si no encuentras el correo en tu bandeja de entrada, <strong>no olvides verificar en la carpeta de spam.</strong></p>

                                </>

                            }
                            {step === 3 && token && <>
                                <p>Ingresá una contraseña nueva.</p>
                                <Form className="form-group in" onSubmit={handleSubmit(onSubmitNewPassword)}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Contraseña</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            {...register('password', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: "La contraseña debe tener al menos 6 caracteres",
                                                }
                                            })}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                        {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Confirmar contraseña</Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            type="password"
                                            className="form-control"
                                            {...register('confirmPassword', {
                                                validate: (value) => value === getValues("password") || 'Las contraseñas no coinsiden',
                                            })}
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        />
                                        {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <div className="d-flex flex-column align-items-end">
                                        <Button variant="outline-danger" type="submit">
                                            Actualizar contraseña.
                                        </Button>
                                    </div>
                                </Form>
                            </>
                            }
                            {step === 4 && <>
                                {isSuccess &&
                                    <div className="in">
                                        <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                            <MdIcon.MdOutlineCheckCircleOutline className="text-success" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineCheckCircleOutline>
                                            <p className="m-0 ms-2">La contraseña ha sido actualizada con éxito.</p>
                                        </div>
                                        <p className="mt-2 ms-2 ">Ya podés <Link to="/login">iniciar sesión</Link> con tu nueva contraseña.</p>
                                    </div>}
                                {!isSuccess &&
                                    <div className="in">
                                        <div className="w-100 d-flex flex-column flex-sm-row align-items-center">
                                            <MdIcon.MdOutlineErrorOutline className="text-danger" style={{ fontSize: "5rem" }}></MdIcon.MdOutlineErrorOutline>
                                            <p className="m-0 ms-2">Hubo un error al actualizar la contraseña.</p>
                                        </div>
                                        <button className="btn text-primary mt-2" onClick={() => { restart() }}>Intentar nuevamente.</button>
                                    </div>}
                            </>
                            }
                        </Col>
                    }
                </Row >
            </Container >
        </div>
    )
}
