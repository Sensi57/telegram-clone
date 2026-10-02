import { useState } from 'react'
import { Search, Settings, SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useChats } from '@/entities/chat/model/store'
import { ChatListItem } from '@/entities/chat/ui/ChatListItem'
import { NewChatDialog } from '@/features/new-chat/ui/NewChatDialog'
import { IconButton } from '@/shared/ui/IconButton'

export function Sidebar({ onOpenChat, onOpenSettings }: { onOpenChat: () => void; onOpenSettings: () => void }) {
  const { t } = useTranslation()
  const { chats, activeId, setActive } = useChats()
  const [q, setQ] = useState('')
  const [dialog, setDialog] = useState(false)

  const list = Object.values(chats)
    .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (b.messages.at(-1)?.ts ?? 0) - (a.messages.at(-1)?.ts ?? 0))

  return (
    <div className="flex flex-col h-full w-full bg-sidebar">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-line">
        <span className="text-[17px] font-bold tracking-tight">{t('sidebar.chats')}</span>
        <div className="flex gap-2">
          <IconButton onClick={() => setDialog(true)}><SquarePen size={17} /></IconButton>
          <IconButton onClick={onOpenSettings}><Settings size={17} /></IconButton>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-surface border border-line">
          <Search size={15} className="text-fg-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('sidebar.search')}
            className="bg-transparent text-[13px] outline-none flex-1 text-fg" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-2">
        {list.length === 0 && <p className="px-6 py-8 text-center text-xs text-fg-muted">{t('sidebar.empty')}</p>}
        {list.map((c) => (
          <ChatListItem key={c.id} chat={c} active={c.id === activeId} onClick={() => { setActive(c.id); onOpenChat() }} />
        ))}
      </div>

      {dialog && <NewChatDialog onClose={() => setDialog(false)} onCreated={onOpenChat} />}
    </div>
  )
}
