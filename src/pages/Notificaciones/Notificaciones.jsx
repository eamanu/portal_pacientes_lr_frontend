import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";
import { Mensaje } from "../../components/Mensaje/Mensaje";
import usePatient from '../../hooks/usePatient'

export default function Notificaciones() {

    const { patient } = usePatient()
    const mensajes = patient.mensajes

    return (
        <Container className='notificaciones p-3'>
            <h5 className='section-title'>Notificaciones</h5>
            {mensajes ? mensajes.map((mensaje, i) => {
                return <Mensaje key={i} asunto={mensaje.asunto} from={mensaje.from} mensaje={mensaje.mensaje} {...i}></Mensaje>
            }
            )
                :
                <DataNotFound text="notificaciones"></DataNotFound>
            }
        </Container>
    )
}
