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
                [targetName]: e.target?.value,
            }
            );
            setNewValue(targetName)
        } else if (e) {
            setValues({
                ...values,
                ["birthdate"]: e,
            }
            );
        }
    }
    const getAddress = (obj) => {
        if (obj.address) {
            let data = ['postal_address', 'address_number', 'address_street', 'locality', 'department']
            setValues({
                ...values,
                ['postal_address']: obj.address.road + '' + obj.address.house_number,
                ['address_number']: obj.address.house_number,
                ['address_street']: obj.address.road,
                ['locality']: obj.address.town || obj.address.city,
                ['department']: obj.address.state_district || obj.address.suburb
            })
            data.map((item) => {
                setNewValue(item)
            })
        }
    }

    useEffect(() => {
        setValue('birthdate', values.birthdate);
        setValue('postal_address', values.address_street);
        // console.log('values.birthdate', values.birthdate)
    }, [values.birthdate, values.address_street])

    useEffect(() => {
        setValue(`${newValue}`, values[newValue]);
    }, [newValue, values[newValue]])

    const onSubmit = () => {
        let body = values
        delete body.confirmEmail
        delete body.confirmPassword
        delete body.postal_address
        delete body.photo_dni_front
        delete body.photo_dni_back
        const [month, day, year] = [body.birthdate.getMonth() + 1, body.birthdate.getDate(), body.birthdate.getFullYear()];
        let date = `${day}/${month}/${year}`
        body.birthdate = date
        body.is_diabetic = body.is_diabetic === 'true' ? true : false
        body.is_hypertensive = body.is_hypertensive === 'true' ? true : false
        body.is_chronic_kidney_disease = body.is_chronic_kidney_disease === 'true' ? true : false
        body.is_chronic_respiratory_disease = body.is_chronic_respiratory_disease === 'true' ? true : false
        body.id_department = 1 //hardcode
        body.id_locality = 1 //hardcode
        body.id_identification_type = parseInt(body.id_identification_type)
        body.id_gender = parseInt(body.id_gender)
        body.id_usual_institution = parseInt(body.id_usual_institution)
        body.identification_number_master = body.identification_number // note - should be a string
        body.username = body.email
        console.log('body form', body)
        if (type === "user") {
            auth.register(body);
            history.push("/verificacion");
        }
        // auth.register(values)
        // type === "user"
        //     ? history.push("/verificacion")
        //      : Swal.fire(successRegister).then((result) => {
        //     if (result.isConfirmed) {
        //         history.push("/usuario/grupo-familiar");
        //     }
        // });
    }

    // const body1 = {
    //     address_number: "63",
    //     address_street: "José Bonifacio",
    //     birthdate: "5/4/2008",
    //     department: "Comuna 6",
    //     email: "personprueba3@mail.com",
    //     id_department: 1,
    //     id_gender: 1,
    //     id_identification_type: 1,
    //     id_locality: 1,
    //     id_usual_institution: 1,
    //     identification_number: "1234567",
    //     identification_number_master: "1234567",
    //     is_chronic_kidney_disease: false,
    //     is_chronic_respiratory_disease: false,
    //     is_diabetic: false,
    //     is_hypertensive: false,
    //     locality: "Buenos Aires",
    //     name: "person prueba3",
    //     password: "123",
    //     phone_number: "1122334455",
    //     surname: "person prueba3",
    //     username: "personprueba3@mail.com",
    //     id_person: null,
    //     id_patient: null,
    //     id_admin_status: null,
    //     id_user_status: null,
    //     is_deleted: false,
    // }


    // useEffect(() => {
    //       auth.register(body1);
    // }, [])
    

    const personalDataForm =
        <Row className={`${step === 1 ? "in" : "out"} d-flex`}>
            {step === 1 &&
                <>
                    <Col xs={12}>
                        <FormGroup inputType={f.name.inputType} label={f.name.label} name={f.name.form_name} value={values.name}
                            {...register(`${f.name.form_name}`, f.name.register)}
                            onChange={handleChange}
                        />
                        {errors[f.name.form_name] && <ErrorMessage><p>{errors[f.name.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12}>
                        <FormGroup inputType={f.surname.inputType} label={f.surname.label} name={f.surname.form_name} value={values.surname}
                            {...register(`${f.surname.form_name}`, f.surname.register)}
                            onChange={handleChange}
                        />
                        {errors[f.surname.form_name] && <ErrorMessage><p>{errors[f.surname.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.id_identification_type.inputType} label={f.id_identification_type.label} name={f.id_identification_type.form_name} selectValue={values.id_identification_type}
                            variants={f.id_identification_type.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_identification_type.form_name}`, f.id_identification_type.register)}
                        />
                        {errors[f.id_identification_type.form_name] && <ErrorMessage><p>{errors[f.id_identification_type.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.identification_number.inputType} label={f.identification_number.label} name={f.identification_number.form_name} value={values.identification_number}
                            {...register(`${f.identification_number.form_name}`, f.identification_number.register)}
                            onChange={handleChange}
                        />
                        {errors[f.identification_number.form_name] && <ErrorMessage><p>{errors[f.identification_number.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup inputType={f.birthdate.inputType} label={f.birthdate.label} name={f.birthdate.form_name} selectValue={values.birthdate}
                            maxDate={f.birthdate.maxDate}
                            {...register(`${f.birthdate.form_name}`, f.birthdate.register)}
                            handleChange={(e) => handleChange(e)}
                        />
                        {errors[f.birthdate.form_name] && <ErrorMessage><p>{errors[f.birthdate.form_name].message}</p></ErrorMessage>}
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
                                    nameForm="postal_address"
                                    selectValue={values.postal_address}
                                    className="form-control"
                                    handleChange={(e) => handleChange(e)}
                                    {...register('postal_address', {
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        }
                                    })}
                                    getAddress={(e) => getAddress(e)}
                                />
                                {errors.postal_address && <ErrorMessage><p>{errors.postal_address.message}</p></ErrorMessage>}
                            </Form.Group>
                        </Col>
                        :
                        <>
                            <Col xs={12} sm={8}>
                                <FormGroup inputType={f.address_street.inputType} label={f.address_street.label} name={f.address_street.form_name} value={values.address_street}
                                    {...register(`${f.address_street.form_name}`, f.address_street.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.address_street.form_name] && <ErrorMessage><p>{errors[f.address_street.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup inputType={f.address_number.inputType} label={f.address_number.label} name={f.address_number.form_name} value={values.address_number}
                                    {...register(`${f.address_number.form_name}`, f.address_number.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.address_number.form_name] && <ErrorMessage><p>{errors[f.address_number.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={6}>
                                <FormGroup inputType={f.locality.inputType} label={f.locality.label} name={f.locality.form_name} value={values.locality}
                                    {...register(`${f.locality.form_name}`, f.locality.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.locality.form_name] && <ErrorMessage><p>{errors[f.locality.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={6}>
                                <FormGroup inputType={f.department.inputType} label={f.department.label} name={f.department.form_name} value={values.department}
                                    {...register(`${f.department.form_name}`, f.department.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.department.form_name] && <ErrorMessage><p>{errors[f.department.form_name].message}</p></ErrorMessage>}
                            </Col>
                        </>
                    }
                    <Col xs={12} >
                        <FormGroup inputType={f.phone_number.inputType} label={f.phone_number.label} name={f.phone_number.form_name} value={values.phone_number}
                            {...register(`${f.phone_number.form_name}`, f.phone_number.register)}
                            onChange={handleChange}
                        />
                        {errors[f.phone_number.form_name] && <ErrorMessage><p>{errors[f.phone_number.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} >
                        <FormGroup inputType={f.id_usual_institution.inputType} label={f.id_usual_institution.label} name={f.id_usual_institution.form_name} selectValue={values.id_usual_institution}
                            variants={f.id_usual_institution.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_usual_institution.form_name}`, f.id_usual_institution.register)}
                        />
                        {errors[f.id_usual_institution.form_name] && <ErrorMessage><p>{errors[f.id_usual_institution.form_name].message}</p></ErrorMessage>}
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
                        <FormGroup inputType={f.is_diabetic.inputType} label={f.is_diabetic.label} name={f.is_diabetic.form_name} value={values.is_diabetic} type={f.is_diabetic.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.is_hypertensive.inputType} label={f.is_hypertensive.label} name={f.is_hypertensive.form_name} value={values.is_hypertensive} type={f.is_hypertensive.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.is_chronic_respiratory_disease.inputType} label={f.is_chronic_respiratory_disease.label} name={f.is_chronic_respiratory_disease.form_name} value={values.is_chronic_respiratory_disease} type={f.is_chronic_respiratory_disease.type}
                            onChange={handleChange}
                        />
                        <FormGroup inputType={f.is_chronic_kidney_disease.inputType} label={f.is_chronic_kidney_disease.label} name={f.is_chronic_kidney_disease.form_name} value={values.is_chronic_kidney_disease} type={f.is_chronic_kidney_disease.type}
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
                                    <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
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
                                    <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
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
                                    <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
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
                                    <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
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
                            <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
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
                            <button className="btn text-danger" type="button" onClick={handleSubmit(() => { back() })}>Anterior</button>
                            <Button variant="danger" type="submit">Registrarse</Button>
                        </div>
                    </div>
                </Form>
            }
        </>
    )
}
