import { useEffect, useState, useCallback } from "react";
import institutionsServices from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'
import Loader from '../../../../components/Loader'
import DataNotFound from "../../../../components/DataNotFound";



export default function CentrosMedicos() {

    const [ loading, setLoading] = useState(true);
    const [ notFound, setNotFound] = useState(false);
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
                    if(res.length > 0){
                        setInstitutions(res);
                        setLoading(false);
                        return institutions
                    } else {
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => { console.log(err) })
        },
        [institutions, tokenUser],
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    return (
        <div className="section-contennt in">
            <h5>Centros Médicos</h5>
            <Loader isActive={loading}></Loader>
            {institutions?.length > 0 && institutions.map((ins) => {
                return (
                    <p key={ins.id}>{ins.name}</p>
                )
            })}
            {notFound && <DataNotFound text="instituciones"/>}
        </div>
    )
}
