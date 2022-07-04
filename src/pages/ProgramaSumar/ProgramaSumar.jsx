import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import usePatient from '../../hooks/usePatient';
import DataNotFound from "../../components/DataNotFound";
import Loader from "../../components/Loader";
import sumarServices from "../../services/sumarServices";
import InformationCard from "./InformationCard";
import Swal from "sweetalert2";
import { error } from "../../components/SwalAlertData";

export default function ProgramaSumar() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const p = usePatient()
    const idnPatient = p.patient.identification_number 

    const getData = useCallback(
        (idn) => {
            sumarServices(idn)
                .then((res) => {
                    if (res.sumar_rows) {
                        let info = res.sumar_rows
                        setData(info)
                        setLoading(false)
                    } else {
                        setLoading(false)
                        throw new Error('Error al solicitar datos de programa SUMAR')
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                    setLoading(false)
                    Swal.fire(error('Error al solicitar datos de programa SUMAR'))
                })
        },
        [],
    )

    useEffect(() => {
        getData(idnPatient) 
    }, [])

    return (
        <Container className='programa-sumar p-3'>
            <h5 className='section-title'>Programa Sumar</h5>
            {loading
                ? <Loader isActive={loading} />
                : <div className="mt-5">
                    {data.length > 0 ? data.map((d, i) => {
                        return <InformationCard
                            key={i}
                            date={d.fecha_comprobante}
                            group={d.grupo}
                            subgroup={d.subgrupo}
                            description={d.descripcion}
                            diagnosis={d.diagnostico}
                            code={d.codigo}
                            weight={d.peso}
                            blood_pressure={d.tension_arterial}
                        />
                    })
                        : <DataNotFound text="información en Programa Sumar" />
                    }
                </div>
            }
        </Container>
    )
}
