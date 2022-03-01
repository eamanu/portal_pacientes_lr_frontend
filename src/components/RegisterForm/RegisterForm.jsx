import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { variantsDNI, variantsGender, endDate } from '../../components/ComponentsData';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectType from '../../components/SelectType';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import '../../styles/Transitions.scss'



export default function RegisterForm() {


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
        afeccion_cronica: "",
        afeccion_no_cronica: "",
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


    const onSubmit = () => {
        auth.register(values)
        history.push("/verificacion");
    }

    const [state, setState] = useState(1)
    const next = () => {
        setState(state + 1)
    }
    const back = () => {
        setState(state - 1)
    }

    return (

        <>
            {/* First */}
            {state === 1 &&
                <Form className="form-group form_register " onSubmit={handleSubmit(() => { next() })}>
                    <Row className={state === 1 ? "in" : "out"}  >
                        <Col xs={12}>
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
                        <Col xs={12}>
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
                        <Col xs={12} sm={6} >
                            <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">Tipo de documento</Form.Label>
                                <SelectType
                                    name="id_type"
                                    variants={variantsDNI}
                                    nameForm="id_type"
                                    selectValue={values.id_type}
                                    handleChange={(e) => handleChange(e)}
                                    {...register('id_type', {
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        },
                                        pattern: {
                                            value: /[0-9]/,
                                            message: "El campo es requerido."
                                        }
                                    })}
                                />
                                {errors.id_type && <ErrorMessage><p>El campo es requerido</p></ErrorMessage>}
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} >
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
                                    autocomplete="off"
                                    selectValue={values.date_of_birth}
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
                                    selectValue={values.id_gender}
                                    handleChange={(e) => handleChange(e)}
                                    {...register('id_gender', {
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        },
                                        pattern: {
                                            value: /[0-9]/,
                                            message: "El campo es requerido."
                                        }
                                    })}
                                />
                                {errors.id_gender && <ErrorMessage><p>{errors.id_gender.message}</p></ErrorMessage>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">1 de 4...</p>
                        <div>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>
                </Form>
            }
            {/* Second */}

            {state === 2 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                    <Row className={state === 2 ? "in" : "out"}>
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
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">2 de 4...</p>
                        <div>
                            <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>

                </Form>
            }

            {/* Third */}
            {
                state === 3 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                    <Row className={state === 3 ? "in" : "out"}>
                        <Col xs={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">¿Padece alguna afección o enfermedad crónica? (Opcional)</Form.Label>
                                <br />
                                <input
                                    type="radio"
                                    name="afeccion_cronica"
                                    className="form-check-input"
                                    value="si"
                                    // {...register('afeccion_cronica', {
                                    //     required: {
                                    //         value: true,
                                    //         message: "El campo es requerido."
                                    //     }  
                                    // })}
                                    onChange={handleChange}
                                /> Sí
                                <br />
                                <input
                                    type="radio"
                                    name="afeccion_cronica"
                                    className="form-check-input"
                                    value="no"
                                    // {...register('afeccion_cronica', {
                                    //     required: {
                                    //         value: true,
                                    //         message: "El campo es requerido."
                                    //     }  
                                    // })}
                                    onChange={handleChange}
                                /> No
                                {errors.affecion_cronica && <ErrorMessage><p>{errors.affecion_cronica.message}</p></ErrorMessage>}
                            </Form.Group>
                            {values.afeccion_cronica === "si" &&
                                <div className={state === 3 ? "in" : "out"}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label>Afección crónica</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Seleccionar...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Label>¿Desde cuándo padece esta afección?</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Seleccionar...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Label>¿Se encuentra actualmente realizando trtamiento médico?</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Seleccionar...</option>
                                            <option value="1">Si</option>
                                            <option value="2">No</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                        </Col>
                    </Row>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">3 de 4...</p>
                        <div>
                            <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>
                </Form>
            }
            {/* Four */}
            {
                state === 4 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                   <Row className={state === 4 ? "in" : "out"}>
                        <Col xs={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">¿Padece, actualmente, alguna afección o enfermedad NO crónica? (Opcional)</Form.Label>
                                <br />
                                <input
                                    type="radio"
                                    name="afeccion_no_cronica"
                                    className="form-check-input"
                                    value="si"
                                    // {...register('afeccion_no_cronica', {
                                    //     required: {
                                    //         value: true,
                                    //         message: "El campo es requerido."
                                    //     }  
                                    // })}
                                    onChange={handleChange}
                                /> Sí
                                <br />
                                <input
                                    type="radio"
                                    name="afeccion_no_cronica"
                                    className="form-check-input"
                                    value="no"
                                    // {...register('afeccion_no_cronica', {
                                    //     required: {
                                    //         value: true,
                                    //         message: "El campo es requerido."
                                    //     }  
                                    // })}
                                    onChange={handleChange}
                                /> No
                                {errors.affecion_cronica && <ErrorMessage><p>{errors.affecion_cronica.message}</p></ErrorMessage>}
                            </Form.Group>
                            {values.afeccion_no_cronica === "si" &&
                                <div className={state === 4 ? "in" : "out"}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label>Afección NO crónica</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Seleccionar...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Label>¿Se encuentra realizando trtamiento médico?</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Seleccionar...</option>
                                            <option value="1">Si</option>
                                            <option value="2">No</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                        </Col>
                    </Row>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">4 de 4...</p>
                        <div>
                            <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                            <Button variant="danger" type="submit">Registrarse</Button>
                        </div>
                    </div>
                </Form>
            }
        </>
    )
}
