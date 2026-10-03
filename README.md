# Green Chat (GREEN-API)

```bash
npm i && npm run dev
```

## Настройка GREEN-API

1. Зарегистрируйте инстанс Telegram в [личном кабинете](https://console.green-api.com/) и авторизуйте его (статус `authorized`).
2. В настройках инстанса включите в разделе Webhooks:
   - **Receive webhooks on incoming messages and files** (обязательно, иначе ответы не придут)
3. Поле **Webhook Url оставьте пустым**: при заданном URL уведомления уходят на него, а очередь HTTP API остаётся пустой.
4. Применение настроек может занять около 5 минут.

## Переменные окружения (`.env`)

`VITE_GREEN_API_URL` | `apiUrl` инстанса (если свой, например `https://4100.api.green-api.com` | `https://api.green-api.com`)
`VITE_POLL_TIMEOUT_SEC` - Таймаут long-poll запроса `receiveNotification`, сек - `5`
`VITE_DEFAULT_LANG` | Язык по умолчанию (`ru` / `en` / `kz`) - `ru`
`VITE_DEFAULT_THEME` | Тема по умолчанию (`dark` / `light`) | `dark` |
`VITE_DEV_ID_INSTANCE`, `VITE_DEV_API_TOKEN` - Автозаполнение формы входа (только для разработки)

## Как пользоваться

1. Введите `idInstance` и `apiTokenInstance`.
2. Нажмите ✎ в списке чатов и введите номер получателя в международном формате (например, `79991234567`).
3. Напишите сообщение (Enter: отправить, Shift+Enter: перенос строки).
4. Когда получатель ответит в Telegram, ответ появится в чате автоматически.

## Ограничения

- Поддерживаются только текстовые сообщения (по условию задания).
- Токен хранится в `localStorage` браузера. Для продакшена потребовался бы бэкенд-прокси.
- Входящие сообщения доступны только при включённых webhooks (см. раздел «Настройка GREEN-API»).
