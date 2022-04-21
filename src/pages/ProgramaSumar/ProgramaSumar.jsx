import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";
import Loader from "../../components/Loader";
import sumarServices from "../../services/sumarServices";

export default function ProgramaSumar() {

    const [loading, setLoading] = useState(true);

    const getData = useCallback(
      (idn) => {
        sumarServices(idn)
        .then((res) => {
            console.log('res', res)
        })
      },
      [],
    )

    useEffect(() => {
        getData(46410766)
    }, [])
    
    return (
        <Container className='programa-sumar p-3'>
            <h5 className='section-title'>Programa Sumar</h5>
            {loading ? 
            <Loader isActive={loading}/> 
            : <DataNotFound text="programa sumar"></DataNotFound>
        }
        </Container>
    )
}
