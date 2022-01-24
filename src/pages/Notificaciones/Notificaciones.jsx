import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";

export default function Notificaciones() {
    return (
        <Container className='notificaciones p-3'>
            <h5 className='section-title'>Notificaciones</h5>
            <DataNotFound text="notificaciones"></DataNotFound>
        </Container>
    )
}
