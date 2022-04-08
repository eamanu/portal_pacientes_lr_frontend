import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";
import { Mensaje } from "../../components/Mensaje/Mensaje";
import useAuth from "../../hooks/useAuth";
import usePatient from '../../hooks/usePatient'
import getMessagesServices from "../../services/messagesServices";

export default function Notificaciones() {

    var tokenUser = useAuth().tokenUser;

    const { patient } = usePatient()
    // const mensajes = patient.mensajes

    const [messages, setMessages] = useState();

    const getMessages = useCallback(
        () => {
            getMessagesServices(tokenUser)
                .then((res) => {
                    const allMessages = res
                    return allMessages;
                })
                .then((res) => {
                    setMessages(res);
                    console.log(res)
                    return messages
                })
                .catch((err) => { console.log(err) })
        },
        [messages, tokenUser],
    )

    useEffect(() => {
        getMessages()
    }, [])



    return (
        <Container className='notificaciones p-3'>
            <h5 className='section-title'>Notificaciones</h5>
            {messages ? messages.map((mensaje, i) => {
                return <Mensaje key={i} asunto={mensaje.asunto} from={mensaje.from} mensaje={mensaje.mensaje} {...i}></Mensaje>
            }
            )
                :
                <DataNotFound text="notificaciones"></DataNotFound>
            }
        </Container>
    )
}
