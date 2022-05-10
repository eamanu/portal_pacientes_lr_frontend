import { Container } from "react-bootstrap";
import PendingPatient from "./PendingPatient";
import DataNotFound from "../../components/DataNotFound";
import Loader from "../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { getPersons } from "../../services/adminServices";
import Swal from "sweetalert2";
import { error } from "../../components/SwalAlertData";

export default function AdminPatients() {

    const [loading, setLoading] = useState(true); 
    const [patientsPending, setPendingPatients]  = useState([]);

    const getData = useCallback(
        () => {
            getPersons()
                .then((res) => {
                    if(res){
                        setPendingPatients(res)
                        setLoading(false)
                    } else {
                        throw new Error(res)
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Hubo un error al cargar pacientes pendientes'));
                    setLoading(false)
                })
        },
        [],
    )

    useEffect(() => {
        getData()
    }, [])


    return (
        <Container className='p-3'>
            <h5 className='section-title'>Alta de pacientes</h5>
            <p className='admin-patients_text'>Para dar el alta a un paciente, haz click en el nombre y corrobora que los datos ingresados de Nombre, Apellido, DNI y Fecha de nacimiento, coinciden con la información que figura en la imagen del documento.</p>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <Container>
                    <h5>Pacientes pendientes <span className="fw-light text-danger">({patientsPending.length})</span></h5>
                    {patientsPending.length > 0 ? patientsPending.map((p, i) => {
                        return (
                            // <PendingPatient key={i} name={p.name + " " + p.surname} status={p.status} idn={p.identification_number} id></PendingPatient>
                            <PendingPatient key={i} name={p.name + " " + p.surname} status={1} id={p.id}></PendingPatient>
                        )
                    })
                        :
                        <DataNotFound text="pacientes pendientes" />
                    }
                </Container>
            }
        </Container>
    )
}
