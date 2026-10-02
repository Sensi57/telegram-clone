import { useRef, useState, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSendMessage } from '../model/useSendMessage'

export function MessageInput({ chatId }: { chatId: string }) {
  const { t } = useTranslation()
  const send = useSendMessage()
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const ready = text.trim().length > 0

  function submit() {
    if (!ready) return
    send(chatId, text.trim())
    setText('')
    if (ref.current) ref.current.style.height = 'auto'
  }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }

  return (
    <div className="flex items-end gap-2 px-3 sm:px-4 py-3 shrink-0 bg-input-area border-t border-line backdrop-blur">
      <div className="flex-1 rounded-2xl px-3 py-2 bg-field border border-field-line">
        <textarea ref={ref} rows={1} value={text} placeholder={t('chat.placeholder')} onKeyDown={onKey}
          onChange={(e) => { setText(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
          className="w-full bg-transparent text-[13.5px] outline-none resize-none leading-relaxed text-fg max-h-[120px] min-h-6" />
      </div>
      <button onClick={submit} disabled={!ready}
        className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition active:scale-90 ${ready ? 'bg-accent text-white shadow-glow' : 'bg-surface text-fg-muted'}`}>
        <Send size={17} />
      </button>
    </div>
  )
}
