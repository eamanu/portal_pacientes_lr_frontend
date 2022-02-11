import { useEffect, useState } from "react";
import institutionsServices from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'

export default function CentrosMedicos() {
    const { tokenUser } = useAuth();

    const [institutions, setInstitutions] = useState();

    // useEffect(() => {
    //     const getInstitutions =
    //         () => {
    //             institutionsServices(tokenUser)
    //         };
    //     getInstitutions()
    // }, []);

    return (
        <div>
            <h5>Centros Médicos</h5>
            {institutions ? institutions.map((ins) => {
                return (
                    <p key={ins.id}>{ins.name}</p>
                )
            }) :
                <h6>Cargando...</h6>
            }
        </div>
    )
}
