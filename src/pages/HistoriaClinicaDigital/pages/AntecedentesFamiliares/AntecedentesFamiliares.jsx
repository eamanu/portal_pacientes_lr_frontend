import React, { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import Loader from '../../../../components/Loader';
import DataNotFound from '../../../../components/DataNotFound';
import familyHistoriesServices from '../../../../services/hceServices/familyHistoriesServices';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import { Card } from 'react-bootstrap';


function AntecedentesFamiliares() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [data, setData] = useState([]);

    const getData = useCallback(
        (institution, id_patient) => {
            // ENDPOINT NO DESARROLLADO EN BACK
            setData([]);
            setNotFound(true);
            setLoading(false);
            // familyHistoriesServices(institution, id_patient)
            // .then((res) => {
            //     if (res.length > 0) {
            //         res.map((d, i) => {
            //             iterateObject(d)
            //         })
            //     } else {
            //         setData([]);
            //         setNotFound(true);
            //         setLoading(false);
            //     }
            // })
            // .catch((err) => {
            //     console.log(err)
            //     Swal.fire(error('Hubo un error al solicitar datos'))
            //     setLoading(false);
            // })
        },
        [data],
    )

    const iterateObject = (info) => {
        let patientData = []
        Object.entries(info).forEach(([key, value], i, obj) => {
            if (typeof value === 'string' || typeof value === 'number') {
                patientData.push(`${key}: ${value}`)
            }
            if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    patientData.push(`${k}: ${v}`)
                })
            }
            if (Object.is(obj.length - 1, i)) {
                setNewData(patientData)
            }
        })

    }

    const setNewData = (enteredInfo) => {
        data.push(enteredInfo);
        setLoading(false);
        // console.log(data)
    }

    useEffect(() => {
        setLoading(true);
        // console.log(p.patientInstitution)
        getData(p.patientInstitution, p.idPatient);
    }, [p.patientInstitution, p.idPatient]);

    return (
        <div className='in'>
            {loading ?
                <Loader isActive={loading}></Loader>
                :
                <>
                    {data.map((d, i) => {
                        return (
                            <Card key={i} className="mb-3 shadow-sm">
                                <Card.Header>
                                    <span className='fw-lighter mb-0'>Fecha: {' - ' || ' - '}</span> | <span className="mb-0">{' - '}</span>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        {d.map((itemData, i) => {
                                            return (<p key={i}>{itemData}</p>)
                                        })
                                        }
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                    {notFound && <DataNotFound text="antecedentes familiares" />}
                </>
            }
        </div>
    )
}

export default AntecedentesFamiliares;
