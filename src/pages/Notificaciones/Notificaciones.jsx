import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import DataNotFound from "../../components/DataNotFound";
import { Mensaje } from "../../components/Mensaje/Mensaje";
import { error } from "../../components/SwalAlertData";
import useAuth from "../../hooks/useAuth";
import usePatient from '../../hooks/usePatient'
import { getMessagesByPerson } from "../../services/messagesServices";
import Loader from '../../components/Loader'

export default function Notificaciones() {

    const [loading, setLoading] = useState(true);
    var tokenUser = useAuth().tokenUser;
    //Person
    const p = usePatient();
    const idPerson = p.patient.id 

    const [messages, setMessages] = useState();

    const getMessages = useCallback(
        (person_id, only_unread) => {
            getMessagesByPerson(person_id, only_unread) 
                .then((res) => {
                    if (res) {
                        let order = res.reverse()
                        setMessages(order);
                        setLoading(false)
                        return messages
                    }
                })
                .catch((err) => { 
                    console.log(err)
                    Swal.fire(error('Error al cargar los mensajes')) 
                    setLoading(false)
                })
        },
        [messages, tokenUser],
    )

    useEffect(() => {
        initMessages()
    }, [idPerson])

    const initMessages = () => {
        setLoading(true)
        getMessages(idPerson, false) 
    }


    return (<>
        {loading
            ? <Loader isActive={loading} />
            : <Container className='notificaciones p-3'>
                <h5 className='section-title'>Notificaciones</h5>
                {messages.length > 0 ? messages.map((m, i) => {
                    return <Mensaje 
                    key={`${m.message.id}-${i}`} 
                    idMessage={m.message.id}
                    asunto={m.message.header} 
                    from='Portal del paciente | La Rioja' 
                    mensaje={m.message.body} {...i}
                    isRead={m.read_datetime}
                    action={initMessages}
                     />
                }
                )
                    :
                    <DataNotFound text="notificaciones"></DataNotFound>
                }
            </Container>
        }
    </>
    )
}
