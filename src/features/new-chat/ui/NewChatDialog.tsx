import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { checkAccount } from '@/shared/api/greenApi'
import { useSession } from '@/entities/session/model/store'
import { useChats } from '@/entities/chat/model/store'
import { isValidPhone, normalizePhone, phoneToChatId } from '@/entities/chat/lib/phone'

export function NewChatDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { t } = useTranslation()
  const creds = useSession((s) => s.credentials)!
  const { ensureChat, setActive } = useChats()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    const digits = normalizePhone(phone)
    if (!isValidPhone(digits)) return setError(t('newChat.invalid'))
    setLoading(true); setError('')
    let chatId = phoneToChatId(digits)
    try {
      const r = await checkAccount(creds, digits)
      if (!r.exist) { setError(t('newChat.notFound')); setLoading(false); return }
      if (r.chatId) chatId = r.chatId
    } catch { /* CheckAccount недоступен — пробуем phone@c.us */ }
    ensureChat(chatId, `+${digits}`)
    setActive(chatId)
    setLoading(false)
    onCreated(); onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl p-5 space-y-3 bg-card border border-card-line shadow-xl">
        <h2 className="text-base font-bold">{t('newChat.title')}</h2>
        <input autoFocus value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder={t('newChat.phone')}
          className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none bg-field border border-field-line text-fg focus:border-accent" />
        <p className="text-xs text-fg-muted">{t('newChat.hint')}</p>
        {error && <p className="text-xs text-danger">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm bg-surface text-fg-sub">{t('newChat.cancel')}</button>
          <button disabled={loading} className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent text-white disabled:opacity-60">{t('newChat.create')}</button>
        </div>
      </form>
    </div>
  )
}
