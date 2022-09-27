import { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { error } from "../../../components/SwalAlertData";
import EnablePatient from "../EnablePatient/EnablePatient";
// import DataNotFound from "../../components/DataNotFound";

export default function PendingPatient({ name, status_id, status_name, id, est, action }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className="admin-patients__patient" onClick={handleShow} >
                <Col xs={12} md={4}>
                    <p>{name}</p>
                </Col>
                <Col xs={12} md={5}>
                    <i>Establecimiento: {est}</i>
                </Col>
                <Col xs={12} md={3}>
                    <div className={`status-container bg-${status_id}`}>
                        <p>{status_name}</p>
                    </div>
                </Col>
            </Row>
            {show && <EnablePatient show={show} handleClose={handleClose} id={id} action={action} />}
        </>
    )
}
