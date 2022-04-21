import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Loader from "../../components/Loader";
import CreateMessage from "./CreateMessage";
import { Message } from "./Messages/Message";
import DataNotFound from "../../components/DataNotFound";

export default function AdminMessages() {

    const [loading, setLoading] = useState(false); //hardcode
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const messages = [
        { id: 1, receiver: 1, subject: "Bienvenida", message: "Hola hola" },
        { id: 1, receiver: 1, subject: "Bienvenida", message: "Hola hola" },
        { id: 1, receiver: 1, subject: "Bienvenida", message: "Hola hola" },
        { id: 1, receiver: 1, subject: "Bienvenida", message: "Hola hola" },
    ]

    return (
        <Container className='p-3'>
            <h5 className='section-title'>Mensajería</h5>
            <div className="d-flex justify-content-end w-100">
                <Button variant="danger" onClick={handleShow}>Crear mensaje + </Button>
            </div>
            {loading ? <Loader isActive={loading} />
                : <Container>
                    <h5>Mensajes activos</h5>
                    {messages.length > 0 ? messages.map((m, i) => {
                        return (
                            <Message key={m.id + i} receiver={m.receiver} subject={m.subject} message={m.message} idMessage={m.id}></Message>
                        )
                    })
                        :
                        <DataNotFound text="mensajes activos" />
                    }
                </Container>
            }
            <CreateMessage show={show} handleClose={handleClose} />
        </Container>
    )
}
