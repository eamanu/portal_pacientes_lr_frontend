import { API_ENDPOINT_SEND_TURNO_MAIL, AUTH_HEADER } from "../constants/api.constants";
import { post } from "./httpServices";

export async function sendApplicationEmailService(person_id, subject, body) {
    try {
      const searchParams = new URLSearchParams({
        person_id: person_id,
        subject: subject,
        body: body,
      });
      let query = searchParams.toString();
      const promise = await post(
        API_ENDPOINT_SEND_TURNO_MAIL(query),
        AUTH_HEADER()
      );
      return promise;
    } catch (err) {
      console.log("Error al enviar email: ", err);
    }
  }