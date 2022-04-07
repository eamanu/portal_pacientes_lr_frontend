import usePatient from '../../../../hooks/usePatient';
import { Col, Row } from "react-bootstrap";

function DatosPaciente() {

    const p = usePatient();

    return (
        <Row className='in'>
            <h6 className='mt-3 fw-bold'>Datos personales</h6>
            <Col className=''>
                <p className='datos-paciente__label'>Nombre y apellido: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.nombre} {p.patient.apellido}
                    </span>
                </p>
                <p className='datos-paciente__label'>DNI: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.dni}
                    </span>
                </p>
                <p className='datos-paciente__label'>EDAD: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.edad}
                    </span>
                </p>
                <p className='datos-paciente__label'>genero: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.genero}
                    </span>
                </p>
                <p className='datos-paciente__label'>nacionalidad: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.nacionalidad}
                    </span>
                </p>
                <p className='datos-paciente__label'>telefono: 
                    <span className='ps-1 text-capitalize'>
                        {p.patient.telefono}
                    </span>
                </p>
                <p className='datos-paciente__label'>email: 
                    <span className='ps-1 text-lowercase'>
                        {p.patient.email}
                    </span>
                </p>
            </Col>
        </Row>
    )
}

export default DatosPaciente;
