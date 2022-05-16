import { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SelectType from "../../../../components/SelectType";
import ApplicationModal from '../../ApplicationModal';

function SolicitarTurnos() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='in'>
            <p>Para solicitar un turno, completá el formulario y enviá la
                solicitud. A la brevedad, una persona del área de Salud se
                contactará para ofrecerte turnos disponibles. </p>
            <Button variant="danger" onClick={() => handleShow()}>Completar formulario</Button>
            {show && <ApplicationModal type={'patient'} show={show} handleClose={handleClose} />}
        </div>
    )
}

export default SolicitarTurnos;
