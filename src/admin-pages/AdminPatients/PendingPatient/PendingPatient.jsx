import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import EnablePatient from "../EnablePatient/EnablePatient";
// import DataNotFound from "../../components/DataNotFound";

export default function PendingPatient({ name, status, idn }) {

    const [show, setShow] = useState(false);
    const refStatus = {
        1: "Pendiente",
        2: "Validado",
        3: "Rechazado"
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className="admin-patients__patient" onClick={handleShow} >
                <Col xs={12} md={9}>
                    <p>{name} <span className="fw-lighter ms-1">DNI {idn}</span></p>
                </Col>
                <Col xs={12} md={3}>
                    <div className={`status-container bg-${status}`}>
                        <p>{refStatus[status]}</p>
                    </div>
                </Col>
            </Row>
            <EnablePatient show={show} handleClose={handleClose} idn={idn} />
        </>
    )
}
