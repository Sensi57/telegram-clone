import { useEffect, useRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useChats } from '@/entities/chat/model/store'
import { MessageBubble } from '@/entities/message/ui/MessageBubble'
import { MessageInput } from '@/features/send-message/ui/MessageInput'
import { Avatar } from '@/shared/ui/Avatar'
import { IconButton } from '@/shared/ui/IconButton'

const dayKey = (ts: number) => new Date(ts).toDateString()

export function ChatWindow({ onBack }: { onBack: () => void }) {
  const { t, i18n } = useTranslation()
  const chat = useChats((s) => (s.activeId ? s.chats[s.activeId] : undefined))
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat?.id, chat?.messages.length])

  if (!chat) return <div className="flex-1 flex items-center justify-center text-sm text-fg-muted bg-chat">{t('chat.select')}</div>

  const label = (ts: number) => {
    const d = new Date(ts), now = new Date()
    if (d.toDateString() === now.toDateString()) return t('chat.today')
    now.setDate(now.getDate() - 1)
    if (d.toDateString() === now.toDateString()) return t('chat.yesterday')
    return d.toLocaleDateString(i18n.language, { day: 'numeric', month: 'long' })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 shrink-0 bg-header border-b border-line backdrop-blur">
        <IconButton className="md:hidden !bg-transparent" onClick={onBack} aria-label={t('common.back')}><ChevronLeft size={18} /></IconButton>
        <Avatar name={chat.name} seed={chat.id} size="sm" />
        <div className="text-[14px] font-semibold truncate">{chat.name}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 bg-chat">
        {chat.messages.map((m, i) => {
          const prev = chat.messages[i - 1]
          const newDay = !prev || dayKey(prev.ts) !== dayKey(m.ts)
          return (
            <div key={m.id}>
              {newDay && (
                <div className="flex justify-center my-5">
                  <span className="text-xs px-4 py-1.5 rounded-full font-medium bg-date text-fg-sub backdrop-blur shadow-sm">{label(m.ts)}</span>
                </div>
              )}
              <MessageBubble m={m} first={newDay || prev.sent !== m.sent} />
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      <MessageInput chatId={chat.id} />
    </div>
  )
}
