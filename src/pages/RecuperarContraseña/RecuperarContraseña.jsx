import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import '../../styles/Transitions.scss';
import * as MdIcon from "react-icons/md";
import { Link } from "react-router-dom";

export default function RecuperarContraseña() {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false)

    const enviarCodigo = () => {
        console.log(email);
        setStep(step + 1);
    }
    const verificarCodigo = () => {
        console.log(codigo);
        setStep(step + 1);
    }
    const crearNuevaContraseña = () => {
        console.log(password);
        setStep(step + 1);
        setIsSuccess(false);
    }
    const reiniciarComponente = () => {
        setStep(1);
        setIsSuccess(false);
    }

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
                    {step === 1 && <>
                        <h2>Recuperar contraseña</h2>
                        <p>Ingresá tu correo electrónico.</p>
                        <Form className="form-group in" onSubmit={handleSubmit(enviarCodigo)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="text"
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
                    {step === 2 && <>
                        <h2>Recuperar contraseña</h2>
                        <p>Hemos enviado un código a la casilla <b>{email}</b>. Ingresá aquí el codigo que figura en el correo.</p>
                        <Form className="form-group in" onSubmit={handleSubmit(verificarCodigo)}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    name="codigo"
                                    type="text"
                                    className="form-control"
                                    {...register('codigo', {
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        },
                                        // minLength: {
                                        //     value: 3,
                                        //     message: "La contraseña debe tener al menos 3 caracteres",
                                        // }
                                    })}
                                    onChange={(e) => { setCodigo(e.target.value) }}
                                />
                                {errors.codigo && <ErrorMessage><p>{errors.codigo.message}</p></ErrorMessage>}
                            </Form.Group>
                            <div className="d-flex flex-column align-items-end">
                                <Button variant="outline-danger" type="submit">
                                    Verificar
                                </Button>
                            </div>
                        </Form>
                    </>}
                    {step === 3 && <>
                        <p>Ingresá una contraseña nueva.</p>
                        <Form className="form-group in" onSubmit={handleSubmit(crearNuevaContraseña)}>
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
                                            value: 3,
                                            message: "La contraseña debe tener al menos 3 caracteres",
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
                    </>}
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
                                <button className="btn text-primary mt-2" onClick={() => {reiniciarComponente()}}>Intentar nuevamente.</button>
                            </div>}
                    </>
                    }
                </Col>
            </Row >
        </Container >
        </div> 
    )
}
