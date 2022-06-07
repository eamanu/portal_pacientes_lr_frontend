import React, { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import Loader from '../../../../components/Loader';
import DataNotFound from '../../../../components/DataNotFound';
import anthropometricDataServices from '../../../../services/hceServices/anthropometricDataServices';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import { Card } from 'react-bootstrap';


function DatosAntropometricos() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [data, setData] = useState([]);

    const getData = useCallback(
        (institution, id_patient) => {
            anthropometricDataServices(institution, id_patient)
                .then((res) => {
                    data.pop()
                    if (!res.detail && res.length > 0) {
                        iterateObject(res)
                    } else {
                        setData([]);
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire(error('Hubo un error al solicitar datos'))
                    setLoading(false);
                })
        },
        [data],
    )

    const iterateObject = (info) => {
        let patientData = []
        info.map((inf, index) => {
            var content = new Object
            Object.entries(inf).forEach(([key, values], i, obj) => {
                content.name = key
                content.data = []
                Object.keys(values).map((k) => {
                    content.data.push(`${k}: ${values[k]}`)
                })
                if (Object.is(obj.length - 1, i)) {
                    patientData.push(content)
                }
            })
            if (Object.is(info.length - 1, index)) {
                setNewData(patientData)
            }
        })
    }

    const setNewData = (enteredInfo) => {
        setData(enteredInfo)
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
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
                                    {/* <span className='fw-lighter mb-0'>Fecha: {' - ' || ' - '}</span> | <span className="mb-0">{' - '}</span> */}
                                    <strong className='text-capitalize'>{d.name}</strong>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">

                                        {d.data.map((v, i) => (
                                            <p key={i} className="mb-0">{v}</p>
                                        ))}
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                    {notFound && <DataNotFound text="datos antropométricos" />}
                </>
            }
        </div>
    )
}

export default DatosAntropometricos;
