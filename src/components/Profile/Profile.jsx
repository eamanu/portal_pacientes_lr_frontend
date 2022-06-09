import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import FormGroup from '../RegisterForm/Forms/FormGroup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import usePatient from '../../hooks/usePatient';
import { updatePerson } from '../../services/personServices';
import Loader from '../Loader/Loader';
import { LabelsFormData } from '../RegisterForm/Forms/FormData';
import { error, success, confirm } from '../SwalAlertData';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

function Profile({ show, handleClose, type }) {

    const [loading, setLoading] = useState(true)
    const f = LabelsFormData //Information to build form fields
    const auth = useAuth();
    const p = usePatient();
    const data = type === 'user' ? auth.user : p.patient
    //button
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [values, setValues] = useState(data)
    const [newValue, setNewValue] = useState("") //Get and set values form to required
    //set form with data
    const setForm = () => {
        if (show) {
            Object.entries(data).forEach(([key, value], i) => {
                setValue(`${key}`, value);
            })
        }
    }
    useEffect(() => {
        setForm();
        setLoading(false);
    }, [show, setForm])

    // set new values 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            }
            );
            setNewValue(targetName)
        }
    }
    useEffect(() => {
        setValue(`${newValue}`, values[newValue]);
    }, [newValue, values])

    const onSubmit = () => {
        setLoading(true)
        let body = values
        delete body.confirmEmail
        delete body.confirmPassword
        delete body.postal_address
        delete body.family_group
        delete body.photo_dni_front //note - is necesary, but not now
        delete body.photo_dni_back //note - is necesary, but not now
        delete body.username
        delete body.password
        body.is_diabetic = body.is_diabetic.toString() == 'true' ? true : false
        body.is_hypertensive = body.is_hypertensive.toString() == 'true' ? true : false
        body.is_chronic_kidney_disease = body.is_chronic_kidney_disease.toString() == 'true' ? true : false
        body.is_chronic_respiratory_disease = body.is_chronic_respiratory_disease.toString() == 'true' ? true : false
        let setDate = values.birthdate.split('-')
        body.birthdate = `${setDate[2].split('T')[0]}/${setDate[1]}/${setDate[0]}`
        Swal.fire(confirm(`¿Desea actualizar los datos de ${type === 'user' ? 'usuario' : 'paciente'}`)).then((result) => {
            if (result.isConfirmed) {
                sendUpdatePersonForm(body)
            }
        })
    }

    const sendUpdatePersonForm = useCallback(
        (body) => {
            updatePerson(body)
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                Swal.fire(confirm('El usuario ha sido actualizado. Verás los cambios cuando vuelvas a iniciar sesión.', true))
                                setLoading(false)
                                handleClose()
                            } else {
                                Swal.fire(error('Error al actualizar datos de usuario'))
                                setLoading(false)
                                throw new Error(text)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Error al actualizar datos de usuario'))
                    setLoading(false)
                    handleClose()
                })
        },
        [],
    )


    const personalDataForm =
        <Row className='in d-flex'>
            <Col xs={12}>
                <FormGroup inputType={f.name.inputType} label={f.name.label} name={f.name.form_name} value={values.name} disabled />
            </Col>
            <Col xs={12}>
                <FormGroup inputType={f.surname.inputType} label={f.surname.label} name={f.surname.form_name} value={values.surname} disabled />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup inputType={f.id_identification_type.inputType} label={f.id_identification_type.label} name={f.id_identification_type.form_name} selectValue={values.id_identification_type}
                    variants={f.id_identification_type.variants} disabled />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup inputType={f.identification_number.inputType} label={f.identification_number.label} name={f.identification_number.form_name} value={values.identification_number} disabled />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup inputType={f.name.inputType} label={f.birthdate.label} name={f.birthdate.form_name} value={values.birthdate} disabled />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup inputType={f.id_gender.inputType} label={f.id_gender.label} name={f.id_gender.form_name} selectValue={values.id_gender}
                    variants={f.id_gender.variants} disabled
                />
            </Col>
        </Row>

    const contactDataForm =
        <Row className="in">
            <Col xs={12} >
                <FormGroup inputType={f.email.inputType} label={f.email.label} name={f.email.form_name} value={values.email} disabled />
            </Col>
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
            <Col xs={12} >
                <FormGroup inputType={f.phone_number.inputType} label={f.phone_number.label} name={f.phone_number.form_name} value={values.phone_number}
                    {...register(`${f.phone_number.form_name}`, f.phone_number.register)}
                    onChange={handleChange}
                />
                {errors[f.phone_number.form_name] && <ErrorMessage><p>{errors[f.phone_number.form_name].message}</p></ErrorMessage>}
            </Col>
        </Row>

    const conditionDataForm =
        <Row className="in">
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
        </Row>

    return (

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
            <Modal.Body>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                            <h5>Datos personales</h5>
                            {personalDataForm}
                            <hr />
                            <h5>Datos de contacto</h5>
                            {contactDataForm}
                            <hr />
                            {type === 'patient' &&
                                <>
                                    <h5>Datos de historia clínica</h5>
                                    {conditionDataForm}
                                </>
                            }
                            <div className='d-flex justify-content-end'>
                                <Button variant='outline-secondary' className="me-2" onClick={() => handleClose()}>Cancelar</Button>
                                <Button variant='primary' type="submit" >Guardar cambios</Button>
                            </div>
                        </Form>
                    </Container>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default Profile;
