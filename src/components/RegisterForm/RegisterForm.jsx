import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import '../../styles/Transitions.scss';
import Swal from "sweetalert2";
import SearchAddress from "../SearchAddress";
import FormGroup from "./Forms/FormGroup";
import { LabelsFormData, ValuesRegisterForm } from "./Forms/FormData";
import { successRegister } from "../SwalAlertData";

export default function RegisterForm(formType) {

    const auth = useAuth();
    const history = useHistory()
    // steps
    const [step, setStep] = useState(1)
    const next = () => { setStep(step + 1) }
    const back = () => { setStep(step - 1) }
    // useForm
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const type = formType.formType //Tipe of form "user" or "patient"
    const f = LabelsFormData //Information to build form fields
    const [values, setValues] = useState(ValuesRegisterForm); //Get and set values form
    const [newValue, setNewValue] = useState("") //Get and set values form to required
    const [search, setSearch] = useState(true) //Get addres by search or not

    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName || "date_of_birth"]: e.target?.value,
            }
            );
            setNewValue(targetName)
        } else {
            setValues({
                ...values,
                ["date_of_birth"]: e,
            }
            );
        }
    }
    const getAddress = (obj) => {
        if (obj.address) {
            let data = ['domicilio_postal', 'numero_domicilio', 'calle', 'localidad', 'departamento']
            setValues({
                ...values,
                ['domicilio_postal']: obj.address.road + '' + obj.address.house_number,
                ['numero_domicilio']: obj.address.house_number,
                ['calle']: obj.address.road,
                ['localidad']: obj.address.town || obj.address.city,
                ['departamento']: obj.address.state_district || obj.address.suburb
            })
            data.map((item) => {
                setNewValue(item)
            })
        }
    }

    useEffect(() => {
        setValue('date_of_birth', values.date_of_birth);
    }, [values.date_of_birth, setValue])

    useEffect(() => {
        setValue(`${newValue}`, values[newValue]);
    }, [newValue, values[newValue]])

    const onSubmit = () => {
        if(type === "user") {
            auth.register(values);
            history.push("/verificacion");
        }
        auth.register(values)
        type === "user"
            ? history.push("/verificacion")
             : Swal.fire(successRegister).then((result) => {
            if (result.isConfirmed) {
                history.push("/usuario/grupo-familiar");
            }
        });
    }

    const personalDataForm =
        <Row className={`${step === 1 ? "in" : "out"} d-flex`}>
            {step === 1 &&
                <>
                    <Col xs={12}>
                        <FormGroup inputType={f.firstName.inputType} label={f.firstName.label} name={f.firstName.form_name} value={values.firstName}
                            {...register(`${f.firstName.form_name}`, f.firstName.register)}
                            onChange={handleChange}
                        />
                        {errors[f.firstName.form_name] && <ErrorMessage><p>{errors[f.firstName.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12}>
                        <FormGroup inputType={f.lastName.inputType} label={f.lastName.label} name={f.lastName.form_name} value={values.lastName}
                            {...register(`${f.lastName.form_name}`, f.lastName.register)}
                            onChange={handleChange}
                        />
                        {errors[f.lastName.form_name] && <ErrorMessage><p>{errors[f.lastName.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.id_type.inputType} label={f.id_type.label} name={f.id_type.form_name} selectValue={values.id_type}
                            variants={f.id_type.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_type.form_name}`, f.id_type.register)}
                        />
                        {errors[f.id_type.form_name] && <ErrorMessage><p>{errors[f.id_type.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.id_number.inputType} label={f.id_number.label} name={f.id_number.form_name} value={values.id_number}
                            {...register(`${f.id_number.form_name}`, f.id_number.register)}
                            onChange={handleChange}
                        />
                        {errors[f.id_number.form_name] && <ErrorMessage><p>{errors[f.id_number.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.date_of_birth.inputType} label={f.date_of_birth.label} name={f.date_of_birth.form_name} selectValue={values.date_of_birth}
                            maxDate={f.date_of_birth.maxDate}
                            {...register(`${f.date_of_birth.form_name}`, f.date_of_birth.register)}
                            handleChange={(e) => handleChange(e)}
                        />
                        {errors[f.date_of_birth.form_name] && <ErrorMessage><p>{errors[f.date_of_birth.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.id_gender.inputType} label={f.id_gender.label} name={f.id_gender.form_name} selectValue={values.id_gender}
                            variants={f.id_gender.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_gender.form_name}`, f.id_gender.register)}
                        />
                        {errors[f.id_gender.form_name] && <ErrorMessage><p>{errors[f.id_gender.form_name].message}</p></ErrorMessage>}
                    </Col>
                </>
            }
        </Row>

    const loginDataForm =
        <Row className={step === 2 ? "in" : "out"}>
            {step === 2 && type === 'user' &&
                <> <Col xs={12} >
                    <FormGroup inputType={f.email.inputType} label={f.email.label} name={f.email.form_name} value={values.email}
                        {...register(`${f.email.form_name}`, f.email.register)}
                        onChange={handleChange}
                    />
                    {errors[f.email.form_name] && <ErrorMessage><p>{errors[f.email.form_name].message}</p></ErrorMessage>}
                </Col>
                    <Col xs={12} >
                        <FormGroup inputType={f.confirmEmail.inputType} label={f.confirmEmail.label} name={f.confirmEmail.form_name} value={values.confirmEmail}
                            {...register(`${f.confirmEmail.form_name}`, {
                                required: f.confirmEmail.register.required,
                                pattern: f.confirmEmail.register.pattern,
                                validate: (value) => value === getValues("email") || 'Las direcciones de correo no coinciden'
                            })}
                            onChange={handleChange}
                        />
                        {errors[f.confirmEmail.form_name] && <ErrorMessage><p>{errors[f.confirmEmail.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6} >
                        <FormGroup inputType={f.password.inputType} label={f.password.label} name={f.password.form_name} value={values.password} type={f.password.type}
                            {...register(`${f.password.form_name}`, f.password.register)}
                            onChange={handleChange}
                        />
                        {errors[f.password.form_name] && <ErrorMessage><p>{errors[f.password.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6} >
                        <FormGroup inputType={f.confirmPassword.inputType} label={f.confirmPassword.label} name={f.confirmPassword.form_name} value={values.confirmPassword} type={f.confirmPassword.type}
                            {...register(`${f.confirmPassword.form_name}`, {
                                validate: (value) => value === getValues("password") || 'Las direcciones de correo no coinciden'
                            })}
                            onChange={handleChange}
                        />
                        {errors[f.confirmPassword.form_name] && <ErrorMessage><p>{errors[f.confirmPassword.form_name].message}</p></ErrorMessage>}
                    </Col>
                </>
            }
        </Row>

    const geographicalDataForm =
        <Row className={step === 3 ? "in" : "out"}>
            {step === 3 && type === 'user' &&
                <>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label className="mb-0">Domicilio</Form.Label>
                            <input type="radio" id="searchCheck" name="search" className="form-check-input ms-3" value={true}
                                checked={search ? true : false}
                                onChange={() => setSearch(true)}
                            /> <label className="form-label" htmlFor="searchCheck">
                                Buscar
                            </label>
                            <input type="radio" id="searchNoCheck" name="search" className="form-check-input ms-3" value={false}
                                onChange={() => setSearch(false)}
                            /> <label className="form-label" htmlFor="searchNoCheck">
                                Ingresar manualmente
                            </label>
                        </Form.Group>
                    </Col>
                    {search ?
                        <Col xs={12}>
                            <Form.Group className="mb-3" >
                                <SearchAddress
                                    nameForm="domicilio_postal"
                                    selectValue={values.domicilio_postal}
                                    className="form-control"
                                    handleChange={(e) => handleChange(e)}
                                    {...register('domicilio_postal', {
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        }
                                    })}
                                    getAddress={(e) => getAddress(e)}
                                />
                                {errors.domicilio_postal && <ErrorMessage><p>{errors.domicilio_postal.message}</p></ErrorMessage>}
                            </Form.Group>
                        </Col>
                        :
                        <>
                            <Col xs={12} sm={8}>
                                <FormGroup inputType={f.calle.inputType} label={f.calle.label} name={f.calle.form_name} value={values.calle}
                                    {...register(`${f.calle.form_name}`, f.calle.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.calle.form_name] && <ErrorMessage><p>{errors[f.calle.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup inputType={f.numero_domicilio.inputType} label={f.numero_domicilio.label} name={f.numero_domicilio.form_name} value={values.numero_domicilio}
                                    {...register(`${f.numero_domicilio.form_name}`, f.numero_domicilio.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.numero_domicilio.form_name] && <ErrorMessage><p>{errors[f.numero_domicilio.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={6}>
                                <FormGroup inputType={f.localidad.inputType} label={f.localidad.label} name={f.localidad.form_name} value={values.localidad}
                                    {...register(`${f.localidad.form_name}`, f.localidad.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.localidad.form_name] && <ErrorMessage><p>{errors[f.localidad.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={6}>
                                <FormGroup inputType={f.departamento.inputType} label={f.departamento.label} name={f.departamento.form_name} value={values.departamento}
                                    {...register(`${f.departamento.form_name}`, f.departamento.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.departamento.form_name] && <ErrorMessage><p>{errors[f.departamento.form_name].message}</p></ErrorMessage>}
                            </Col>
                        </>
                    }
                    <Col xs={12} >
                        <FormGroup inputType={f.establishment_of_care.inputType} label={f.establishment_of_care.label} name={f.establishment_of_care.form_name} selectValue={values.establishment_of_care}
                            variants={f.establishment_of_care.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.establishment_of_care.form_name}`, f.establishment_of_care.register)}
                        />
                        {errors[f.establishment_of_care.form_name] && <ErrorMessage><p>{errors[f.establishment_of_care.form_name].message}</p></ErrorMessage>}
                    </Col>
                </>
            }
        </Row>
        
    const conditionDataForm =
        <Row className={step === 4 || step === 2 ? "in" : "out"}>
            {step === 4 && type === 'user' || step === 2 && type === 'patient' ?
                <>
                    <Col xs={12}>
                        <Form.Label className="mb-0">¿Padecés alguna de las siguientes afecciones crónicas? (Opcional)</Form.Label>
                        <FormGroup inputType={f.diabetes.inputType} label={f.diabetes.label} name={f.diabetes.form_name} value={values.diabetes} type={f.diabetes.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.hipertension.inputType} label={f.hipertension.label} name={f.hipertension.form_name} value={values.hipertension} type={f.hipertension.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.enfermedad_respiratoria.inputType} label={f.enfermedad_respiratoria.label} name={f.enfermedad_respiratoria.form_name} value={values.enfermedad_respiratoria} type={f.enfermedad_respiratoria.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.enfermedad_renal.inputType} label={f.enfermedad_renal.label} name={f.enfermedad_renal.form_name} value={values.enfermedad_renal} type={f.enfermedad_renal.type}
                            onChange={handleChange}
                        />
                    </Col>
                </> : <></>
            }
        </Row>

    const photoDataForm =
        <Row className={step === 5 || step === 3 ? "in" : "out"}>
            {step === 5 && type === 'user' || step === 3 && type === 'patient' ?
                <>
                    <Col xs={12}>
                        {errors[f.photo_dni_front.form_name] && <ErrorMessage><p>{errors[f.photo_dni_front.form_name].message}</p></ErrorMessage>}
                        <FormGroup inputType={f.photo_dni_front.inputType} label={f.photo_dni_front.label} name={f.photo_dni_front.form_name} value={values.photo_dni_front}
                            {...register(`${f.photo_dni_front.form_name}`, f.photo_dni_front.register)}
                            onChange={handleChange}
                        />
                        {errors[f.photo_dni_back.form_name] && <ErrorMessage><p>{errors[f.photo_dni_back.form_name].message}</p></ErrorMessage>}
                        <FormGroup inputType={f.photo_dni_back.inputType} label={f.photo_dni_back.label} name={f.photo_dni_back.form_name} value={values.photo_dni_back}
                            {...register(`${f.photo_dni_back.form_name}`, f.photo_dni_back.register)}
                            onChange={handleChange}
                        />
                    </Col>
                </> : <></>
            }
        </Row>

    return (
        <>
            {/* First */}
            {step === 1 &&
                <>
                    <Form className="form-group form_register " onSubmit={handleSubmit(() => { next() })}>
                        {personalDataForm}
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <p className="text-danger d-inline m-0">{type === "user" ? '1 de 5...' : '1 de 3...'}</p>
                            <div>
                                <Button variant="danger" type="submit">Siguiente</Button>
                            </div>
                        </div>
                    </Form>
                </>
            }

            {/* Second */}
            {step === 2 &&
                <>
                    {type === "user" ?
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                            {loginDataForm}
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
                            {conditionDataForm}
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
            {step === 3 &&
                <>
                    {type === "user" ?
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                            {geographicalDataForm}
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
                            {photoDataForm}
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
            {
                step === 4 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(() => { next() })}>
                    {conditionDataForm}
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className="text-danger d-inline m-0">4 de 5...</p>
                        <div>
                            <button className="btn text-danger" type="button" onClick={() => { back() }}>Anterior</button>
                            <Button variant="danger" type="submit">Siguiente</Button>
                        </div>
                    </div>
                </Form>
            }
            {/* Five */}
            {
                step === 5 &&
                <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                    {photoDataForm}
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
