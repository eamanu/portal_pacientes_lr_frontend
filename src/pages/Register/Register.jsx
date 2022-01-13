import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { variantsDNI, variantsGender, endDate } from '../../components/ComponentsData';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectType from '../../components/SelectType';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';

function Register() {

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const endDateDatePicker = endDate()
    const history = useHistory()
    const auth = useAuth();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        id_type: "",
        id_number: "",
        date_of_birth: "",
        id_gender: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target?.name || "date_of_birth"]: e.target?.value || e
        }
        );
    }

    useEffect(() => {
        setValue('id_type', values.id_type);
        setValue('id_gender', values.id_gender);
        setValue('date_of_birth', values.date_of_birth);
    }, [values.id_type, values.id_gender, values.date_of_birth, setValue])
    // }, [values])

    const onSubmit = () => {
        auth.register(values)
        history.push("/verificacion");
    }


    return (
        <Container className='h-100 d-flex align-items-center justify-content-center'>
            <Row className='w-100 h-75  d-flex align-items-center justify-content-center'>
                <Col xs={12} sm={5} lg={4} className='h-100 d-none d-sm-flex'>
                    <div className='w-100 h-100 bg-secondary'></div>
                </Col>
                <Col xs={8} sm={7} lg={5}>
                    <h2>Registrarse</h2>
                    <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Nombre</Form.Label>
                                    <Form.Control
                                        name="firstName"
                                        type="text"
                                        className="form-control"
                                        {...register('firstName', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            }
                                        })}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <ErrorMessage><p>{errors.firstName.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Apellido</Form.Label>
                                    <Form.Control
                                        name="lastName"
                                        type="text"
                                        className="form-control"
                                        {...register('lastName', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            }
                                        })}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <ErrorMessage><p>{errors.lastName.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={6} >
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Tipo de documento</Form.Label>
                                    <SelectType
                                        name="id_type"
                                        variants={variantsDNI}
                                        nameForm="id_type"
                                        handleChange={(e) => handleChange(e)}
                                        {...register('id_type', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            }
                                        })}
                                    />
                                    {errors.id_type && <ErrorMessage><p>El campo es requerido</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={6} >
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Número de documento</Form.Label>
                                    <Form.Control
                                        name="id_number"
                                        type="text"
                                        className="form-control"
                                        {...register('id_number', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            },
                                        })}
                                        onChange={handleChange}
                                    />
                                    {errors.id_number && <ErrorMessage><p>{errors.id_number.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} >
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Fecha de Nacimiento</Form.Label>
                                    <DatePickerComponent
                                        name="date_of_birth"
                                        nameForm="date_of_birth"
                                        handleChange={(date) => handleChange(date)}
                                        maxDate={endDateDatePicker}
                                        {...register('date_of_birth', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            }
                                        })}
                                    />
                                    {errors.date_of_birth && <ErrorMessage><p>{errors.date_of_birth.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} >
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Género</Form.Label>
                                    <SelectType
                                        name="id_gender"
                                        variants={variantsGender}
                                        nameForm="id_gender"
                                        handleChange={(e) => handleChange(e)}
                                        {...register('id_gender', {
                                            required: {
                                                value: true,
                                                message: "El campo es requerido."
                                            },
                                        })}
                                    />
                                    {errors.id_gender && <ErrorMessage><p>{errors.id_gender.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} >
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Email</Form.Label>
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
                                        onChange={handleChange}
                                    />
                                    {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
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
                                        onChange={handleChange}
                                    />
                                    {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Confirmar contraseña</Form.Label>
                                    <Form.Control
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        {...register('confirmPassword', {
                                            validate: (value) => value === getValues("password") || 'Las contraseñas no coinsiden',
                                        })}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="dark" type="submit">
                            Rgistrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
