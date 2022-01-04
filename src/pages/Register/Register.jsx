// import { useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DatePickerComponent from '../../components/DatePickerComponent';
import DniType from '../../components/DniType/DniType';
// import useAuth from '../../hookss/useAuth';

function Register() {

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/verificacion");
    }

    return (
        <Container className='h-100 d-flex align-items-center justify-content-center'>
            {/* <h1>Iniciar Sesión</h1> */}
            <Row className='w-100 h-75 d-flex align-items-center justify-content-center'>
                <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                    <div className='w-100 h-100 bg-secondary'></div>
                </Col>
                <Col xs={8} sm={7} lg={5}>
                    <h2>Registrarse</h2>
                    <Form className="form-group" onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="name"
                                        type="text"
                                        className="form-control"
                                    // onChange={(e) => { setUsername(e.target.value) }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="lastname"
                                        type="text"
                                        className="form-control"
                                    // onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>DNI</Form.Label>
                                    <Row>
                                        <Col className="pe-0" xs={7}>
                                           <DniType/>
                                        </Col>
                                        <Col className="ps-0" xs={5}>
                                            <Form.Control
                                                name="name"
                                                type="text"
                                                className="form-control"
                                            // onChange={(e) => { setUsername(e.target.value) }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <DatePickerComponent />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="text"
                                        className="form-control"
                                    // onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Form.Group>
                                <p>Una vez que los datos hayan sido verificados, recibirás una contraseña por mail.</p>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Rgistrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
