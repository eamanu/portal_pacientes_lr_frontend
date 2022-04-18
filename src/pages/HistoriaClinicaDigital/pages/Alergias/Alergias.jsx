import React, { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import Loader from '../../../../components/Loader';
import DataNotFound from '../../../../components/DataNotFound';
import allergiesServices from '../../../../services/hceServices/allergieServices';

function Alergias() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [data, setData] = useState([]);

    const getData = useCallback(
        (institution, id_patient) => {
            allergiesServices(institution, id_patient)
                .then((res) => {
                    if (res.length > 0) {
                        setData(res);
                        console.log(res);
                        setLoading(false);
                        return data;
                    } else {
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => { console.log(err) })
        },
        [p.patientInstitution, data],
    )

    useEffect(() => {
        setLoading(true);
        getData(p.patientInstitution, p.idPatient); //hardcode
    }, [p.patientInstitution]);

    return (
        <div className='in'>
            {loading ?
                <Loader isActive={loading}></Loader>
                :
                <>
                    {data.length > 0 && <div>{data}</div>}
                    {notFound && <DataNotFound text="alergias" />}
                </>
            }
        </div>
    )
}

export default Alergias;
