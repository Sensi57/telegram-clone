import { env } from "@/shared/config/env";

export type Credentials = { idInstance: string; apiTokenInstance: string };

export type Notification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: {
      chatId: string;
      sender?: string;
      senderName?: string;
      chatName?: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
};

const url = (c: Credentials, method: string, tail = "") =>
  `${env.apiUrl}/waInstance${c.idInstance}/${method}/${c.apiTokenInstance}${tail}`;

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok)
    throw new Error(
      `GREEN-API ${res.status}: ${await res.text().catch(() => "")}`
    );
  return res.json() as Promise<T>;
}

const post = <T>(
  c: Credentials,
  method: string,
  body: unknown,
  signal?: AbortSignal
) =>
  request<T>(url(c, method), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

/** Проверка учётных данных */
export const getStateInstance = (c: Credentials) =>
  request<{ stateInstance: string }>(url(c, "getStateInstance"));

/** Резолв номера телефона в chatId */
export const checkAccount = (c: Credentials, phoneNumber: string) =>
  post<{ exist: boolean; chatId?: string }>(c, "checkAccount", {
    phoneNumber: Number(phoneNumber),
  });

/** SendMessage */
export const sendMessage = (c: Credentials, chatId: string, message: string) =>
  post<{ idMessage: string }>(c, "sendMessage", { chatId, message });

/** ReceiveNotification (long-poll). Пустая очередь → null */
export const receiveNotification = (c: Credentials, signal: AbortSignal) =>
  request<Notification | null>(
    url(c, "receiveNotification", `?receiveTimeout=${env.pollTimeoutSec}`),
    { signal }
  );

/** DeleteNotification */
export const deleteNotification = (c: Credentials, receiptId: number) =>
  request<{ result: boolean }>(url(c, "deleteNotification", `/${receiptId}`), {
    method: "DELETE",
  });
