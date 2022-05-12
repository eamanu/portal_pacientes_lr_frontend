import { useState } from "react";
import { Container } from "react-bootstrap"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../../components/Profile/Profile";
import DatosPaciente from "./components/DatosPaciente";
import * as FaIcon from 'react-icons/fa';
import * as MdIcon from 'react-icons/md';

export default function PerfilPaciente() {

    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const verHistoriaClinica = () => {
        history.push('/usuario/historia-clinica/alergias')
    }

    return (
        <Container className='perfil-paciente p-3'>
            <div className="w-100 d-flex justify-content-between">
                <h5 className='section-title'>Perfil del paciente</h5>
                <div className="d-flex align-items-center">
                    <div className="my-tooltip">
                        <button className='btn text-secondary btn-icon' onClick={() => { verHistoriaClinica() }}><MdIcon.MdFolderShared style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Ver historia clínica
                        </span>
                    </div>
                    <div className="my-tooltip">
                        <button className='btn text-secondary btn-icon' onClick={() => { handleShow() }} ><FaIcon.FaUserEdit style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Editar
                        </span>
                    </div>
                </div>
            </div>
            <DatosPaciente></DatosPaciente>
            {show && <Profile type={'patient'} show={show} handleClose={handleClose} />}
        </Container>
    )
}

