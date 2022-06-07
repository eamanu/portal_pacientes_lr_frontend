import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import '../../styles/Transitions.scss'
import useAuth from '../../hooks/useAuth';
import Loader from "../../components/Loader";
// import { loginServiceFetch } from "../../services/loginService";


function Login() {

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem("loginDataEmail")) || "");
    const [password, setPassword] = useState("");
    const [saveData, setSaveData] = useState(false);
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previousObjetURL = location.state?.from
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [number, setNumber] = useState(2) // Background

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    useEffect(() => {
        setNumber(Math.floor(Math.random() * (5 - 0)) + 1);
        setLoading(false)
    }, [])

    const onSubmit = () => {
        // setLoading(true)
        auth.loginAdmin(email, password);
        if (saveData) {
            localStorage.setItem("loginDataEmail", JSON.stringify(email));
        }
    }

    return (
        <>{loading
            ? <Loader isActive={loading}></Loader>
            : <div className={`bg-container bg${number}`}>
                <Container className='z-index-1 cont'>
                    <Row className='w-100'>
                        <Col xs={12} className="d-flex flex-column justify-content-around h-100">
                            <h2>Iniciar sesión / administrador</h2>
                            <Form className="form-group in" onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
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
                                            // pattern: {
                                            //     value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                            //     message: "El formato ingresado no es válido"
                                            // }
                                        })}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                    {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        value={password}
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
                                <Form.Group>
                                    <Form.Label><input type="checkbox" onChange={(e) => { setSaveData(e.target.value) }} /> Recordar usuario y contraseña</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    {/* <Form.Label>
                                    <Link to="/recuperar-clave">¿Olvidaste tu contraseña?</Link>
                                </Form.Label> */}
                                </Form.Group>
                                <div className="d-flex flex-column align-items-center align-items-sm-end mt-3">
                                    <Button variant="danger" type="submit">
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
}
        </>
    )
}

export default Login;
