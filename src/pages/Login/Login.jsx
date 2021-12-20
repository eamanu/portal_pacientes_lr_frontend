import React from 'react';
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
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
        <div>
            <h1>Iniciar Sesión</h1>
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
        </div>

    )
}

export default Login;
