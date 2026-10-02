import { useEffect } from 'react'
import { deleteNotification, receiveNotification, type Notification } from '@/shared/api/greenApi'
import { sleep } from '@/shared/lib/sleep'
import { useSession } from '@/entities/session/model/store'
import { useChats } from '@/entities/chat/model/store'

/** Long-poll ReceiveNotification → DeleteNotification, пока пользователь авторизован */
export function useReceiveMessages() {
  const creds = useSession((s) => s.credentials)

  useEffect(() => {
    if (!creds) return
    const ctrl = new AbortController()
    const { addMessage } = useChats.getState()

    const handle = (b: Notification['body']) => {
      const chatId = b.senderData?.chatId
      const md = b.messageData
      if (!chatId || !md || !b.idMessage) return
      const text =
        md.typeMessage === 'textMessage' ? md.textMessageData?.textMessage
        : md.typeMessage === 'extendedTextMessage' ? md.extendedTextMessageData?.text
        : undefined
      if (!text) return // только текст
      const ts = (b.timestamp ?? Math.floor(Date.now() / 1000)) * 1000
      if (b.typeWebhook === 'incomingMessageReceived')
        addMessage(chatId, { id: b.idMessage, text, ts, sent: false }, b.senderData?.senderName || b.senderData?.chatName)
      else if (b.typeWebhook === 'outgoingMessageReceived' || b.typeWebhook === 'outgoingAPIMessageReceived')
        addMessage(chatId, { id: b.idMessage, text, ts, sent: true })
    }

    ;(async () => {
      while (!ctrl.signal.aborted) {
        try {
          const n = await receiveNotification(creds, ctrl.signal)
          if (n) {
            handle(n.body)
            await deleteNotification(creds, n.receiptId)
          }
        } catch {
          if (ctrl.signal.aborted) break
          await sleep(3000)
        }
      }
    })()

    return () => ctrl.abort()
  }, [creds])
}
