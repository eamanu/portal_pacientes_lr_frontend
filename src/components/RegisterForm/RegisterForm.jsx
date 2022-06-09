import { useState, useEffect, useCallback } from "react";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import useAuth from '../../hooks/useAuth';
import '../../styles/Transitions.scss';
import SearchAddress from "../SearchAddress";
import FormGroup from "./Forms/FormGroup";
import { LabelsFormData, ValuesRegisterForm } from "./Forms/FormData";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { error, successRegister } from "../SwalAlertData";
import { registerPersonAndUserService, registerPersonService, uploadIdentificationImagesService } from "../../services/registerServices";
import * as MdIcon from "react-icons/md";

export default function RegisterForm(formType) {

    const [loading, setLoading] = useState(false)
    const auth = useAuth();
    const user = auth.user ? auth.user : null
    const history = useHistory();
    // steps
    const [step, setStep] = useState(0)
    const next = (i) => { setStep(i + 1) }
    const back = (i) => { setStep(i - 1) }
    // useForm
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const type = formType.formType //Tipe of form "user" or "patient"
    const f = LabelsFormData //Information to build form fields
    const [values, setValues] = useState(ValuesRegisterForm); //Get and set values form
    const [newValue, setNewValue] = useState("") //Get and set values form to validate required fields
    const [search, setSearch] = useState(true) //Get addres by search or not
    // newPerson
    const [newPersonId, setNewPersonId] = useState(null)

    // set values 
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

    const handleChangeImage = (e) => {
        if (e.target.files) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target.files[0],
            }
            );
            setNewValue(targetName)
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
                return newValue
            })
        }
    }

    useEffect(() => {
        setValue('birthdate', values.birthdate);
        setValue('postal_address', values.address_street);
    }, [values.birthdate, values.address_street])

    useEffect(() => {
        if (newValue === 'file1' || newValue === 'file2') {
            setValue(`${newValue}`, values[newValue]);
        } else {
            setValue(`${newValue}`, values[newValue]);
        }
    }, [newValue, values[newValue]])

    const buildBody = () => {
        setLoading(true)
        let body = values
        delete body.confirmEmail
        delete body.confirmPassword
        delete body.postal_address
        delete body.file1 //note - is necesary, but not now
        delete body.file2 //note - is necesary, but not now
        const [month, day, year] = [body.birthdate.getMonth() + 1, body.birthdate.getDate(), body.birthdate.getFullYear()];
        let date = `${day}/${month}/${year}`
        body.birthdate = date
        body.id_identification_type = parseInt(body.id_identification_type)
        body.id_gender = parseInt(body.id_gender)
        body.id_usual_institution = parseInt(body.id_usual_institution)
        body.is_diabetic = body.is_diabetic === 'true' ? true : false
        body.is_hypertensive = body.is_hypertensive === 'true' ? true : false
        body.is_chronic_kidney_disease = body.is_chronic_kidney_disease === 'true' ? true : false
        body.is_chronic_respiratory_disease = body.is_chronic_respiratory_disease === 'true' ? true : false
        if (type === "user") {
            body.identification_number_master = body.identification_number
            body.id_identification_type_master = body.id_identification_type
            body.username = body.email
            sendRegisterNewUserForm(body);
        } else if (type === "patient") {
            delete body.username
            delete body.password
            body.identification_number_master = user.identification_number
            body.id_identification_type_master = user.id_identification_type
            body.address_street = user.address_street
            body.address_number = user.address_number
            body.locality = user.locality
            body.department = user.department
            body.phone_number = user.phone_number
            body.email = user.email
            sendRegisterNewPatientForm(body);
        }
    }

    const onSubmitImages = () => {
        setLoading(true)
        let images = new FormData();
        images.append('file1', values.file1, 'file1')
        images.append('file2', values.file2, 'file2')
        uploadIdentificationImages(newPersonId, images);
    }

    const onSubmit = (length, i) => {
        if (length === i + 1) { //last step 
            onSubmitImages()
        } else if (length - 1 === i + 1) {  //penultimate step 
            buildBody()
        } else {
            next(i)
        }
    }

    const sendRegisterNewUserForm = useCallback((body) => {
        registerPersonAndUserService(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            auth.newRegisterUser(body)
                            setNewPersonId(readeble.value)
                            setStep(4)
                            setLoading(false)
                        } else {
                            Swal.fire(error('Hubo un error al confirmar datos'))
                            throw new Error(text)
                        }
                    })
                } else {
                    Swal.fire(error('Hubo un error al confirmar datos'))
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('error', err)
                Swal.fire(error('Hubo un error al confirmar datos'))
                setLoading(false)
            })
    }, []);


    const sendRegisterNewPatientForm = useCallback((body) => {
        registerPersonService(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            setNewPersonId(readeble.value)
                            setStep(2)
                            setLoading(false)
                        } else {
                            Swal.fire(error('Hubo un error al confirmar datos'))
                            throw new Error(text)
                        }
                    })
                } else {
                    console.log('error', res.body)
                    Swal.fire(error('Hubo un error al confirmar datos'))
                }
            })
            .catch((err) => {
                console.log('error', err)
                Swal.fire(error('Hubo un error al confirmar datos'))
                setLoading(false)
            })
    }, []);

    const uploadIdentificationImages = useCallback(
        (id, body) => {
            uploadIdentificationImagesService(id, body)
                .then((res) => {
                    if (res && type === "user") {
                        if (res.ok) {
                            setLoading(false)
                            history.push("/verificacion")
                        } else {
                            Swal.fire(error('Ha ocurrido un error al enviar las imágenes'))
                        }
                    } else if (res && type === "patient") {
                        if (res.ok) {
                            Swal.fire(successRegister).then((result) => {
                                if (result.isConfirmed) {
                                    setLoading(false)
                                    history.push("/usuario/grupo-familiar");
                                }
                            })
                        } else {
                            Swal.fire(error('Ha ocurrido un error al enviar las imágenes'))
                        }
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Ha ocurrido un error al cargar las imágenes'))
                })
        },
        [],
    );

    const loginDataForm =
        <Row className={step === 0 ? "in" : "out"}>
            {step === 0 && type === 'user' &&
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
                    <Col xs={12} sm={7} >
                        <div className="my-tooltip">
                            <FormGroup inputType={f.password.inputType} label={f.password.label} name={f.password.form_name} value={values.password} type={f.password.type}
                                {...register(`${f.password.form_name}`, f.password.register)}
                                onChange={handleChange}
                            />
                            <span className="tiptext">
                                La contraseña debe tener al menos 6 dígitos.
                            </span>
                        </div>
                        {errors[f.password.form_name] && <ErrorMessage><p>{errors[f.password.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={7} >
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

    const personalDataForm =
        <Row className={step === 1 || step === 0 ? "in" : "out"}>
            {(step === 1 && type === 'user') || (step === 0 && type === 'patient') ?
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
                    <Col xs={12} sm={7}>
                        <FormGroup inputType={f.id_identification_type.inputType} label={f.id_identification_type.label} name={f.id_identification_type.form_name} selectValue={values.id_identification_type}
                            variants={f.id_identification_type.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_identification_type.form_name}`, f.id_identification_type.register)}
                        />
                        {errors[f.id_identification_type.form_name] && <ErrorMessage><p>{errors[f.id_identification_type.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={7}>
                        <FormGroup inputType={f.identification_number.inputType} label={f.identification_number.label} name={f.identification_number.form_name} value={values.identification_number}
                            {...register(`${f.identification_number.form_name}`, f.identification_number.register)}
                            onChange={handleChange}
                        />
                        {errors[f.identification_number.form_name] && <ErrorMessage><p>{errors[f.identification_number.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={7}>
                        <FormGroup inputType={f.birthdate.inputType} label={f.birthdate.label} name={f.birthdate.form_name}
                            maxDate={type === "user" ? f.birthdate.maxDate : new Date()}
                            {...register(`${f.birthdate.form_name}`, f.birthdate.register)}
                            handleChange={(e) => handleChange(e)}
                        />
                        {errors[f.birthdate.form_name] && <ErrorMessage><p>{errors[f.birthdate.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} sm={7}>
                        <FormGroup inputType={f.id_gender.inputType} label={f.id_gender.label} name={f.id_gender.form_name} selectValue={values.id_gender}
                            variants={f.id_gender.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_gender.form_name}`, f.id_gender.register)}
                        />
                        {errors[f.id_gender.form_name] && <ErrorMessage><p>{errors[f.id_gender.form_name].message}</p></ErrorMessage>}
                    </Col>
                </> : <></>
            }
        </Row>

    const geographicalDataForm =
        <Row className={step === 2 ? "in" : "out"}>
            {step === 2 && type === 'user' &&
                <>
                    <Col xs={12} sm={7}>
                        <Form.Group>
                            <Form.Label className="mb-0">Domicilio</Form.Label>
                            <div>
                                <input type="radio" id="searchCheck" name="search" className="form-check-input ms-3" value={true}
                                    checked={search ? true : false}
                                    onChange={() => setSearch(true)}
                                /> <label className="form-label" htmlFor="searchCheck">
                                    Buscar
                                </label>
                            </div>
                            <div>
                                <input type="radio" id="searchNoCheck" name="search" className="form-check-input ms-3" value={false}
                                    onChange={() => setSearch(false)}
                                /> <label className="form-label" htmlFor="searchNoCheck">
                                    Ingresar manualmente
                                </label>
                            </div>
                        </Form.Group>
                    </Col>
                    {search ?
                        <Col xs={12} sm={7} className='w-100'>
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
                            <Col xs={12} sm={7}>
                                <FormGroup inputType={f.locality.inputType} label={f.locality.label} name={f.locality.form_name} value={values.locality}
                                    {...register(`${f.locality.form_name}`, f.locality.register)}
                                    onChange={handleChange}
                                />
                                {errors[f.locality.form_name] && <ErrorMessage><p>{errors[f.locality.form_name].message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={7}>
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
                </>
            }
        </Row>

    const conditionDataForm =
        <Row className={step === 3 || step === 1 ? "in" : "out"}>
            {(step === 3 && type === 'user') || (step === 1 && type === 'patient') ?
                <>
                    <Col xs={12} >
                        <FormGroup inputType={f.id_usual_institution.inputType} label={f.id_usual_institution.label} name={f.id_usual_institution.form_name} selectValue={values.id_usual_institution}
                            variants={f.id_usual_institution.variants}
                            handleChange={(e) => handleChange(e)}
                            {...register(`${f.id_usual_institution.form_name}`, f.id_usual_institution.register)}
                        />
                        {errors[f.id_usual_institution.form_name] && <ErrorMessage><p>{errors[f.id_usual_institution.form_name].message}</p></ErrorMessage>}
                    </Col>
                    <Col xs={12} className="mt-3">
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

    const photoDataForm = <Row className={step === 4 || step === 2 ? "in" : "out"}>
        {(step === 4 && type === 'user') || (step === 2 && type === 'patient') ?
            <>
                <p>Para finalizar, ingresá foto de tu documento de identidad</p>
                <Col xs={12}>
                    {errors[f.file1.form_name] && <ErrorMessage><p>{errors[f.file1.form_name].message}</p></ErrorMessage>}
                    <FormGroup inputType={f.file1.inputType} label={f.file1.label} name={f.file1.form_name} value={values.file1}
                        {...register(`${f.file1.form_name}`, f.file1.register)}
                        onChange={handleChangeImage}
                    />
                    {errors[f.file2.form_name] && <ErrorMessage><p>{errors[f.file2.form_name].message}</p></ErrorMessage>}
                    <FormGroup inputType={f.file2.inputType} label={f.file2.label} name={f.file2.form_name} value={values.file2}
                        {...register(`${f.file2.form_name}`, f.file2.register)}
                        onChange={handleChangeImage}
                    />
                </Col>
            </> : <></>
        }
    </Row>

    const stepsForm = type === 'user'
        ? [
            { title: "Datos de usuario", component: loginDataForm },
            { title: "Datos personales", component: personalDataForm },
            { title: "Domicilio", component: geographicalDataForm },
            { title: "Salud", component: conditionDataForm },
            { title: "Documento de identidad", component: photoDataForm }
        ]
        : [
            { title: "Datos personales", component: personalDataForm },
            { title: "Salud", component: conditionDataForm },
            { title: "Documento de identidad", component: photoDataForm }
        ]

    return (
        < Row>
            {loading
                ? <Loader isActive={loading} />
                : <Col xs={12} md={6} className='order-2 order-md-1'>
                    {stepsForm.map((s, i) => {
                        return (
                            <div key={i}>
                                {step === i &&
                                    <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit(stepsForm.length, i))}>
                                        {s.component}
                                        <div className="d-flex w-100 justify-content-end align-items-center">
                                            <Button variant="danger" type="submit">{stepsForm.length + 1 > i ? 'Siguiente' : 'Registrar'}</Button>
                                        </div>
                                    </Form>
                                }
                            </div>
                        )
                    })
                    }
                </Col>
            }
            <Col xs={12} md={4} className='order-1 order-md-2 offset-md-1'>
                <div className="d-flex flex-row flex-md-column py-3">
                    {stepsForm.map((s, i) => {
                        return (
                            <div key={i} className={`${step < i ? 'step-inactive' : ''} d-flex align-items-center mb-3`}>
                                <div className={`circle-step  ${step > i ? 'bg-primary border-0' : ''}`}>{step > i ? <MdIcon.MdCheck className="text-ligth" /> : <span>{i + 1}</span>}</div>
                                <h5 className={`d-none d-md-block title-step ${step > i ? 'text-primary' : ''}`}>{s.title}</h5>
                            </div>
                        )
                    })}
                </div>
            </Col>
        </Row>
    )
}
