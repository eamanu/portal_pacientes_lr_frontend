import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previousObjetURL = location.state?.from
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    const onSubmit = () => {
        auth.login(email, password)
    }

    return (
        <Container className='h-100 d-flex align-items-center justify-content-center'>
            {/* <h1>Iniciar Sesión</h1> */}
            <Row className='w-100 h-75 d-flex align-items-center justify-content-center'>
                <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                   <div className='w-100 h-100 pic'></div> 
                </Col>
                <Col xs={8} sm={7} lg={5}>
                        <h2>Iniciar sesión</h2>
                    <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
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
                                onChange={(e) => { setEmail(e.target.value)}}
                            /> 
                            {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
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
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Recordar usuario y contraseña" />
                        </Form.Group>
                        <Button variant="outline-danger" type="submit">
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Login;
