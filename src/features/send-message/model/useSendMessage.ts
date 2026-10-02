import { sendMessage } from '@/shared/api/greenApi'
import { useSession } from '@/entities/session/model/store'
import { useChats } from '@/entities/chat/model/store'

export function useSendMessage() {
  const creds = useSession((s) => s.credentials)
  const { addMessage, replaceMessage } = useChats()

  return async (chatId: string, text: string) => {
    if (!creds) return
    const tmpId = `tmp-${Date.now()}`
    addMessage(chatId, { id: tmpId, text, ts: Date.now(), sent: true, status: 'pending' })
    try {
      const { idMessage } = await sendMessage(creds, chatId, text)
      replaceMessage(chatId, tmpId, { id: idMessage, status: undefined })
    } catch {
      replaceMessage(chatId, tmpId, { status: 'failed' })
    }
  }
}
