import type { ButtonHTMLAttributes } from 'react'

export function IconButton({ className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...p}
      className={`w-9 h-9 flex items-center justify-center rounded-xl bg-surface text-fg-sub transition hover:opacity-70 active:scale-95 ${className}`} />
  )
}
