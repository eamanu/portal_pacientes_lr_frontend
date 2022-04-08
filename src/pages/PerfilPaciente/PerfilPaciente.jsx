import { Container } from "react-bootstrap"
import DatosPaciente from "./components/DatosPaciente"
import EnfermedadesCronicas from "./components/EnfermedadesCronicas"
import OtrasAfecciones from "./components/OtrasAfecciones"

export default function PerfilPaciente() {
    return (
        <Container className='perfil-paciente p-3'>
            <h5 className='section-title'>Perfil del paciente</h5>
            <DatosPaciente></DatosPaciente>
            <EnfermedadesCronicas></EnfermedadesCronicas>
            {/* <OtrasAfecciones></OtrasAfecciones> */}
        </Container>
    )
}

