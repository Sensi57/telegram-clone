import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message } from '@/entities/message/model/types'

export type Chat = { id: string; name: string; messages: Message[] }

type State = {
  chats: Record<string, Chat>
  activeId: string | null
  setActive: (id: string | null) => void
  ensureChat: (id: string, name?: string) => void
  addMessage: (chatId: string, m: Message, name?: string) => void
  replaceMessage: (chatId: string, oldId: string, patch: Partial<Message>) => void
  reset: () => void
}

const short = (id: string) => id.split('@')[0]

export const useChats = create<State>()(
  persist(
    (set) => ({
      chats: {},
      activeId: null,
      setActive: (activeId) => set({ activeId }),
      ensureChat: (id, name) =>
        set((s) => (s.chats[id] ? s : { chats: { ...s.chats, [id]: { id, name: name || short(id), messages: [] } } })),
      addMessage: (chatId, m, name) =>
        set((s) => {
          const chat = s.chats[chatId] ?? { id: chatId, name: name || short(chatId), messages: [] }
          if (chat.messages.some((x) => x.id === m.id)) return s // дедупликация (API + webhook)
          const nm = name && chat.name === short(chat.id) ? name : chat.name
          return { chats: { ...s.chats, [chatId]: { ...chat, name: nm, messages: [...chat.messages, m] } } }
        }),
      replaceMessage: (chatId, oldId, patch) =>
        set((s) => {
          const chat = s.chats[chatId]
          if (!chat) return s
          const dup = patch.id && patch.id !== oldId && chat.messages.some((x) => x.id === patch.id)
          const messages = dup
            ? chat.messages.filter((x) => x.id !== oldId)
            : chat.messages.map((x) => (x.id === oldId ? { ...x, ...patch } : x))
          return { chats: { ...s.chats, [chatId]: { ...chat, messages } } }
        }),
      reset: () => set({ chats: {}, activeId: null }),
    }),
    { name: 'chats' },
  ),
)

export const lastMessage = (c: Chat) => c.messages[c.messages.length - 1]
