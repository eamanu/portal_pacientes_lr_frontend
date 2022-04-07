import { useEffect, useState, useCallback } from "react";
import institutionsServices from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'



export default function CentrosMedicos() {
    var tokenUser = useAuth().tokenUser;

    const [institutions, setInstitutions] = useState([]);

    const getInstitutions = useCallback(
        () => {
            institutionsServices(tokenUser)
                .then((res) => {
                    const allInstitutions = res
                    return allInstitutions;
                })
                .then((res) => {
                    setInstitutions(res);
                    console.log(res)
                    return institutions
                })
                .catch((err) => { console.log(err) })
        },
        [institutions, tokenUser],
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    return (
        <div className='in'>
            <h5>Centros Médicos</h5>
            {institutions?.length > 0 ? institutions.map((ins) => {
                return (
                    <p key={ins.id}>{ins.name}</p>
                )
            }) :
                <h6>Cargando...</h6>
            }
        </div>
    )
}
