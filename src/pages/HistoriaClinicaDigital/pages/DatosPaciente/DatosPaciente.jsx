import usePatient from '../../../../hooks/usePatient';
import { Row } from "react-bootstrap";

function DatosPaciente() {

    const p = usePatient();

    return (
        <Row className='in'> 
            <h5 className='mt-3'>Datos del Paciente</h5>
            <p className='m-0'>Nombre y apellido: {p.patient.nombre} {p.patient.apellido}</p>
            <p className='m-0'>DNI: {p.patient.nombre} {p.patient.apellido}</p>
            <p className='m-0'>EDAD: {p.patient.nombre} {p.patient.apellido}</p>
            {/* <p className='m-0'>Nacionalidad: {p.patient.nombre} {p.patient.apellido}</p> */}
        </Row>
    )
}

export default DatosPaciente;
