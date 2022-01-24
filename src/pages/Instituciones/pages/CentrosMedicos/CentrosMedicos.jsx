import { useEffect, useState } from "react";
import { useCallback } from "react";
import institutionsServices from '../../../../services/institutionsServices'

export default function CentrosMedicos() {
    const [institutions, setInstitutions] = useState();


    const getInstitutions = useCallback(
        () => {
            institutionsServices()
            .then((response) => {
               setInstitutions(response)
               return institutions
            })
    }, [institutions]);
 
    useEffect(() => {
        getInstitutions()
    });

    return (
        <div>
            <h5>CentrosMedicos</h5>
            {institutions ? institutions.map((ins) => {
                return (
                    <p key={ins.id}>{ins.name}</p>
                )
            }):
            <h6>Cargando...</h6>
            }
        </div>
    )
}
