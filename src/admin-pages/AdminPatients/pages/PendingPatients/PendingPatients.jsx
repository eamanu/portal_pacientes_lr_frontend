import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PendingPatient from "../../PendingPatient";
import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
import { getPersons } from "../../../../services/adminServices";
import institutionsServices from '../../../../services/institutionsServices'
import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error } from "../../../../components/SwalAlertData";

export default function PendingPatients() {

    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(1)
    const [patientsPending, setPendingPatients] = useState([]);
    const [adminStatus, setAdminStatus] = useState([])
    const [institutions, setInstitutions] = useState([]);
    const status = adminStatus.find(s => s.name === 'PENDIENTE DE VALIDACIÓN')
    const statusName = status ? status.name : 'pendiente'

    const getData = useCallback(
        () => {
            getPersons()
                .then((res) => {
                    if (res) {
                        let patients = res.filter(p => p.id_admin_status === 1)//note - table db =>  1: pending , 2: validated , 3: refused
                        setPendingPatients(patients)
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

    const getAdminStatusToSetPerson = useCallback(
        () => {
            getAdminStatus()
                .then((res) => {
                    setAdminStatus(res)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log('Error', err)
                    Swal.fire(error('Error al obtenter estados'))
                })

        }, []
    )

    useEffect(() => {
        getAdminStatusToSetPerson()
        getInstitutions()
    }, [])


    const reloadTime = () => {
        setTimeout(() => {
            setReload(reload + 1)
        }, 60000);
    }

    useEffect(() => {
        getData()
        reloadTime()
    }, [reload])

    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    const allInstitutions = res
                    setInstitutions(allInstitutions);
                    return allInstitutions;
                })
                .catch((err) => { console.log(err) })
        },
        [institutions],
    )

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <Container>
                    <h5 className="mt-5 mb-3">Pacientes pendientes <span className="fw-light text-danger">({patientsPending.length})</span></h5>
                    {patientsPending.length > 0 ? patientsPending.map((p, i) => {
                        return (
                            <PendingPatient key={i} name={p.name + " " + p.surname} status_id={p.id_admin_status} 
                            status_name={statusName} id={p.id} est={institutions.find((item) => item.id === p.id_usual_institution)?.name || null} action={getData}></PendingPatient>
                        )
                    })
                        :
                        <DataNotFound text="pacientes pendientes" />
                    }
                </Container>
            }
        </>
    )
}
