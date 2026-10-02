export const normalizePhone = (raw: string) => raw.replace(/\D/g, '')
export const isValidPhone = (digits: string) => digits.length >= 7 && digits.length <= 15
export const phoneToChatId = (digits: string) => `${digits}@c.us`
