const gradients = [
  'linear-gradient(135deg,#667eea,#764ba2)', 'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)', 'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)', 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
]
const pick = (s: string) => gradients[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length]
const sizes = { sm: 'w-9 h-9 text-sm', md: 'w-11 h-11 text-sm' }

export function Avatar({ name, seed, size = 'md' }: { name: string; seed: string; size?: keyof typeof sizes }) {
  return (
    <div className={`${sizes[size]} rounded-2xl flex items-center justify-center font-bold text-white shrink-0 select-none shadow-md`}
      style={{ background: pick(seed) }}>
      {(name.replace(/^\+/, '').trim()[0] ?? '?').toUpperCase()}
    </div>
  )
}
