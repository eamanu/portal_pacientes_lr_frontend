import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectType from '../../components/SelectType';
import { variantsGender, variantsDNI, endDate } from '../../components/ComponentsData';
import useAuth from '../../hooks/useAuth';
import "../../styles/PerfilUsuario.scss"

function PerfilUsuario({ show, handleClose }) {

    const auth = useAuth();
    const [values, setValues] = useState({
        firstName: auth.newUser.firstName,
        lastName: auth.newUser.lastName,
        id_type: auth.newUser.id_type,
        id_number: auth.newUser.id_number,
        date_of_birth: auth.newUser.date_of_birth,
        id_gender: auth.newUser.id_gender,
        email: auth.newUser.email,
        password: auth.newUser.password,
        confirmPassword: auth.newUser.confirmPassword,
        direction_one: "",
        direction_two: "",
        mobile_phone: "",
        mobile_phone_two: "",
    });

    const { handleSubmit } = useForm();
    const endDateDatePicker = endDate()

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target?.name || "date_of_birth"]: e.target?.value || e
        }
        );
    }

    const onSubmit = () => {
        alert("Los cambios se han guardado");
        auth.register(values)
    }


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
                <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Container>
                            <h5>Datos Personales</h5>
                            {auth.user && <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Nombre</Form.Label>
                                        <Form.Control
                                            name="firstName"
                                            type="text"
                                            value={auth.user.nombre}
                                            disabled
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Apellido</Form.Label>
                                        <Form.Control
                                            name="lastName"
                                            type="text"
                                            value={auth.user.apellido}
                                            disabled
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Tipo de documento</Form.Label>
                                        <SelectType
                                            name="id_type"
                                            variants={variantsDNI}
                                            nameForm="id_type"
                                            disabled
                                            selectValue={1}
                                            handleChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Número de documento</Form.Label>
                                        <Form.Control
                                            name="id_number"
                                            type="text"
                                            disabled
                                            className="form-control"
                                            value={auth.user.dni}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Fecha de Nacimiento</Form.Label>
                                        <DatePickerComponent
                                            maxDate={endDateDatePicker}
                                            name="date_of_birth"
                                            nameForm="date_of_birth"
                                            disabled
                                            selectValue={auth.newUser.date_of_birth}
                                            handleChange={(date) => handleChange(date)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Género</Form.Label>
                                        <SelectType
                                            name="id_gender"
                                            variants={variantsGender}
                                            nameForm="id_gender"
                                            disabled
                                            selectValue={2}
                                            handleChange={(e) => handleChange(e)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="text"
                                            disabled
                                            value={auth.user.email}
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Contraseña</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            disabled
                                            value={auth.user.password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Repetir contraseña</Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            type="password"
                                            className="form-control"
                                            disabled
                                            value={auth.user.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        <p>Si usted desea modificar su Email o contraseña debe comunicarse con el equipo de soporte a través del siguiente link</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Teléfono celular</Form.Label>
                                        <Form.Control
                                            name="mobile_phone"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Teléfono alternativo</Form.Label>
                                        <Form.Control
                                            name="mobile_phone_two"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Dirección principal</Form.Label>
                                        <Form.Control
                                            name="direction_one"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Dirección alternativa</Form.Label>
                                        <Form.Control
                                            name="direction_two"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>}
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="dark" type="submit">Guardar Cambios</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default PerfilUsuario;
