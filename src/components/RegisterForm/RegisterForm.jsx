import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { variantsDNI, variantsGender, endDate } from '../../components/ComponentsData';
import DatePickerComponent from '../../components/DatePickerComponent';
import SelectType from '../../components/SelectType';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import '../../styles/Transitions.scss';
import Swal from "sweetalert2";

export default function RegisterForm(formularioUsuario) {

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const endDateDatePicker = endDate()
    const history = useHistory()
    const auth = useAuth();

    const registroUsuario = formularioUsuario.formularioUsuario

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        id_type: "",
        id_number: "",
        date_of_birth: "",
        id_gender: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        calle: "",
        numero_domicilio: "",
        localida: "",
        departamento: "",
        establecimiento: "",
        diabetes: null,
        hipertension: null,
        enfermedad_respiratoria: null,
        enfermedad_renal: null
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target?.name || "date_of_birth"]: e.target?.value || e,
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
        console.log(values)
        registroUsuario
            ? history.push("/verificacion")
            : Swal.fire({
                title: "Registro realizado",
                html: 'El paciente será verificado antes de ser agregado como miembro al grupo familiar. ',
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Continuar",
                confirmButtonColor: "#Dc3545",
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push("/usuario/grupo-familiar");
                }
            });

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
                                <Form.Label className="mb-0">Nombres</Form.Label>
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
                                <Form.Label className="mb-0">Apellidos</Form.Label>
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
                                <Form.Label className="mb-0">Fecha de nacimiento</Form.Label>
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
                                <Form.Label className="mb-0">Sexo (según figura en DNI)</Form.Label>
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
                        <p className="text-danger d-inline m-0">{registroUsuario ? '1 de 5...' : '1 de 3...'}</p>
                        <div>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>
                </Form>
            }
            {/* Second */}

            {state === 2 &&
                <>
                    {registroUsuario ?
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
                                <Col xs={12} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Confirmar email</Form.Label>
                                        <Form.Control
                                            name="confirmEmail"
                                            type="text"
                                            className="form-control"
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                return false
                                            }
                                            }
                                            {...register('confirmEmail', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                pattern: {
                                                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                                    message: "El formato ingresado no es válido"
                                                },
                                                validate: (value) => value === getValues("confirmEmail") || 'Las direcciones de correo no coinciden'
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmEmail && <ErrorMessage><p>{errors.confirmEmail.message}</p></ErrorMessage>}
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
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                return false
                                            }
                                            }
                                            {...register('confirmPassword', {
                                                validate: (value) => value === getValues("password") || 'Las contraseñas no coinsiden'
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className="text-danger d-inline m-0">2 de 5...</p>
                                <div>
                                    <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                                    <Button variant="danger" type="submit">Siguiente</Button>
                                </div>
                            </div>
                        </Form>
                        :
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                            <Row className={state === 2 ? "in" : "out"}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">¿Padecés alguna de las siguientes afecciones? (Opcional)</Form.Label>
                                        <div>
                                            <Form.Group className='mb-4'>
                                                <Form.Label className="mb-0">Diabetes:</Form.Label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="diabetesSiCheck"
                                                    name="diabetes"
                                                    className="form-check-input"
                                                    value={true}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="diabetesSiCheck">
                                                    Sí
                                                </label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="diabetesNoCheck"
                                                    name="diabetes"
                                                    className="form-check-input"
                                                    value={false}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="diabetesNoCheck">
                                                    No
                                                </label>
                                                <br />
                                                <Form.Label className="mb-0">Hipertensión:</Form.Label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="hipertensionSiCheck"
                                                    name="hipertension"
                                                    className="form-check-input"
                                                    value={true}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="hipertensionSiCheck">
                                                    Sí
                                                </label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="hipertensionNoCheck"
                                                    name="hipertension"
                                                    className="form-check-input"
                                                    value={false}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="hipertensionNoCheck">
                                                    No
                                                </label>
                                                <br />
                                                <Form.Label className="mb-0">Enfermedad respiratoria crónica:</Form.Label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="enfermedad_respiratoriaSiCheck"
                                                    name="enfermedad_respiratoria"
                                                    className="form-check-input"
                                                    value={true}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="enfermedad_respiratoriaSiCheck">
                                                    Sí
                                                </label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="enfermedad_respiratoriaNoCheck"
                                                    name="enfermedad_respiratoria"
                                                    className="form-check-input"
                                                    value={false}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="enfermedad_respiratoriaNoCheck">
                                                    No
                                                </label>
                                                <br />
                                                <Form.Label className="mb-0">Enfermedad renal crónica:</Form.Label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="enfermedad_renalSiCheck"
                                                    name="enfermedad_renal"
                                                    className="form-check-input"
                                                    value={true}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="enfermedad_renalSiCheck">
                                                    Sí
                                                </label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="enfermedad_renalNoCheck"
                                                    name="enfermedad_renal"
                                                    className="form-check-input"
                                                    value={false}
                                                    onChange={handleChange}
                                                /> <label className="form-check-label" htmlFor="enfermedad_renalNoCheck">
                                                    No
                                                </label>
                                            </Form.Group>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className="text-danger d-inline m-0">2 de 3...</p>
                                <div>
                                    <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                                    <Button variant="danger" type="submit">Siguiente</Button>
                                </div>
                            </div>
                        </Form>
                    }
                </>

            }

            {/* Third */}
            {state === 3 &&
                <>
                    {registroUsuario ?
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                            <Row className={state === 3 ? "in" : "out"}>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="mb-0">Calle de domicilio</Form.Label>
                                        <Form.Control
                                            name="calle"
                                            type="text"
                                            className="form-control"
                                            {...register('calle', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.calle && <ErrorMessage><p>{errors.calle.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-0">Número de domicilio</Form.Label>
                                        <Form.Control
                                            name="numero_domicilio"
                                            type="text"
                                            className="form-control"
                                            {...register('numero_domicilio', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.numero_domicilio && <ErrorMessage><p>{errors.numero_domicilio.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-0">Localidad</Form.Label>
                                        <Form.Control
                                            name="localidad"
                                            type="text"
                                            className="form-control"
                                            {...register('localidad', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.localidad && <ErrorMessage><p>{errors.localidad.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-0">Departamento</Form.Label>
                                        <Form.Control
                                            name="departamento"
                                            type="text"
                                            className="form-control"
                                            {...register('departamento', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.departamento && <ErrorMessage><p>{errors.departamento.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-0">Establecimiento de atención habitual</Form.Label>
                                        <Form.Control
                                            name="establecimiento"
                                            type="text"
                                            className="form-control"
                                            {...register('establecimiento', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                }
                                            })}
                                            onChange={handleChange}
                                        />
                                        {errors.establecimiento && <ErrorMessage><p>{errors.establecimiento.message}</p></ErrorMessage>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className="text-danger d-inline m-0">3 de 5...</p>
                                <div>
                                    <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                                    <Button variant="danger" type="submit">Siguiente</Button>
                                </div>
                            </div>
                        </Form>
                        :
                        <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                            <Row className={state === 3 ? "in" : "out"}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" >
                                        <label htmlFor="formFile" className="form-label">Foto de DNI - FRENTE:</label>
                                        <input className="form-control border mb-3" type="file" id="formFile" />
                                        <br />
                                        <label htmlFor="formFile" className="form-label">Foto de DNI - DORSO:</label>
                                        <input className="form-control border mb-3" type="file" id="formFile" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className="text-danger d-inline m-0">3 de 3...</p>
                                <div>
                                    <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                                    <Button variant="danger" type="submit">Registrar</Button>
                                </div>
                            </div>
                        </Form>
                    }
                </>

            }
            {/* Four */}
            {state === 4 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                    <Row className={state === 4 ? "in" : "out"}>
                        <Col xs={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">¿Padecés alguna de las siguientes afecciones? (Opcional)</Form.Label>
                                <div>
                                    <Form.Group className='mb-4'>
                                        <Form.Label className="mb-0">Diabetes:</Form.Label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="diabetesSiCheck"
                                            name="diabetes"
                                            className="form-check-input"
                                            value={true}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="diabetesSiCheck">
                                            Sí
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="diabetesNoCheck"
                                            name="diabetes"
                                            className="form-check-input"
                                            value={false}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="diabetesNoCheck">
                                            No
                                        </label>
                                        <br />
                                        <Form.Label className="mb-0">Hipertensión:</Form.Label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="hipertensionSiCheck"
                                            name="hipertension"
                                            className="form-check-input"
                                            value={true}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="hipertensionSiCheck">
                                            Sí
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="hipertensionNoCheck"
                                            name="hipertension"
                                            className="form-check-input"
                                            value={false}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="hipertensionNoCheck">
                                            No
                                        </label>
                                        <br />
                                        <Form.Label className="mb-0">Enfermedad respiratoria crónica:</Form.Label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="enfermedad_respiratoriaSiCheck"
                                            name="enfermedad_respiratoria"
                                            className="form-check-input"
                                            value={true}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="enfermedad_respiratoriaSiCheck">
                                            Sí
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="enfermedad_respiratoriaNoCheck"
                                            name="enfermedad_respiratoria"
                                            className="form-check-input"
                                            value={false}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="enfermedad_respiratoriaNoCheck">
                                            No
                                        </label>
                                        <br />
                                        <Form.Label className="mb-0">Enfermedad renal crónica:</Form.Label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="enfermedad_renalSiCheck"
                                            name="enfermedad_renal"
                                            className="form-check-input"
                                            value={true}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="enfermedad_renalSiCheck">
                                            Sí
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="enfermedad_renalNoCheck"
                                            name="enfermedad_renal"
                                            className="form-check-input"
                                            value={false}
                                            onChange={handleChange}
                                        /> <label className="form-check-label" htmlFor="enfermedad_renalNoCheck">
                                            No
                                        </label>
                                    </Form.Group>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">4 de 5...</p>
                        <div>
                            <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>
                </Form>
            }
            {/* Four */}
            {state === 5 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                    <Row className={state === 5 ? "in" : "out"}>
                        <Col xs={12}>
                            <Form.Group className="mb-3" >
                                <label htmlFor="formFile" className="form-label">Foto de DNI - FRENTE:</label>
                                <input className="form-control border mb-3" type="file" id="formFile" />
                                <br />
                                <label htmlFor="formFile" className="form-label">Foto de DNI - DORSO:</label>
                                <input className="form-control border mb-3" type="file" id="formFile" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">5 de 5...</p>
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
