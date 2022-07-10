import {
  API_ENDPOINT_CREATEMESSAGE,
  API_ENDPOINT_DELETEMESSAGE,
  API_ENDPOINT_GETALLMESSAGES,
  API_ENDPOINT_GETMESSAGE,
  API_ENDPOINT_GETMESSAGESBYPERSON,
  API_ENDPOINT_SENDMESSAGE,
  API_ENDPOINT_SETMESSAGEREAD,
  API_ENDPOINT_UPDATEMESSAGE,
  AUTH_HEADER,
  UPDATE_HEADER,
} from "../constants/api.constants";
import { get, post, put } from "./httpServices";

export async function getAllMessages() {
  try {
    const promise = await get(API_ENDPOINT_GETALLMESSAGES, AUTH_HEADER());
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
      API_ENDPOINT_GETMESSAGESBYPERSON(query),
      AUTH_HEADER()
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
    const promise = await get(API_ENDPOINT_GETMESSAGE(query), AUTH_HEADER());
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
      API_ENDPOINT_CREATEMESSAGE(query),
      AUTH_HEADER()
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
    const promise = await post(API_ENDPOINT_SENDMESSAGE(query), AUTH_HEADER());
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
      API_ENDPOINT_SETMESSAGEREAD(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}

export async function updateMessage(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await put(API_ENDPOINT_UPDATEMESSAGE, UPDATE_HEADER(), data);
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
      API_ENDPOINT_DELETEMESSAGE(query),
      AUTH_HEADER(),
    );
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}
