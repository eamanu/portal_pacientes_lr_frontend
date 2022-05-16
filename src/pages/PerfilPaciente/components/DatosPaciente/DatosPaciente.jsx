import { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import { Col, Row } from "react-bootstrap";
import { variantsGender } from '../../../../components/ComponentsData';
import institutionsServices from '../../../../services/institutionsServices';

function DatosPaciente() {

    const p = usePatient();
    const birthdateY = p.patient.birthdate.split('-')[0]
    const birthdateM = p.patient.birthdate.split('-')[1]
    const birthdateD = p.patient.birthdate.split('-')[2].split('T')[0]
    const birthdate = birthdateD + '/' + birthdateM + '/' + birthdateY
    function calculateAge(birthdate) {
        let today = new Date();
        let b = new Date(birthdate);
        let age = today.getFullYear() - b.getFullYear();
        let m = today.getMonth() - b.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < b.getDate())) {
            age--;
        }
        return age;
    }
    const age = calculateAge(p.patient.birthdate);
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
                    // console.log(find.name)
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
                        {p.patient.name || ' - '} {p.patient.surname || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>DNI:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.identification_number || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>Fecha de nacimiento:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {birthdate || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>EDAD:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {age || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>genero:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {gender || ' - '}
                    </span>
                </p>
            </Col>
            <Col xs={12} className="mb-3">
                <hr />
                <h6 className='datos-paciente__title'>Datos de contacto</h6>
                <p className='datos-paciente__label'>email de usuario:
                    <span className='ps-1 text-lowercase fw-normal'>
                        {p.patient.email || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>teléfono de usuario:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.phone_number || ' - '}
                    </span>
                </p>
                <p className='datos-paciente__label'>domicilio de usuario:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {p.patient.address_street || ' - '} {p.patient.address_number || ' - '}, {p.patient.locality || ' - '}, {p.patient.department || ' - '}
                    </span>
                </p>
            </Col>
            <Col xs={12} className="mb-3">
                <hr />
                <h6 className='datos-paciente__title'>Datos de atención</h6>
                <p className='datos-paciente__label'>centro de atención:
                    <span className='ps-1 text-uppercase fw-normal'>
                        {institution || ' - '}
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
