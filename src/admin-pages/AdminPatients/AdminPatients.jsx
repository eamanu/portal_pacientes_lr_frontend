import { Container } from "react-bootstrap";
import PendingPatient from "./PendingPatient";
import DataNotFound from "../../components/DataNotFound";
import Loader from "../../components/Loader";
import { useState } from "react";

export default function AdminPatients() {

    const [loading, setLoading] = useState(false); //hardcode
    //hardcode
    const patients = [ 
        {name: "paciente 1", surname: "paciente1", identification_number: "1234567", status: 1},
        {name: "paciente 1", surname: "paciente1", identification_number: "1234567", status: 2},
        {name: "paciente 1", surname: "paciente1", identification_number: "1234567", status: 3},
        {name: "paciente 1", surname: "paciente1", identification_number: "1234567", status: 1},
        {name: "paciente 1", surname: "paciente1", identification_number: "1234567", status: 1},
    ]

    return (
        <Container className='p-3'>
            <h5 className='section-title'>Alta de pacientes</h5>
            <p className='admin-patients_text'>Para dar el alta a un paciente, haz click en el nombre y corrobora que los datos ingresados de Nombre, Apellido, DNI y Fecha de nacimiento, coincide con la información que figura en la imagen del documento.</p>
            {loading ?
             <Loader isActive={loading}></Loader>    
            :<Container>
            <h5>Pacientes pendientes <span className="fw-light text-danger">({patients.length})</span></h5>
                {patients.length > 0 ? patients.map((p, i) => {
                    return (
                        <PendingPatient key={p.identification_number + i} name={p.name + " " + p.surname} status={p.status} idn={p.identification_number}></PendingPatient>
                    )
                })
                :
                <DataNotFound text="pacientes pendientes"/>
                }
            </Container>
        }
        </Container>
    )
}
