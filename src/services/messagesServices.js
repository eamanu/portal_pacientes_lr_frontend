import {
  API_ENDPOINTS_CREATEMESSAGE,
  API_ENDPOINTS_DELETEMESSAGE,
  API_ENDPOINTS_GETALLMESSAGES,
  API_ENDPOINTS_GETMESSAGE,
  API_ENDPOINTS_GETMESSAGESBYPERSON,
  API_ENDPOINTS_SENDMESSAGE,
  API_ENDPOINTS_SETMESSAGEREAD,
  API_ENDPOINTS_UPDATEMESSAGE,
  API_HEADER,
  AUTH_HEADER,
} from "../constants/api.constants";
import { get, post, put } from "./httpServices";

export async function getAllMessages() {
  try {
    const promise = await get(API_ENDPOINTS_GETALLMESSAGES, API_HEADER());
    return promise;
  } catch (err) {
    console.log("Error al cargar los mensajes: ", err);
  }
}

export async function getMessagesByPerson(person_id, only_unread) {
  try {
    const searchParams = new URLSearchParams({
      person_id: person_id,
      only_unread: only_unread,
    });
    let query = searchParams.toString();
    const promise = await get(
      API_ENDPOINTS_GETMESSAGESBYPERSON(query),
      API_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al cargar los mensajes: ", err);
  }
}

export async function getMessage(message_id) {
  try {
    const searchParams = new URLSearchParams({
      message_id: message_id,
    });
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINTS_GETMESSAGE(query), API_HEADER());
    return promise;
  } catch (err) {
    console.log("Error al traer Mensajes: ", err);
  }
}

export async function createMessage(header, body, is_formatted) {
  try {
    const searchParams = new URLSearchParams({
      header: header,
      body: body,
      is_formatted: is_formatted,
    });
    let query = searchParams.toString();
    const promise = await post(
      API_ENDPOINTS_CREATEMESSAGE(query),
      API_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al crear mensaje: ", err);
  }
}

export async function sendMessage(
  message_id,
  category_id,
  is_for_all_categories
) {
  try {
    const searchParams = new URLSearchParams({
      message_id: message_id,
      category_id: category_id,
      is_for_all_categories: is_for_all_categories,
    });
    let query = searchParams.toString();
    const promise = await post(API_ENDPOINTS_SENDMESSAGE(query), API_HEADER());
    return promise;
  } catch (err) {
    console.log("Error al enviar mensaje: ", err);
  }
}

export async function setMessageRead(person_id, message_id) {
  try {
    const searchParams = new URLSearchParams({
      person_id: person_id,
      message_id: message_id,
    });
    let query = searchParams.toString();
    const promise = await post(
      API_ENDPOINTS_SETMESSAGEREAD(query),
      API_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}

export async function updateMessage(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await put(API_ENDPOINTS_UPDATEMESSAGE, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}

export async function deleteMessage(message_id) {
  try {
    const searchParams = new URLSearchParams({
      message_id: message_id,
    });
    let query = searchParams.toString();
    const promise = await put(
      API_ENDPOINTS_DELETEMESSAGE(query),
      API_HEADER(),
    );
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}
