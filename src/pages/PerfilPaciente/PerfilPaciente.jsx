import { Container } from "react-bootstrap"
import DatosPaciente from "./components/DatosPaciente"

export default function PerfilPaciente() {
    return (
        <Container className='perfil-paciente p-3'>
            <h5 className='section-title'>Perfil del paciente</h5>
            <DatosPaciente></DatosPaciente>
        </Container>
    )
}

