import { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import { Col, Row } from "react-bootstrap";
import { variantsGender } from '../../../../components/ComponentsData';
import institutionsServices from '../../../../services/institutionsServices';

function DatosPaciente() {

    const p = usePatient();
    const birthdate = p.patient.birthdate
    function calculateAge(birthdate) {
        var birthday_arr = birthdate.split("-");
        var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    const age = calculateAge(birthdate);
    const gender = variantsGender.find(v => v.id === p.patient.id_gender).name
    const [institution, setInstitution] = useState([]);
    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    return res
                })
                .then((res) => {
                    let find = res.find(i => i.id === p.patient.id_usual_institution) || 1
                    console.log(find.name)
                    setInstitution(find.name)
                })
                .catch((err) => { console.log(err) })
        },
        [institution],
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    return (
        <Row className='in'>
            <Col xs={12} className="mb-3">
                <hr />
                <h6 className='datos-paciente__title'>Datos personales</h6>
                <p className='datos-paciente__label'>Nombre y apellido:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.name} {p.patient.surname}
                    </span>
                </p>
                <p className='datos-paciente__label'>DNI:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.identification_number}
                    </span>
                </p>
                <p className='datos-paciente__label'>Fecha de nacimiento:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {birthdate}
                    </span>
                </p>
                <p className='datos-paciente__label'>EDAD:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {age}
                    </span>
                </p>
                <p className='datos-paciente__label'>genero:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {gender}
                    </span>
                </p>
            </Col>
            <Col xs={12} className="mb-3">
                <hr />
                <h6 className='datos-paciente__title'>Datos de contacto</h6>
                <p className='datos-paciente__label'>email de usuario:
                    <span className='ps-1 text-lowercase fw-normal'>
                        {p.patient.email}
                    </span>
                </p>
                <p className='datos-paciente__label'>teléfono de usuario:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.phone_number}
                    </span>
                </p>
                <p className='datos-paciente__label'>domicilio de usuario:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.address_street} {p.patient.address_number}, {p.patient.locality}, {p.patient.department}
                    </span>
                </p>
            </Col>
            <Col xs={12} className="mb-3">
                <hr />
                <h6 className='datos-paciente__title'>Datos de atención</h6>
                <p className='datos-paciente__label'>centro de atención:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {institution}
                    </span>
                </p>
                <p className='datos-paciente__label'>Afecciones crónicas:
                    {p.patient.is_diabetic &&
                        <span className='ps-1 text-uppercase fw-normal'>
                           Diabetes -
                        </span>
                    }
                    {p.patient.is_hypertensive &&
                        <span className='ps-1 text-uppercase fw-normal'>
                            Hipertensión -
                        </span>
                    }
                    {p.patient.is_chronic_kidney_disease &&
                        <span className='ps-1 text-uppercase fw-normal'>
                           Enfermedad renal -
                        </span>
                    }
                    {p.patient.is_chronic_respiratory_disease &&
                        <span className='ps-1 text-uppercase fw-normal'>
                            Enfermedad respiratoria -
                        </span>
                    }
                </p>
            </Col>
        </Row>
    )
}

export default DatosPaciente;
