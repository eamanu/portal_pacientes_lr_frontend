import { useEffect, useState, useRef } from "react";
import institutionsServices from '../../../../services/institutionsServices'

export default function CentrosMedicos() {
    const [institutions, setInstitutions] = useState();

    const component = useRef(true)
    console.log(component)

    useEffect(() => {
        const getInstitutions =
            () => {
                institutionsServices()
                    .then((response) => {
                        setInstitutions(response)
                    })
            };
        getInstitutions()
    }, []);

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
