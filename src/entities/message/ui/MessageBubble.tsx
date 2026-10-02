import { AlertCircle, Check, CheckCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Message } from '../model/types'

export function MessageBubble({ m, first }: { m: Message; first: boolean }) {
  const { i18n } = useTranslation()
  const time = new Date(m.ts).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })
  return (
    <div className={`flex ${m.sent ? 'justify-end' : 'justify-start'} ${first ? 'mt-3' : 'mt-0.5'}`}>
      <div className={`max-w-[75%] sm:max-w-[60%] rounded-[18px] px-3 pt-2 pb-1.5 ${m.sent ? 'bg-sent text-sent-fg rounded-br-sm shadow-glow' : 'bg-recv text-recv-fg rounded-bl-sm shadow-sm'}`}>
        <p className="text-[13.5px] leading-[1.45] whitespace-pre-wrap break-words">{m.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-0.5 ${m.sent ? 'text-sent-meta' : 'text-recv-meta'}`}>
          <span className="text-[11px] font-medium">{time}</span>
          {m.sent && (m.status === 'failed' ? <AlertCircle size={14} className="text-danger" /> : m.status === 'pending' ? <Check size={14} /> : <CheckCheck size={14} />)}
        </div>
      </div>
    </div>
  )
}
