import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";

export default function Estudios() {
    return (
        <Container className='estudios p-3'>
            <h5 className='section-title'>Estudios</h5>
            <DataNotFound text="estudios" className='in'></DataNotFound>
        </Container>
    )
}
