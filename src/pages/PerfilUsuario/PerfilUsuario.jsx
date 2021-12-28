import React from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import DatePickerComponent from '../../components/DatePickerComponent';
import DniType from '../../components/DniType/DniType';
import "../../styles/PerfilUsuario.scss"

function PerfilUsuario({ show, handleClose }) {
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                className="perfil-usuario"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Perfil del usuario</Modal.Title>
                </Modal.Header>
                <Form className="form-group">
                    <Modal.Body>
                        <Container>
                            <h5>Datos Personales</h5>
                            <Row>
                                <Col xs={12} md={6}>
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
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        // onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Documento</Form.Label>
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
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                            <DatePickerComponent />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        // onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        // onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        // onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Teléfono Alternativo</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        // onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary">Guardar Cambios</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default PerfilUsuario;
