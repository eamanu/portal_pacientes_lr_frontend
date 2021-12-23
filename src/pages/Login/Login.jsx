
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useAuth from '../../auth/useAuth';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previousObjetURL = location.state?.from
    // console.log(previousObjetURL);

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login(username, password)
    }

    return (
        <Container className='h-100 d-flex align-items-center justify-content-center'>
            {/* <h1>Iniciar Sesión</h1> */}
            <Row className='w-100 h-75 d-flex align-items-center justify-content-center'>
                <Col xs={12} sm={5} md={4} className='h-100 d-none d-sm-flex'>
                   <div className='w-100 h-100 bg-secondary'></div> 
                </Col>
                <Col xs={8} sm={7} md={5}>
                        <h2>Iniciar sesión</h2>
                    <Form className="form-group" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                name="username"
                                type="text"
                                className="form-control"
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                className="form-control"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Login;
