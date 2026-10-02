import { useTranslation } from 'react-i18next'
import { Avatar } from '@/shared/ui/Avatar'
import { lastMessage, type Chat } from '../model/store'

export function ChatListItem({ chat, active, onClick }: { chat: Chat; active: boolean; onClick: () => void }) {
  const { t, i18n } = useTranslation()
  const last = lastMessage(chat)
  const time = last ? new Date(last.ts).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : ''
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-l-[3px] transition-colors ${active ? 'bg-accent-soft border-accent' : 'border-transparent hover:bg-surface'}`}>
      <Avatar name={chat.name} seed={chat.id} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-[13px] font-semibold truncate ${active ? 'text-accent' : 'text-fg'}`}>{chat.name}</span>
          <span className={`text-[11px] ml-2 shrink-0 font-medium ${active ? 'text-accent' : 'text-fg-muted'}`}>{time}</span>
        </div>
        <div className="text-xs truncate text-fg-muted">{last ? last.text : t('sidebar.noMessages')}</div>
      </div>
    </button>
  )
}
